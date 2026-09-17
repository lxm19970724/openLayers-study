<!--
 * @Author: lixuming
 * @Date: 2026-09-09 09:46:07
 * @LastEditors: lixuming 1493311067@qq.com
 * @LastEditTime: 2026-09-17 16:05:14
 * @Description: 
 * @FilePath: \openLayer-study\src\views\home\index.vue
-->
<template>
  <div class="home">
    <div class="map-container" ref="mapContainerRef"></div>
  </div>
</template>

<script setup lang="ts">
// 自动导入
import { gismap } from "@/hooks/useGisMap";
import { onMounted, onUnmounted, ref } from "vue";

const mapContainerRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  gismap.utils.init(mapContainerRef.value as HTMLDivElement);
})

onUnmounted(() => {
  gismap.utils.destroy();
})

</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;

  .map-container {
    width: 100%;
    height: 100%;

    :deep(.ol-control) {
      display: none;
    }
  }
}
</style>