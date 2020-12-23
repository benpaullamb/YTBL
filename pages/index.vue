<template>
	<div>
		<div class="section">
			<div class="section__container">
				<h2 class="section__title">
					URLs
					<transition name="fade">
						<span v-if="downloading" class="section__loading"
							>Downloading</span
						>
					</transition>
				</h2>
				<div
					v-for="(url, i) in urls"
					:key="`url-${i}`"
					class="input__container"
				>
					<input
						v-model="url.url"
						type="url"
						class="input"
						placeholder="Enter YouTube URL..."
						:disabled="downloading"
						@keydown.enter="addURLInput"
					/>
					<span
						class="input__delete material-icons"
						@click="deleteURL(i)"
						>clear</span
					>
				</div>
				<div class="buttons">
					<button
						class="button"
						:disabled="downloading"
						@click="addURLInput"
					>
						<span class="material-icons">add</span>
					</button>
					<button
						class="button"
						:disabled="downloading"
						@click="downloadURLs"
					>
						<span class="material-icons">get_app</span>
					</button>
					<button
						class="button"
						:disabled="downloading"
						@click="clearAllURLs"
					>
						<span class="material-icons">clear_all</span>
					</button>
				</div>
			</div>
		</div>

		<div class="section">
			<div class="section__container">
				<transition name="fade">
					<div v-if="videos.length > 0">
						<div class="section__title">Downloaded Videos</div>
						<div v-for="video in videos" :key="video.title">
							<VideoInfo :info="video" />
						</div>
					</div>
				</transition>
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
	computed: {
		flatUrls() {
			return this.urls.map(({ url }) => {
				return url.split('&')[0];
			});
		},
	},
	methods: {
		addURLInput() {
			this.urls.push({ url: '' });
		},

		async downloadURLs() {
			const hasURLs = this.urls.some(({ url }) => url);
			if (!hasURLs || this.downloading) return;

			this.downloading = true;
			this.videos = [];
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

		clearAllURLs() {
			this.urls = [
				{
					url: '',
				},
			];
		},

		deleteURL(i) {
			if (this.urls.length > 1) {
				this.urls.splice(i, 1);
			}
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

.section__loading {
	padding-left: 8px;
	font-size: 12px;
	font-style: italic;
}

.input {
	width: 100%;
	padding: 8px;
	border: 1px solid grey;
	border-radius: 4px;
	font-size: 16px;
}

.input__container {
	margin-bottom: 16px;
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
}

.input__delete {
	margin-left: 8px;
}

.input__delete:hover {
	cursor: pointer;
}

.buttons {
	display: flex;
	justify-content: center;
}

.button {
	padding: 4px 8px;
	margin-right: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
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

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
