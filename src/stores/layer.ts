/*
 * @Author: lixuming
 * @Date: 2026-09-15 16:32:10
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-09-15 17:14:10
 * @Description: 图层store
 * @FilePath: \openLayer-study\src\stores\layer.ts
 */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayerStore = defineStore("layer", () => {
  const layerList = ref<any[]>([
    {
      name: "矢量底图",
      url: "https://t0.tianditu.gov.cn/vec_w/wmts",
      // 标注图层
      bzUrl: "https://t0.tianditu.gov.cn/cva_w/wmts",
    },
    {
      name: "影像底图",
      url: "https://t0.tianditu.gov.cn/img_w/wmts",
      // 标注图层
      bzUrl: "https://t0.tianditu.gov.cn/cia_w/wmts",
    },
    {
      name: "地形图",
      url: "https://t0.tianditu.gov.cn/ter_w/wmts",
      // 标注图层
      bzUrl: "https://t0.tianditu.gov.cn/cta_w/wmts",
    },
  ]);

  const baseLayer = ref<any>(layerList.value[0] || null);

  const setBaseLayer = (layer: any) => {
    baseLayer.value = layer;
  };

  return {
    baseLayer,
    setBaseLayer,
    layerList,
  };
});
