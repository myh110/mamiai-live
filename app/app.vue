<template>
  <div class="live-grid">
    <div 
      v-for="item in data" 
      :key="item.contitle"
      class="live-item"
    >
      <h3 class="live-title">{{ item.contitle }}</h3>
      <ClientOnly>
        <HlsPlayer :url="item.hlsUrl" />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import HlsPlayer from '../components/HlsPlayer.vue'
const { data } = await useFetch<any>(
  "http://jy.7he.tv/index.php?m=api&f=minprograme&v=public_videoList&unionid=ocsNF0zPPbJRoRfo6jwqtcUh-V48&mOpenId=oo-nG00mkqvMONjDgLbbih-M0V7I&platform=minprograme",
  {
    transform: (res) => {
      const { data = [] } = JSON.parse(res);
      return data.map((item: any) => ({
        ...item,
        hlsUrl: item.hlsUrl.replace(/http:/, 'https:').replace(':80', '') // Ensure HLS URL uses HTTPS
      }));
    },
  }
);
console.log(data.value);
</script>

<style scoped>
.live-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  min-height: 100vh;
  padding: 10px;
  box-sizing: border-box;
}

.live-item {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-height: 200px;
}

.live-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 480px) {
  .live-grid {
    padding: 15px;
    gap: 18px;
  }
  
  .live-item {
    padding: 15px;
    min-height: 250px;
  }
  
  .live-title {
    font-size: 15px;
    margin-bottom: 10px;
  }
}

@media (min-width: 768px) {
  .live-grid {
    grid-template-columns: 1fr 1fr;
    padding: 20px;
    gap: 20px;
  }
  
  .live-item {
    min-height: 300px;
  }
  
  .live-title {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .live-grid {
    grid-template-rows: 1fr 1fr;
    height: 100vh;
  }
  
  .live-item {
    min-height: auto;
  }
}

@media (min-width: 1200px) {
  .live-grid {
    padding: 25px;
    gap: 25px;
  }
  
  .live-item {
    padding: 20px;
  }
  
  .live-title {
    font-size: 18px;
    margin-bottom: 12px;
  }
}
</style>
