/*
 * @Author: lixuming
 * @Date: 2026-09-16 14:47:34
 * @LastEditors: lixuming 1493311067@qq.com
 * @LastEditTime: 2026-09-17 17:54:28
 * @Description:
 * @FilePath: \openLayer-study\src\hooks\useGisMap.ts
 */
import { Map, View } from "ol";
import { message } from "ant-design-vue";
import { createLayerPair } from "@/utils";
import { useLayerStore } from "@/stores";
import { ref } from "vue";
import type { LayerPair } from "@/types/layer";
import type { EventsKey } from "ol/events";
import { unByKey } from "ol/Observable";

const layerStore = useLayerStore();

type OlMapEventType = Parameters<Map["on"]>[0];

// 保存所有事件监听key，销毁自动解绑
const eventKeys: EventsKey[] = [];

interface GisMapUtilsType {
  init: (
    dom: HTMLDivElement,
    options?: { center?: [number, number]; zoom?: number },
  ) => void;
  destroy: () => void;
  changeBaseLayer: (layerId: number) => void;
  removeAllLayers: () => void;
  removeLayerById: (layerId: number) => void;
  addEventListener: (
    type: OlMapEventType,
    listener: (evt: unknown) => void,
  ) => EventsKey;
  removeEventListener: (eventKey: EventsKey) => void;
}

let mapInstance: Map | null = null;

const baseLayersGroup = ref<LayerPair[]>([]);

//工具函数
const utils: GisMapUtilsType = {
  init(
    dom: HTMLDivElement,
    options?: { center?: [number, number]; zoom?: number },
  ) {
    if (mapInstance) {
      message.error("地图已经初始化，请勿重复创建！");
      return;
    }

    const layersGroup = layerStore.layerList.map((item) =>
      createLayerPair(item),
    );

    baseLayersGroup.value = layersGroup;

    // 初始化地图
    mapInstance = new Map({
      target: dom,
      view: new View({
        center: options?.center || [106.019297427259, 35.14806723230799],
        projection: "EPSG:4326",
        zoom: options?.zoom || 19,
      }),
    });

    layersGroup.forEach((group: LayerPair) => {
      mapInstance!.addLayer(group.baseLayer);
      mapInstance!.addLayer(group.labelLayer);
    });

    this.changeBaseLayer(layerStore.currentLayer);
  },

  changeBaseLayer(layerId: number) {
    if (!mapInstance) {
      message.error("地图未初始化，请先初始化地图！");
      return;
    }

    baseLayersGroup.value.forEach((group, index) => {
      const visible = layerStore.layerList[index]?.id === layerId;
      group.baseLayer.setVisible(visible);
      group.labelLayer.setVisible(visible);
    });
  },

  removeAllLayers() {
    if (!mapInstance) {
      message.error("地图未初始化，请先初始化地图！");
      return;
    }
    baseLayersGroup.value.forEach((group) => {
      mapInstance!.removeLayer(group.baseLayer);
      mapInstance!.removeLayer(group.labelLayer);
    });
  },

  removeLayerById(layerId: number) {
    if (!mapInstance) {
      message.error("地图未初始化，请先初始化地图！");
      return;
    }
    const index = layerStore.layerList.findIndex((item) => item.id === layerId);
    if (index !== -1) {
      const group = baseLayersGroup.value[index];
      mapInstance!.removeLayer(group.baseLayer);
      mapInstance!.removeLayer(group.labelLayer);
    }
  },

  addEventListener(
    type: OlMapEventType,
    listener: (evt: any) => void,
  ): EventsKey {
    if (!mapInstance) throw new Error("地图未初始化，请先初始化地图！");
    const key = mapInstance.on(type, listener);
    eventKeys.push(key);
    return key;
  },

  removeEventListener(eventKey: EventsKey) {
    if (!mapInstance) {
      message.error("地图未初始化，请先初始化地图！");
      return;
    }
    unByKey(eventKey);
    const idx = eventKeys.indexOf(eventKey);
    if (idx > -1) eventKeys.splice(idx, 1);
  },

  destroy() {
    if (mapInstance) {
      eventKeys.forEach((key) => {
        unByKey(key);
      });
      eventKeys.length = 0;
      mapInstance.setTarget(undefined);
      mapInstance.dispose();
      mapInstance = null;
    }
  },
};

export const gismap = { utils };
