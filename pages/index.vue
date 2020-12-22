<template>
	<div>
		<div class="section">
			<div class="section__container">
				<h2 class="section__title">URLs</h2>
				<div v-for="(url, i) in urls" :key="`url-${i}`">
					<input
						v-model="url.url"
						type="url"
						class="input"
						placeholder="Enter YouTube URL..."
						@keydown.enter="addURLInput"
					/>
				</div>
				<div class="buttons">
					<button class="button" @click="addURLInput">Add</button>
					<button class="button" @click="downloadURLs">
						Download
					</button>
				</div>
			</div>
		</div>

		<div class="section">
			<div v-if="videos.length > 0" class="section__container">
				<div class="section__title">Downloaded Videos</div>
				<div v-for="video in videos" :key="video.title">
					<VideoInfo :info="video" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VideoInfo from '../components/VideoInfo.vue';

export default {
	components: {
		VideoInfo,
	},
	data() {
		return {
			urls: [
				{
					url: '',
				},
			],
			videos: [],
			downloading: false,
		};
	},
	methods: {
		addURLInput() {
			this.urls.push({ url: '' });
		},

		async downloadURLs() {
			const hasURLs = this.urls.some(({ url }) => url);
			if (!hasURLs || this.downloading) return;

			this.downloading = true;
			const res = await fetch('/api/download-urls', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(this.flatUrls),
			});
			this.videos = await res.json();
			this.downloading = false;

			console.log(this.videos);
		},

		isValidLink(url) {
			const urlRegex = /https:\/\/www\.youtube\.com\/watch\?v=.+/gi;
			const res = url.match(urlRegex);
			return res && res.length > 0;
		},
	},
	computed: {
		flatUrls() {
			return this.urls.map(({ url }) => {
				return url.split('&')[0];
			});
		},
	},
};
</script>

<style scoped>
.section {
	padding: 32px;
	display: flex;
	justify-content: center;
	border-bottom: 1px solid lightgrey;
}

.section:last-child {
	border: none;
}

.section__container {
	width: 60%;
}

.section__title {
	margin-bottom: 16px;
	font-size: 28px;
	font-weight: normal;
}

.input {
	width: 100%;
	margin-bottom: 16px;
	padding: 8px;
	border: 1px solid grey;
	border-radius: 4px;
	font-size: 16px;
}

.buttons {
	display: flex;
	justify-content: center;
}

.button {
	padding: 8px;
	margin-right: 16px;
	background: #ff6f00;
	box-shadow: 0 1px 2px 0 #c43e00;
	border: none;
	border-radius: 4px;
	font-weight: bold;
	text-transform: uppercase;
}

.button:last-child {
	margin-right: 0;
}

.button:hover {
	cursor: pointer;
}
</style>
