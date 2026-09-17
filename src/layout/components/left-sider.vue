<!--
 * @Author: lixuming
 * @Date: 2026-09-10 14:40:20
 * @LastEditors: lixuming 1493311067@qq.com
 * @LastEditTime: 2026-09-17 17:58:32
 * @Description: 左侧面板
 * @FilePath: \openLayer-study\src\layout\components\left-sider.vue
-->

<template>
  <div class="left-sider" :style="{ width: leftSiderCollapsed ? 0 : `${leftSiderWidth}px` }">
    <a-collapse v-model:activeKey="activeKey" accordion>
      <a-collapse-panel v-for="item in collapseData" :key="item.key" :header="item.title">
        <div v-if="activeKey.includes('view')">
          <!-- 内容区域 -->
          <div class="btn-group">
            <a-button v-for="layer in layerStore.layerList" :key="layer.id"
              :type="layer.id === layerStore.currentLayer ? 'primary' : 'default'" @click="changeBaseLayer(layer.id)">
              {{ layer.name }}
            </a-button>
          </div>
        </div>
        <div v-if="activeKey.includes('operation')" class="btn-group">
          <!-- 操作内容区域 -->
           <a-button type="primary" @click="handleClickEvent">点击事件</a-button>
           <a-button type="primary" @click="handleRemoveClickEvent">移除点击事件</a-button>
        </div>
      </a-collapse-panel>
    </a-collapse>
    <!-- 左侧开关 -->
    <div class="collapse-btn" @click="collapseLeft">
      <RightOutlined style="color: #fff" v-if="leftSiderCollapsed" />
      <LeftOutlined style="color: #fff" v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
// 自动导入
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'
import { useLayoutStore, useLayerStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { gismap } from '@/hooks/useGisMap'

const layoutStore = useLayoutStore()
const layerStore = useLayerStore()

const { leftSiderCollapsed, leftSiderWidth } = storeToRefs(layoutStore)

const collapseLeft = () => {
  layoutStore.setLeftSiderCollapsed(!leftSiderCollapsed.value)
}

const collapseData = ref([
  {
    key: 'view',
    title: '视图',
  },
  {
    key: 'operation',
    title: '操作',
  }
])

const activeKey = ref<string[]>(['view'])

const changeBaseLayer = (layerId: number) => {
  gismap.utils.changeBaseLayer(layerId)
  layerStore.setCurrentLayer(layerId)
}

const handleClickEvent = () => {
  gismap.utils.addEventListener('click', (evt: any) => {
    console.log('点击事件触发', evt.coordinate);
  })
}

const handleRemoveClickEvent = () => {
  gismap.utils.removeEventListener('click')
}

</script>

<style lang="scss" scoped>
.left-sider {
  position: relative;
  border: 1px solid #ff6600;
  height: 100%;
  transition: width 0.5s ease;
  flex-shrink: 0;
  .btn-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .collapse-btn {
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    width: 20px;
    height: 60px;
    background: #856eec;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 10px 10px 0;
    cursor: pointer;
    z-index: 2;
  }
}
</style>