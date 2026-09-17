
// 图层配置类型
export interface BaseMapItem {
  name: string;
  url: string;
  bzUrl: string;
}

// 图层组：底图 + 标注图层一对
export interface LayerPair {
  baseLayer: any;
  labelLayer: any;
}
