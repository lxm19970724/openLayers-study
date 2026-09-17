<!--
 * @Author: lixuming
 * @Date: 2026-09-10 11:50:17
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-09-15 15:19:11
 * @Description: 
 * @FilePath: \openLayer-study\src\layout\index.vue
-->
<template>
    <div class="layout">
        <app-header />
        <div class="layout-content">
            <left-sider />
            <router-view />
            <right-sider />
        </div>
        <app-footer />
    </div>
</template>

<script setup lang="ts">
// 自动导入
import AppHeader from './components/app-header.vue'
import AppFooter from './components/app-footer.vue'
import LeftSider from './components/left-sider.vue'
import RightSider from './components/right-sider.vue'

</script>

<style lang="scss" scoped>
.layout {
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .layout-content {
        flex: 1;
        display: flex;
    }
}
</style>