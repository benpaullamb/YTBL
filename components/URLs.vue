<template>
	<Section title="URLs">
		<template #title-extension>
			<transition name="fade">
				<span v-if="downloading" class="urls__loading"
					>Downloading - time elapsed: {{ timeElapsed }}s</span
				>
			</transition>
		</template>

		<div class="urls__group">
			<transition name="fade" mode="out-in">
				<span
					v-if="!usePrefix"
					key="click-here"
					class="urls__text"
					@click="usePrefix = !usePrefix"
					>Click here to add a prefix to all downloads</span
				>
				<span
					v-else
					key="prefix"
					class="urls__text"
					@click="usePrefix = !usePrefix"
					>Prefix for all downloads</span
				>
			</transition>
			<transition name="fade">
				<input
					v-if="usePrefix"
					v-model="prefix"
					type="text"
					class="input"
					placeholder="Enter a prefix..."
					:disabled="downloading"
				/>
			</transition>
		</div>

		<transition-group name="fade" tag="div">
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
						class="input"
						placeholder="Enter YouTube URL..."
						:disabled="downloading"
						@keydown.enter="addURLInput"
					/>
					<input
						v-if="url.rename"
						v-model="url.filename"
						type="text"
						class="input"
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
		</transition-group>

		<div class="buttons">
			<button
				class="button"
				title="Add URL"
				:disabled="downloading"
				@click="addURLInput"
			>
				<span class="material-icons">add</span>
			</button>
			<button
				class="button"
				title="Download videos"
				:disabled="downloading"
				@click="downloadURLs"
			>
				<span class="material-icons">get_app</span>
			</button>
			<button
				class="button"
				title="Clear all URLs"
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
		timeElapsed: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			prefix: '',
			usePrefix: false,
			urls: [
				{
					url: '',
					rename: false,
					filename: '',
				},
			],
		};
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

		downloadURLs() {
			const req = { urls: this.urls };
			if (this.usePrefix) {
				req.prefix = this.prefix;
			}
			this.$emit('download-urls', req);
		},
	},
};
</script>

<style>
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s;
}

.urls__loading {
	padding-left: 8px;
	font-size: 12px;
	font-style: italic;
}

.urls__group {
	margin-bottom: 16px;
}

.urls__text {
	margin-bottom: 8px;
	display: block;
	font-size: 14px;
	font-style: italic;
}

.urls__text:hover {
	cursor: pointer;
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
