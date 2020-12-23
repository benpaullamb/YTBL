<template>
	<div class="like-bar">
		<div class="like-bar__labels">
			<span class="like-bar__text">{{ toYTNum(likes) }} likes</span>
			<span class="like-bar__text">{{ toYTNum(dislikes) }} dislikes</span>
		</div>

		<div
			:style="{
				gridTemplateColumns: `${likePercentage}% ${
					100 - likePercentage
				}%`,
			}"
			class="like-bar__bar"
		>
			<div class="like-bar__section like-bar__section--likes"></div>
			<div class="like-bar__section like-bar__section--dislikes"></div>
		</div>
	</div>
</template>

<script>
import numeral from 'numeral';

export default {
	props: {
		likes: {
			type: Number,
			default: 0,
		},
		dislikes: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		likePercentage() {
			return Math.round(
				(this.likes / (this.likes + this.dislikes)) * 100
			);
		},
	},
	methods: {
		toYTNum(views) {
			return numeral(views).format('0,0a');
		},
	},
};
</script>

<style>
.like-bar__labels {
	margin-bottom: 4px;
	display: flex;
	justify-content: space-between;
}

.like-bar__bar {
	display: grid;
}

.like-bar__section {
	height: 8px;
}

.like-bar__section--likes {
	background: green;
	border-top-left-radius: 8px;
	border-bottom-left-radius: 8px;
}

.like-bar__section--dislikes {
	background: red;
	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;
}
</style>
