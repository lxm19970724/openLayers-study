/*
 * @Author: lixuming
 * @Date: 2026-09-16 14:47:34
 * @LastEditors: lixuming 1493311067@qq.com
 * @LastEditTime: 2026-09-18 11:43:16
 * @Description:
 * @FilePath: \openLayer-study\src\hooks\useGisMap.ts
 */
import { Map as OlMap, View } from "ol";
import { message } from "ant-design-vue";
import { createLayerPair } from "@/utils";
import { useLayerStore } from "@/stores";
import { ref } from "vue";
import type { LayerPair } from "@/types/layer";
import type { EventsKey } from "ol/events";
import { unByKey } from "ol/Observable";
import type { MapBrowserEvent } from "ol";

type OlMapEventType = string;
type EventKeyList = EventsKey | EventsKey[];

type MapEventName = OlMapEventType;
type MapEventByType<T extends MapEventName> =
  T extends "click" | "dblclick" | "pointermove" | "pointerdrag"
    ? MapBrowserEvent<PointerEvent>
    : MapBrowserEvent<PointerEvent>;

const layerStore = useLayerStore();

// 保存所有事件监听key，销毁自动解绑：同一事件类型只保留一个 listener
const eventKeys = ref<globalThis.Map<OlMapEventType, EventKeyList>>(
  new globalThis.Map(),
);

interface GisMapUtilsType {
  init: (
    dom: HTMLDivElement,
    options?: { center?: [number, number]; zoom?: number },
  ) => void;
  destroy: () => void;
  changeBaseLayer: (layerId: number) => void;
  removeAllLayers: () => void;
  removeLayerById: (layerId: number) => void;
  addEventListener: <T extends MapEventName>(
    type: T,
    listener: (evt: MapEventByType<T>) => void,
  ) => EventKeyList | undefined;
  removeEventListener: (eventKey: OlMapEventType | EventKeyList) => void;
}

let mapInstance: OlMap | null = null;

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
    mapInstance = new OlMap({
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

  addEventListener<T extends MapEventName>(
    type: T,
    handler: (evt: MapEventByType<T>) => void,
  ) {
    if (!mapInstance) {
      console.warn(`地图实例未初始化，无法绑定事件: ${type}`);
      return;
    }

    const existingKey = eventKeys.value.get(type);
    if (existingKey) {
      const keys = Array.isArray(existingKey) ? existingKey : [existingKey];
      keys.forEach((key: any) => unByKey(key as any));
      eventKeys.value.delete(type);
    }

    const key = mapInstance.on(type as any, handler as any) as EventKeyList;
    if (key) {
      eventKeys.value.set(type, key as any);
    }
    return key;
  },

  removeEventListener(eventKey: OlMapEventType | EventKeyList) {
    if (!mapInstance) {
      message.error("地图未初始化，请先初始化地图！");
      return;
    }

    if (typeof eventKey === "string") {
      const key = eventKeys.value.get(eventKey);
      const keys = Array.isArray(key) ? key : key ? [key] : [];
      keys.forEach((item: any) => unByKey(item as any));
      eventKeys.value.delete(eventKey);
      return;
    }

    const targetKeys = Array.isArray(eventKey) ? eventKey : [eventKey];
    targetKeys.forEach((key: any) => {
      const currentEntry = [...eventKeys.value.entries()].find(([, value]) => {
        const values = Array.isArray(value) ? value : [value];
        return values.includes(key as any);
      });

      if (currentEntry) {
        eventKeys.value.delete(currentEntry[0]);
      }
      unByKey(key as any);
    });
  },

  destroy() {
    if (mapInstance) {
      eventKeys.value.forEach((key) => {
        const keys = Array.isArray(key) ? key : [key];
        keys.forEach((item: any) => unByKey(item as any));
      });
      eventKeys.value.clear();
      mapInstance.setTarget(undefined);
      mapInstance.dispose();
      mapInstance = null;
    }
  },
};

export const gismap = { utils };
