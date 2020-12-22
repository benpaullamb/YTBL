<template>
	<div>
		<BLHeader />
		<Nuxt />
	</div>
</template>

<script>
import BLHeader from '../components/BLHeader.vue';

export default {
	components: {
		BLHeader,
	},
};
</script>

<style>
* {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
	font-family: sans-serif;
}
</style>
