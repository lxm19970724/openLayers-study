/*
 * @Author: lixuming
 * @Date: 2026-09-15 16:32:10
 * @LastEditors: lixuming 1493311067@qq.com
 * @LastEditTime: 2026-09-17 17:27:15
 * @Description: 图层store
 * @FilePath: \openLayer-study\src\stores\layer.ts
 */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayerStore = defineStore("layer", () => {
  const layerList = ref<any[]>([
    {
      id: 1,
      name: "矢量底图",
      url: "https://t0.tianditu.gov.cn/vec_w/wmts",
      // 标注图层
      bzUrl: "https://t0.tianditu.gov.cn/cva_w/wmts",
    },
    {
      id: 2,
      name: "影像底图",
      url: "https://t0.tianditu.gov.cn/img_w/wmts",
      // 标注图层
      bzUrl: "https://t0.tianditu.gov.cn/cia_w/wmts",
    },
    {
      id: 3,
      name: "地形图",
      url: "https://t0.tianditu.gov.cn/ter_w/wmts",
      // 标注图层
      bzUrl: "https://t0.tianditu.gov.cn/cta_w/wmts",
    },
  ]);

  const currentLayer = ref<number>(2);

  const setCurrentLayer = (layer: any) => {
    currentLayer.value = layer;
  };

  return {
    currentLayer,
    setCurrentLayer,
    layerList,
  };
});
