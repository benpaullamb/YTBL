const util = require('util');
const cmd = util.promisify(require('child_process').exec);
const path = require('path');

const configPath = path.join(__dirname, '../assets/youtube-dl.conf');

async function downloadSongs(req) {
	const { urls } = req;
	let info = [];
	if (req.prefix) {
		req.prefix += ' ';
	}

	// Download in bulk all songs not renamed (can have the prefix)
	const untitledSongs = urls.filter((url) => !url.rename);
	if (untitledSongs.length > 0) {
		const res = await downloadUntitledSongs(untitledSongs, req.prefix);
		info = [...info, ...res];
	}

	// Then download in sync all songs renamed
	const renamedSongs = urls.filter((url) => url.rename);
	if (renamedSongs.length > 0) {
		const res = await downloadRenamedSongs(renamedSongs, req.prefix);
		info = [...info, ...res];
	}

	console.log('Downloaded:\n' + info.map((song) => song.title).join('\nand'));

	return info;
}

async function downloadRenamedSongs(urls, prefix = '') {
	const info = [];
	for (let i = 0; i < urls.length; ++i) {
		try {
			const { stdout: res, stderr: err } = await cmd(
				`youtube-dl ${urls[i].url} --config-location ${configPath} --print-json --output "C:/Users/benpa/Music/${prefix}${urls[i].filename}.%(ext)s"`
			);
			if (err) {
				continue;
			}

			const song = JSON.parse(res);
			info.push({
				title: song.title,
				thumbnail: song.thumbnail,
				url: song.webpage_url,
				uploader: song.uploader,
				uploadDate: song.upload_date,
				duration: song.duration,
				viewCount: song.view_count,
				likeCount: song.like_count,
				dislikeCount: song.dislike_count,
			});
		} catch (err) {
			console.error(err);
			return [];
		}
	}
	return info;
}

async function downloadUntitledSongs(urls, prefix = '') {
	try {
		const { stdout: res, stderr: err } = await cmd(
			`youtube-dl ${urls
				.map(({ url }) => url)
				.join(
					' '
				)} --config-location ${configPath} --print-json --output "C:/Users/benpa/Music/${prefix}%(title)s.%(ext)s"`
		);
		if (err) {
			return [];
		}

		let songs;
		if (urls.length > 1) {
			songs = JSON.parse(`[${res.split(/}\s*{/gi).join('},{')}]`);
		} else {
			songs = [JSON.parse(res)];
		}

		const info = songs.map((song) => {
			return {
				title: song.title,
				thumbnail: song.thumbnail,
				url: song.webpage_url,
				uploader: song.uploader,
				uploadDate: song.upload_date,
				duration: song.duration,
				viewCount: song.view_count,
				likeCount: song.like_count,
				dislikeCount: song.dislike_count,
			};
		});
		return info;
	} catch (err) {
		console.error(err);
		return [];
	}
}

module.exports = downloadSongs;
