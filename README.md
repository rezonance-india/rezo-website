<h1 align="center">
	<img
		width="64"
		alt="The Lounge"
		src="https://raw.githubusercontent.com/rezonance-india/rezo-website/4e97a61266d0b5ef82c6f280bbc95d2dcab78e16/assets/images/rezonance-logo-blue.svg">
</h1>


<h3 align="center">
	A discord bot for streaming high-quality music with premium features like EQ & Queue controls for free!
</h3>
<br/>

<p align="center">
	<strong>
		<a href="https://rezobot.tech/">Website</a>
		•
		<a href="https://top.gg/bot/880328612245536778">Top.gg</a>
	</strong>
</p>
<br/>
<p align="center">
	<a href="https://github.com/thelounge/thelounge/actions"><img
		alt="Built with"
		src="https://img.shields.io/badge/Built_With-Vite-informational?style=flat&logo=vite&logoColor=white&color=646CFF&labelColor=20232A"></a>
	<a href="https://npm-stat.com/charts.html?package=thelounge&from=2016-02-12"><img
		alt="Support Server"
		src="https://img.shields.io/badge/Discord-informational?style=flat&logo=discord&logoColor=white&color=7289d9&labelColor=20232A"></a>
</p>

<p align="center">
	<img src="https://raw.githubusercontent.com/rezonance-india/rezo-website/master/assets/images/banner.png" width="550">
</p>

## Overview

- **Premium high quality sound**
- **EQ presets**
- **Volume Control**
- **Queue management**

To learn more, [invite rezo to your server](https://top.gg/bot/880328612245536778)


## Installation and usage

Rezo website uses [vite](https://vitejs.dev/)

To start the development server:

```sh
git clone https://github.com/rezonance-india/rezo-website.git
cd rezo-website
yarn
yarn dev --host
```

For building a distribution copy:

```sh
yarn build
```

## Directory Structure

```sh
.
├── about.html
├── assets
│   ├── images
│   │   ├── banner.png
│   │   ├── bx-envelope.svg
│   │   ├── bxl-github.svg
│   │   ├── bxl-linkedin.svg
│   │   ├── favicon.svg
│   │   └── rezonance-logo-blue.svg
│   ├── js
│   │   ├── 3d.js
│   │   ├── 3dabout.js
│   │   ├── about.js
│   │   └── main.js
│   └── styles
│       ├── about.scss
│       └── style.scss
├── index.html
├── package.json
├── tree.txt
├── vite.config.js
├── yarn-error.log
└── yarn.lock
```

Before submitting any change, make sure to:

- Read the [Contributing instructions](https://github.com/rezonance-india/rezo-website/blob/master/CONTRIBUTING.md)
- Run `yarn build` if you change or add anything to the file structure
- `yarn dev` can be used to start Vite with hot module reloading
