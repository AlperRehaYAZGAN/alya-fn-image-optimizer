[![Contributors][contributors-shield]][contributors-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]

<p align="center">
  <h3 align="center">Alya-Functions Image Optimizer Serverless Function</h3>
  <br/>
  


  <p align="center">
    Simple serverless function for fetch then optimize image operation. Cloud native image optimizing api tool built with OpenFaas utilities!
    <br />
    <a href="https://www.openfaas.com/"><strong>Explore the Openfaas »</strong></a>
    <br />
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#todo">TODO</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project

Serverless functions make development and testing easier. Almost every project, project can be divided into several parts to manage individually. One of these parts is image optimize background process. In this repository, I'm aiming to create a individual docker cloud function (Openfaas) for optimize given url image resource to given format,quality etc. options. 

### Built With

- [Openfaas](https://www.openfaas.com/) for code schema
- [faas-cli](https://www.openfaas.com/) to create docker container
- [Axios](https://www.npmjs.com/package/axios) for fetch image url api
- [Sharp](https://www.npmjs.com/package/sharp) for optimize image buffer

## Getting Started
### Prerequisites

- Docker
  ```sh
  Install docker on your OS  
  https://docs.docker.com/get-docker/  
  ```
- faas-cli
  ```
  Install latest faas-cli  
  https://github.com/openfaas/faas/releases 
  ```

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/AlperRehaYAZGAN/alya-fn-image-optimizer.git  
   cd alya-fn-image-optimizer
   ```
2. Build docker image:
   ```sh
   faas-cli build -f image-optimizer.yml
   ```
3. Run Docker container:
   ```sh
   docker run --name alya-image-optimizer -e http_port=12341 -p 3000:12341 -d image-optimizer:1.0.0
   ```

## Usage

This cloud function has a one endpoint to handle whole process. If we assert server is listening on 3000 port the following query save optimized image as alya-fn-image.webp

- Webp convertion and %80 quality optimization  

```sh
   curl -X GET -G \  
   "http://localhost:3000" \ 
   -d format=webp \ 
   -d quality=80 \ 
   -d height=300 \ 
   -d width=300 \ 
   -d url=https://picsum.photos/720/720 \ 
   -o alya-fn-image.webp
   ```

- Jpeg convertion and %80 quality optimization
```sh
   curl -X GET -G \  
   "http://localhost:3000" \ 
   -d format=jpeg \ 
   -d quality=80 \ 
   -d height=300 \ 
   -d width=300 \ 
   -d url=https://picsum.photos/720/720 \ 
   -o alya-fn-image.jpg
   ```



## Roadmap

See the [open issues](https://github.com/AlperRehaYAZGAN/alya-fn-image-optimizer/issues) for a list of proposed features (and known issues).

## TODO  
- [X] JPEG,PNG,WEBP Image convertion and optimization  
- [-] After optimization webhook for statistical implementation  
- [-] NATS-queue implementation

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Alper Reha YAZGAN - [@alperreha](https://twitter.com/alperreha) - alper@yazgan.xyz

Project Link: [https://github.com/AlperRehaYAZGAN/alya-fn-image-optimizer](https://github.com/AlperRehaYAZGAN/alya-fn-image-optimizer)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/AlperRehaYAZGAN/alya-fn-image-optimizer.svg?style=for-the-badge
[contributors-url]: https://github.com/AlperRehaYAZGAN/alya-fn-image-optimizer/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/AlperRehaYAZGAN/alya-fn-image-optimizer.svg?style=for-the-badge
[issues-url]: https://github.com/AlperRehaYAZGAN/alya-fn-image-optimizer/issues
[license-shield]: https://img.shields.io/github/license/AlperRehaYAZGAN/alya-fn-image-optimizer.svg?style=for-the-badge
[license-url]: https://github.com/AlperRehaYAZGAN/alya-fn-image-optimizer/blob/master/LICENSE.txt
