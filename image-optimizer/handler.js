'use strict';

// require dependencies
const sharp = require('sharp');
const axios = require('axios');

module.exports = async (event, context) => {

  // Get request query params
  const url = event.query.url; // remote image url
  const width = event.query.width ? Number(event.query.width) : null; // new width
  const height = event.query.height ? Number(event.query.height) : null; // new height
  const quality = event.query.quality ? Number(event.query.quality) : 100; // new image quality
  const format = event.query.format ? String(event.query.format) : 'webp'; // new image format



  if (url) {
    const headers = [];
    headers['Cache-Control'] = 'public, max-age=2592000';
    headers['Expires'] = new Date(Date.now() + 2592000000).toUTCString();

    try {
      // fetch image from url
      const imgScraper = await axios({
        url: url,
        responseType: 'arraybuffer'
      });
      // create buffer from image data then create sharp object.
      const sharpImg = new sharp(
        Buffer.from(imgScraper.data, 'binary')
      );

      // resize and change type to webp
      let optimized;
      try {
        switch (format) {
          case 'jpeg':
            optimized = await sharpImg.resize(width, height)
              .jpeg({
                quality: quality
              }).toBuffer();
            headers['Content-Type'] = 'image/jpeg';
            break;
          case 'jpg':
            optimized = await sharpImg.resize(width, height)
              .jpeg({
                quality: quality
              }).toBuffer();
            headers['Content-Type'] = 'image/jpeg';
            break;
          case 'png':
            optimized = await sharpImg.resize(width, height)
              .png({
                quality: quality
              }).toBuffer();
            headers['Content-Type'] = 'image/png';
            break;
          default: // webp
            optimized = await sharpImg.resize(width, height)
              .webp({
                quality: quality
              }).toBuffer();
            headers['Content-Type'] = 'image/webp';
            break;
        }

        // return success webp image
        return context
          .status(200)
          .headers(headers)
          .succeed(optimized);
      } catch (error) {
        return context
          .status(422)
          .headers({
            "Content-type": "application/json"
          })
          .succeed({
            status: false,
            message: 'Resource could not optimizing. Is this url resource image?'
          });
      }

    } catch (e) {
      return context
        .status(422)
        .headers({
          "Content-type": "application/json"
        })
        .succeed({
          status: false,
          message: 'Resource could not found. Do you really sure url is image url?'
        });
    }
  } else {
    return context
      .status(400)
      .headers({
        "Content-type": "application/json"
      })
      .succeed({
        status: false,
        message: 'Please ensure image url to fetch and optimize operation.'
      });
  }
}