/*
 * @Author: lixuming
 * @Date: 2026-09-15 14:59:41
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-09-15 15:35:16
 * @Description: layout store
 * @FilePath: \openLayer-study\src\stores\layout.ts
 */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore("layout", () => {
  const leftSiderCollapsed = ref<Boolean>(false);
  const rightSiderCollapsed = ref<Boolean>(false);
  const topSiderCollapsed = ref<Boolean>(false);
  const bottomSiderCollapsed = ref<Boolean>(false);
  const leftSiderWidth = ref<number>(340);
  const rightSiderWidth = ref<number>(340);

  const setLeftSiderCollapsed = (value: Boolean) => {
    leftSiderCollapsed.value = value;
  };

  const setRightSiderCollapsed = (value: Boolean) => {
    rightSiderCollapsed.value = value;
  };

  const setTopSiderCollapsed = (value: Boolean) => {
    topSiderCollapsed.value = value;
  };

  const setBottomSiderCollapsed = (value: Boolean) => {
    bottomSiderCollapsed.value = value;
  };

  const setLeftSiderWidth = (value: number) => {
    leftSiderWidth.value = value;
  };

  const setRightSiderWidth = (value: number) => {
    rightSiderWidth.value = value;
  };

  return {
    leftSiderCollapsed,
    setLeftSiderCollapsed,
    rightSiderCollapsed,
    setRightSiderCollapsed,
    topSiderCollapsed,
    setTopSiderCollapsed,
    bottomSiderCollapsed,
    setBottomSiderCollapsed,
    leftSiderWidth,
    setLeftSiderWidth,
    rightSiderWidth,
    setRightSiderWidth
  };
});