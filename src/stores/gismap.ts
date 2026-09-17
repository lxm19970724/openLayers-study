/*
 * @Author: lixuming
 * @Date: 2026-09-15 16:54:52
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-09-15 16:57:18
 * @Description: 
 * @FilePath: \openLayer-study\src\stores\gismap.ts
 */
import { defineStore } from "pinia";
import { shallowRef, markRaw } from "vue";
import type { Map } from "ol";

export const useGisMapStore = defineStore("gisMap", () => {
  const gisMap = shallowRef<Map | null>(null);

  const setGisMap = (mapInstance: Map) => {
    gisMap.value = markRaw(mapInstance);
  };

  const destroyGisMap = () => {
    if (gisMap.value) {
      gisMap.value.setTarget(null);
      gisMap.value = null;
    }
  };

  return {
    gisMap,
    setGisMap,
    destroyGisMap
  };
});
