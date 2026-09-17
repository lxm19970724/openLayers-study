/*
 * @Author: lixuming
 * @Date: 2026-09-16 14:47:34
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-09-17 15:20:56
 * @Description:
 * @FilePath: \openLayer-study\src\hooks\useGisMap.ts
 */
interface GisMapUtilsType {
  init: (
    dom: HTMLDivElement,
    options?: { center?: [number, number]; zoom?: number },
  ) => void;
}

//工具函数
const utils: GisMapUtilsType = {
  init(
    dom: HTMLDivElement,
    options?: { center?: [number, number]; zoom?: number },
  ) {
    // 初始化地图
    const map = new Map({
      target: dom,
      view: new View({
        center: options?.center || [106.03985, 35.208137],
        projection: "EPSG:4326",
        zoom: options?.zoom || 14,
      }),
    });
  },
};
