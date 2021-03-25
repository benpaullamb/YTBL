<template>
  <div>
    <URLs :downloading="downloading" :time-elapsed="timeElapsed.toFixed(1)" @download-urls="downloadURLs" />

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
      downloadTimer: null,
      timeElapsed: 0,
    };
  },
  methods: {
    async downloadURLs(req) {
      const { urls } = req;

      if (this.downloading) return;
      const hasURLs = urls.some(({ url }) => url);
      if (!hasURLs) return;
      const validURLs = urls.filter(({ url }) => this.isValidLink(url));
      if (validURLs.length === 0) return;
      validURLs.forEach((urlObj) => {
        urlObj.url = urlObj.url.split('&')[0];
      });

      this.downloadTimer = setInterval(() => {
        this.timeElapsed += 0.1;
      }, 100);
      this.downloading = true;
      this.videos = [];

      const body = { urls: validURLs, prefix: req.prefix };

      const res = await fetch('/api/download-urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      this.videos = await res.json();

      clearInterval(this.downloadTimer);
      this.downloading = false;
      this.timeElapsed = 0;
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
