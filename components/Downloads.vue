<template>
  <Section title="Downloaded Videos">
    <transition name="fade" mode="out-in">
      <div v-if="videos.length > 0" key="videos">
        <VideoInfo v-for="video in videos" :key="video.title" :info="video" />
      </div>

      <div v-else key="none">
        <span class="videos__none">Your downloaded videos will appear here.</span>
      </div>
    </transition>
  </Section>
</template>

<script>
import VideoInfo from './VideoInfo.vue';
import Section from './Section.vue';

export default {
  components: {
    Section,
    VideoInfo,
  },
  props: {
    videos: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.videos__none {
  font-size: 14px;
  font-style: italic;
}
</style>
