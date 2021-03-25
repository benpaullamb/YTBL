<template>
  <div class="video-info">
    <div class="video-info__section">
      <img class="video-info__thumbnail" :src="info.thumbnail" alt="Video thumbnail" />
    </div>

    <div class="video-info__section">
      <h3 class="video-info__title">
        <a class="video-info__link" :href="info.url" target="_blank"
          >{{ info.title }} -
          <span class="video-info__time">{{ toDuration(info.duration) }}</span>
        </a>
      </h3>

      <span class="video-info__text">By {{ info.uploader }}</span>

      <span class="video-info__text">{{ toYTNum(info.viewCount) }} views - {{ toYTDate(info.uploadDate) }}</span>

      <LikeBar :likes="info.likeCount" :dislikes="info.dislikeCount" />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import numeral from 'numeral';
import LikeBar from './LikeBar.vue';

// title,
// thumbnail,
// url,
// uploader,
// uploadDate,
// duration,
// viewCount,
// likeCount,
// dislikeCount,
export default {
  components: {
    LikeBar,
  },
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    toYTDate(date) {
      return moment(date, 'YYYYMMDD').format('MMM D, YYYY');
    },
    toYTNum(views) {
      return numeral(views).format('0,0a');
    },
    toDuration(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds}`;
    },
  },
};
</script>

<style>
.video-info {
  padding: 16px;
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 16px;
  border: 1px solid lightgrey;
  border-radius: 16px;
}

.video-info__thumbnail {
  width: 200px;
}

.video-info__title {
  margin-bottom: 8px;
}

.video-info__link {
  font-size: 20px;
  font-weight: normal;
  color: black;
  text-decoration: none;
}

.video-info__time {
  font-style: italic;
}

.video-info__text {
  margin-bottom: 8px;
  display: block;
}
</style>
