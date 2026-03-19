<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import VideoCacheService from '@/services/VideoCacheService'

const poster = ref<string>()
const source = ref<string>()

const defineAssets = () => {
  return {
    posterUrl: '/media/video/loading_video.webp',
    videoUrl: '/media/video/loading_video.webm'
  }
}

onBeforeMount(async () => {
  const { videoUrl, posterUrl } = defineAssets()

  poster.value =
    VideoCacheService.getCached(posterUrl) ?? (await VideoCacheService.preload(posterUrl))
  source.value =
    VideoCacheService.getCached(videoUrl) ?? (await VideoCacheService.preload(videoUrl))
})
</script>

<template>
  <div class="loading" :style="{ backgroundImage: `url(${poster ? poster : defineAssets().posterUrl})` }">
    <video
      :src="source"
      :poster="poster"
      class="user-card-background"
      autoplay
      muted
      type="video/webm"
      ref="video"
      playsinline
      webkit-playsinline
    />
  </div>
</template>

<style scoped>
.extra-title-wrapper {
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0 20px;
  color: #ffffff;
}
.extra-title-pretitle {
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  text-transform: uppercase;
}
.extra-title-name {
  font-weight: 800;
  font-size: 48px;
  line-height: 100%;
  text-align: center;
  text-transform: uppercase;
}
.user-card-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.loading {
  --loading-bg-color: #170b54;
  --loading-text-color: #fff;

  max-width: 428px;
  margin: auto;
  position: fixed;
  inset: 0;
  z-index: 8999;
  width: 100%;
  height: 100%;
  background: var(--loading-bg-color);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: var(--loading-text-color);
}

.headline {
  margin-top: auto;
  margin-bottom: auto;
  z-index: 9;
}

.headline h3 {
  font-weight: 900;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.238133px;
  color: var(--loading-text-color);
  margin-top: 45px;
  padding: 0 20px;
  text-transform: uppercase;
  text-decoration: underline;
}
</style>
