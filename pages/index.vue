<template>
	<div>
		<URLs :downloading="downloading" @download-urls="downloadURLs" />

		<Downloads :videos="videos" />
	</div>
</template>

<script>
import URLs from '../components/URLs.vue';
import Downloads from '../components/Downloads.vue';

export default {
	components: {
		URLs,
		Downloads,
	},
	data() {
		return {
			videos: [],
			downloading: false,
		};
	},
	methods: {
		async downloadURLs(urls) {
			const hasURLs = urls.some((url) => url);
			if (!hasURLs || this.downloading) return;

			this.downloading = true;
			this.videos = [];
			const res = await fetch('/api/download-urls', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(urls),
			});
			this.videos = await res.json();
			this.downloading = false;
		},

		isValidLink(url) {
			const urlRegex = /https:\/\/www\.youtube\.com\/watch\?v=.+/gi;
			const res = url.match(urlRegex);
			return res && res.length > 0;
		},
	},
};
</script>

<style></style>
