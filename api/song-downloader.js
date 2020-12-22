const util = require('util');
const cmd = util.promisify(require('child_process').exec);
const path = require('path');

const configPath = path.join(__dirname, '../assets/youtube-dl.conf');

async function downloadSongs(urls) {
	try {
		const { stdout: res, stderr: err } = await cmd(
			`youtube-dl ${urls.join(
				' '
			)} --config-location ${configPath} -s --print-json`
		);
		if (err) {
			return false;
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
		console.log(info);
		return info;
	} catch (err) {
		console.error(err);
		return false;
	}
}

module.exports = downloadSongs;
