<!--
 * @Author: lixuming
 * @Date: 2026-09-10 14:40:20
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-09-15 16:00:05
 * @Description: 左侧面板
 * @FilePath: \openLayer-study\src\layout\components\left-sider.vue
-->

<template>
  <div class="left-sider" :style="{ width: leftSiderCollapsed ? 0 : `${leftSiderWidth}px` }">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel v-for="item in collapseData" :key="item.key" :header="item.title">
        <div v-if="activeKey === 'view'">
          <!-- 内容区域 -->
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
import { useLayoutStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const layoutStore = useLayoutStore()

const { leftSiderCollapsed, leftSiderWidth } = storeToRefs(layoutStore)

const collapseLeft = () => {
  layoutStore.setLeftSiderCollapsed(!leftSiderCollapsed.value)
}

const collapseData = ref([
  {
    key: 'view',
    title: '视图',
  }
])

const activeKey = ref('view')

</script>

<style lang="scss" scoped>
.left-sider {
  position: relative;
  border: 1px solid #ff6600;
  height: 100%;
  transition: width 0.5s ease;
  flex-shrink: 0;

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