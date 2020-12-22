const express = require('express');
const { loadNuxt, build } = require('nuxt');
const downloadSongs = require('./song-downloader');
const app = express();

const port = process.env.PORT || 80;
const isDev = process.env.NODE_ENV !== 'production';

app.use(express.json());

app.post('/api/download-urls', async (req, res) => {
	const info = await downloadSongs(req.body);
	if (info) {
		return res.json(info);
	} else {
		res.json(null);
	}
});

(async function () {
	const nuxt = await loadNuxt(isDev ? 'dev' : 'start');

	app.use(nuxt.render);

	if (isDev) {
		build(nuxt);
	}

	app.listen(port, () => {
		console.log(`http://localhost:${port}`);
	});
})();
