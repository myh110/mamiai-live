<template>
  <div class="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 flex flex-col">
    <div class="flex-shrink-0 text-center mb-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">
        🎬 Live Streaming Hub
      </h1>
    </div>

    <div class="flex-1 max-w-7xl mx-auto w-full">
      <div class="h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div
          v-for="item in data"
          :key="item.contitle"
          class="group relative bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-4 hover:bg-gray-700/60 transition-all duration-300 flex flex-col h-full"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div class="relative z-10 flex flex-col h-full">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-semibold text-gray-100 truncate group-hover:text-blue-200 transition-colors flex-1">
                {{ item.contitle }}
              </h3>
              <div class="flex items-center space-x-2 flex-shrink-0 ml-2">
                <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span class="text-xs text-gray-300 font-medium">LIVE</span>
              </div>
            </div>

            <div class="flex-1 bg-black/80 rounded-xl overflow-hidden shadow-lg">
              <ClientOnly>
                <HlsPlayer :url="item.hlsUrl" />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HlsPlayer from '../components/HlsPlayer.vue'

const header = useResponseHeader('Cache-Control');
header.value = 'no-store, no-cache, must-revalidate';

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
</script>

