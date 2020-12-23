<template>
	<Section title="URLs">
		<template v-if="downloading" #title-extension>
			<span class="urls__loading">Downloading</span>
		</template>
		<div v-for="(url, i) in urls" :key="`url-${i}`" class="urls__urls">
			<div
				class="urls__inputs"
				:style="{
					'grid-template-columns': url.rename ? '1fr 1fr' : '1fr',
				}"
			>
				<input
					v-model="url.url"
					type="url"
					class="urls__input"
					placeholder="Enter YouTube URL..."
					:disabled="downloading"
					@keydown.enter="addURLInput"
				/>
				<input
					v-if="url.rename"
					v-model="url.filename"
					type="text"
					class="urls__input"
					placeholder="Enter a new filename..."
					:disabled="downloading"
					@keydown.enter="addURLInput"
				/>
			</div>
			<div class="urls__buttons">
				<span
					class="urls__icon material-icons"
					title="Rename file"
					@click="url.rename = !url.rename"
					>edit</span
				>
				<span
					class="urls__icon material-icons"
					title="Delete URL"
					@click="deleteURL(i)"
					>clear</span
				>
			</div>
		</div>

		<div class="buttons">
			<button class="button" :disabled="downloading" @click="addURLInput">
				<span class="material-icons">add</span>
			</button>
			<button
				class="button"
				:disabled="downloading"
				@click="$emit('download-urls', flatUrls)"
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
	</Section>
</template>

<script>
import Section from './Section.vue';

export default {
	components: {
		Section,
	},
	props: {
		downloading: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			urls: [
				{
					url: '',
					rename: false,
					filename: '',
				},
			],
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
			this.urls.push({ url: '', rename: false, filename: '' });
		},

		clearAllURLs() {
			this.urls = [
				{
					url: '',
					rename: false,
					filename: '',
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

<style>
.urls__loading {
	padding-left: 8px;
	font-size: 12px;
	font-style: italic;
}

.urls__urls {
	margin-bottom: 16px;
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
}

.urls__inputs {
	display: grid;
	column-gap: 8px;
}

.urls__input {
	width: 100%;
	padding: 8px;
	border: 1px solid grey;
	border-radius: 4px;
	font-size: 16px;
}

.urls__icon {
	margin-left: 8px;
}

.urls__icon:hover {
	cursor: pointer;
}

.buttons {
	display: flex;
	justify-content: center;
}
</style>
