<!--
 * @Author: lixuming
 * @Date: 2026-09-09 09:46:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-09-15 17:42:04
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
import { onMounted, ref } from "vue";
import { Map, View } from 'ol'
import { useGisMapStore, useLayerStore } from "@/stores";
import { storeToRefs } from "pinia"
import { get as getProjection } from 'ol/proj';
import { useTiandituBaseMap } from "@/hooks";

const mapContainerRef = ref<HTMLElement | null>(null)
const gisMapStore = useGisMapStore()
const layerStore = useLayerStore()

const { layerList } = storeToRefs(layerStore)

// 用来存储地图实例
const gisMap = ref<Map | null>(null)


const { currentIndex, initBaseLayers, switchBaseMap } = useTiandituBaseMap(gisMap, layerList.value)

const initMap = () => {
  if (!mapContainerRef.value) return

  gisMap.value = new Map({
    target: mapContainerRef.value,
    view: new View({
      center: [106.039850, 35.208137],
      projection: 'EPSG:4326',
      zoom: 14
    }),
  })


  gisMapStore.setGisMap(gisMap.value)

  initBaseLayers()
}

onMounted(() => {
  initMap()
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