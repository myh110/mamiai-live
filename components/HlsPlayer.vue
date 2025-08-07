<template>
  <div class="hls-player">
    <video
      ref="videoRef"
      controls
      autoplay
      muted
      width="100%"
      height="100%"
      :style="{
        background: '#000',
        borderRadius: '8px',
        objectFit: 'contain'
      }"
    >
      您的浏览器不支持 video 标签
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  url: string
}>()

const videoRef = ref<HTMLVideoElement>()

onMounted(async () => {
  if (!videoRef.value || import.meta.server) return
  
  // 动态导入 HLS.js 只在客户端运行
  const { default: Hls } = await import('hls.js')
  
  if (Hls.isSupported()) {
    const hls = new Hls()
    hls.loadSource(props.url)
    hls.attachMedia(videoRef.value)
    
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      console.log('HLS manifest parsed, starting playback')
    })
    
    onUnmounted(() => {
      hls.destroy()
    })
  } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari原生支持HLS
    videoRef.value.src = props.url
  } else {
    console.error('HLS is not supported in this browser')
  }
})
</script>

<style scoped>
.hls-player {
  flex: 1;
  display: flex;
  min-height: 0;
  position: relative;
  overflow: hidden;
}

@media (max-width: 767px) {
  .hls-player {
    min-height: 180px;
  }
}

@media (min-width: 768px) {
  .hls-player {
    min-height: 200px;
  }
}

@media (min-width: 1024px) {
  .hls-player {
    min-height: 250px;
  }
}
</style>