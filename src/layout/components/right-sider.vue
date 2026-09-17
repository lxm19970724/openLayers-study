<!--
 * @Author: lixuming
 * @Date: 2026-09-10 14:40:20
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-09-15 15:43:00
 * @Description: 
 * @FilePath: \openLayer-study\src\layout\components\right-sider.vue
-->
<!--
 * @Author: lixuming
 * @Date: 2026-09-10 14:40:20
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-09-15 11:31:43
 * @Description: 
 * @FilePath: \openLayer-study\src\layout\components\right-sider.vue
-->

<template>
  <div
    class="right-sider"
    :style="{ width: rightSiderCollapsed ? 0 : `${rightSiderWidth}px` }"
  >
    <div class="collapse-btn" @click="collapseRight">
      <LeftOutlined style="color: #fff" v-if="rightSiderCollapsed" />
      <RightOutlined style="color: #fff" v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
// 自动导入
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import { useLayoutStore } from "@/stores";
import { storeToRefs } from "pinia";

const layoutStore = useLayoutStore();

const { rightSiderCollapsed, rightSiderWidth } = storeToRefs(layoutStore);

const collapseRight = () => {
  layoutStore.setRightSiderCollapsed(!rightSiderCollapsed.value);
};
</script>

<style lang="scss" scoped>
.right-sider {
  position: relative;
  height: 100%;
  transition: width 0.5s ease;
  flex-shrink: 0;

  .collapse-btn {
    position: absolute;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    width: 20px;
    height: 60px;
    background: #856eec;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px 0 0 10px;
    cursor: pointer;
    z-index: 2;
  }
}
</style>
