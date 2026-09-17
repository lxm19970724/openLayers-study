import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { get as getProjection } from "ol/proj";
import { getWidth } from "ol/extent";
import TileLayer from "ol/layer/Tile";
import type { LayerPair, BaseMapItem } from "@/types/layer";

// 天地图TK密钥，建议放到环境变量
const TIANDITU_TK =
  import.meta.env.VITE_TIANDITU_TK || "33804c3edc4121ec1e1841ce594ad7d8";

/**
 * 创建单个天地图WMTS Source
 * @param url wmts地址
 */
export function createWmtsSource(url: string): WMTS {
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
export function createLayerPair(cfg: BaseMapItem): LayerPair {
  const baseSource = createWmtsSource(cfg.url);
  const labelSource = createWmtsSource(cfg.bzUrl);
  return {
    baseLayer: new TileLayer({ source: baseSource }),
    labelLayer: new TileLayer({ source: labelSource }),
  };
}
