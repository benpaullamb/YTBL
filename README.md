# YTBL

Ben's YouTube Downloader web app for single and batch downloading.

_Made with Nuxt.js, Vue.js, and Express.js_

## Backlog

-   Refactor
-   Add a "time elapsed" when downloading
-   Rename button next to URL that fetches video name
-   "Add prefix" button for group renaming
-   Transitions for everything
-   More backend URL validation
-   Links section to popular anime OST YT searches
-   Support for playlists

## Setup on Windows

> `youtube-dl` is a CLI YouTube downloader. `FFmpeg` is a fast CLI video and audio converter. These two CLI tools are used by this app.

1. Install `youtube-dl` by running command `pip install --upgrade youtube-dl`
2. Install `FFmpeg`
    1. Download the release essentials build zip from [gyan.dev](https://www.gyan.dev/ffmpeg/builds/)
    2. Extract the zip and place the folder somewhere you want to leave it
    3. Add the path, to the bin folder, to your user path environment variable
3. Run `npm i` to install dependencies
4. Double click the `ytbl.bat` file or run `npm run express` and go to `http://localhost` to use the app
5. (Optional) create a shortcut to the `ytbl.bat` file on your desktop for quick access

## Nuxt Commands

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
