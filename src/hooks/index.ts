import { ref, watch, onUnmounted, type Ref } from "vue";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { get as getProjection } from "ol/proj";
import { getWidth } from "ol/extent";

// 图层配置类型
export interface BaseMapItem {
  name: string;
  url: string;
  bzUrl: string;
}

// 图层组：底图 + 标注图层一对
interface LayerPair {
  baseLayer: TileLayer<WMTS>;
  labelLayer: TileLayer<WMTS>;
}

// 天地图TK密钥，建议放到环境变量
const TIANDITU_TK = import.meta.env.VITE_TIANDITU_TK || "33804c3edc4121ec1e1841ce594ad7d8";

/**
 * 创建单个天地图WMTS Source
 * @param url wmts地址
 */
function createWmtsSource(url: string): WMTS {
  const projection = getProjection("EPSG:3857")!;
  const projectionExtent = projection.getExtent();
  const size = getWidth(projectionExtent) / 256;
  const resolutions = new Array(18);
  const matrixIds = new Array(18);
  for (let z = 0; z < 18; z++) {
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z;
  }

  // 自动匹配layer名称
  let layerName = "";
  if (url.includes("vec_w")) layerName = "vec";
  if (url.includes("cva_w")) layerName = "cva";
  if (url.includes("img_w")) layerName = "img";
  if (url.includes("cia_w")) layerName = "cia";
  if (url.includes("ter_w")) layerName = "ter";
  if (url.includes("cta_w")) layerName = "cta";

  return new WMTS({
    url: `${url}?tk=${TIANDITU_TK}`,
    layer: layerName,
    matrixSet: "w",
    format: "tiles",
    projection,
    tileGrid: new WMTSTileGrid({
      origin: [-20037508.342789244, 20037508.342789244],
      resolutions,
      matrixIds,
    }),
    style: "default",
    wrapX: true,
  });
}

/**
 * 创建一组底图+标注图层
 */
function createLayerPair(cfg: BaseMapItem): LayerPair {
  const baseSource = createWmtsSource(cfg.url);
  const labelSource = createWmtsSource(cfg.bzUrl);
  return {
    baseLayer: new TileLayer({ source: baseSource }),
    labelLayer: new TileLayer({ source: labelSource }),
  };
}

/**
 * Hook：天地图底图切换
 * @param mapInstance 地图实例 ref
 * @param baseMapList 底图配置数组
 */
export function useTiandituBaseMap(
  mapInstance: Ref<Map | null>,
  baseMapList: BaseMapItem[],
) {
  // 当前选中索引，默认0矢量底图
  const currentIndex = ref(0);
  // 保存所有图层组
  const layerGroupList = ref<LayerPair[]>([]);

  // 初始化所有图层，添加到地图，控制显隐
  function initBaseLayers() {
    const map = mapInstance.value;
    if (!map) return;
    // 批量创建图层对
    const groups = baseMapList.map((item) => createLayerPair(item));
    layerGroupList.value = groups;
    // 全部加到地图
    groups.forEach((group) => {
      map.addLayer(group.baseLayer);
      map.addLayer(group.labelLayer);
    });
    // 初始切换到第0项（矢量底图）
    switchBaseMap(0);
  }

  /**
   * 切换底图，只修改visible，不销毁图层
   * @param idx 选中索引
   */
  function switchBaseMap(idx: number) {
    if (idx < 0 || idx >= layerGroupList.value.length) return;
    currentIndex.value = idx;
    layerGroupList.value.forEach((group, i) => {
      const visible = i === idx;
      group.baseLayer.setVisible(visible);
      group.labelLayer.setVisible(visible);
    });
  }

  // 销毁：页面卸载时移除图层，防止内存泄漏
  function destroyLayers() {
    const map = mapInstance.value;
    if (!map) return;
    layerGroupList.value.forEach((group) => {
      map.removeLayer(group.baseLayer as any);
      map.removeLayer(group.labelLayer as any);
    });
    layerGroupList.value = [];
  }

  // 监听currentIndex变化，外部修改currentIndex也自动切换
  watch(currentIndex, (newVal) => {
    switchBaseMap(newVal);
  });

  // 组件卸载自动清理图层
  onUnmounted(() => {
    destroyLayers();
  });

  return {
    currentIndex,
    initBaseLayers,
    switchBaseMap,
    destroyLayers,
  };
}
