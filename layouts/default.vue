<template>
	<div>
		<Header />
		<Nuxt />
	</div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
	components: {
		Header,
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
