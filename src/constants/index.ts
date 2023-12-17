/**
 * 连线箭头样式枚举
 */
export const LINE_MARKER_OPTIONS = [
  {
    label: "无",
    value: null,
  },
  {
    label: "空心圆",
    value: "circleHollow",
  },
  {
    label: "实心圆形",
    value: "circle",
  },
  {
    label: "瞄准点",
    value: "circlePlus",
  },
  {
    label: "普通三角形",
    value: "block",
  },
  {
    label: "尖三角形",
    value: "classic",
  },
  {
    label: "菱形",
    value: "diamond",
  },
  {
    label: "交叉",
    value: "cross",
  },
  {
    label: "斜边",
    value: "async",
  },
];

/**
 * 画布缩放最大最小值
 */
export const GRAPH_ZOOM = {
  min: 0.25,
  max: 4,
};

/**
 * 连线路由枚举
 */
export const EDGE_ROUTER_ENUM = [
  { label: "直线", value: "normal" },
  { label: "orth", value: "orth" },
  { label: "oneSide", value: "oneSide" },
  { label: "manhattan", value: "manhattan" },
  { label: "metro", value: "metro" },
];

/**
 * 连线连接器枚举
 */
export const EDGE_CONNECTOR_ENUM = [
  { label: "无", value: "normal" },
  { label: "圆角", value: "rounded" },
  { label: "平滑", value: "smooth" },
  { label: "跳线", value: "jumpover" },
];

/**
 * 文字对齐方式枚举
 */
export const TEXT_ANCHOR = {
  START: "start",
  MIDDLE: "middle",
  END: "end",
};

/**
 * 文字对齐方式数据源
 */
export const TEXT_ANCHOR_OPTIONS = [
  {
    label: "内容居左对齐",
    value: TEXT_ANCHOR.START,
  },
  {
    label: "内容居中对齐",
    value: TEXT_ANCHOR.MIDDLE,
  },
  {
    label: "内容居右对齐",
    value: TEXT_ANCHOR.END,
  },
];

/**
 * 缩放比例枚举
 */
export const ZOOM_OPTIONS = [
  { label: "25%", value: 0.25 },
  { label: "50%", value: 0.5 },
  { label: "75%", value: 0.75 },
  { label: "100%", value: 1 },
  { label: "125%", value: 1.25 },
  { label: "150%", value: 1.5 },
  { label: "175%", value: 1.75 },
  { label: "200%", value: 2 },
  { label: "225%", value: 2.25 },
  { label: "250%", value: 2.5 },
  { label: "275%", value: 2.75 },
  { label: "300%", value: 3 },
];

/**
 * 图片平铺枚举
 */
export const IMAGE_REPEAT_ENUM = [
  { label: "不平铺", value: "no-repeat" },
  { label: "水印效果", value: "watermark" },
  { label: "水平翻转", value: "flip-x" },
  { label: "垂直翻转", value: "flip-y" },
  { label: "水平垂直翻转", value: "flip-xy" },
];

/**
 * 事件定义
 */
export const EVENT_MAP = {
  /**
   * 节点添加
   */
  NODE_ADDED: "NODE_ADDED",
  /**
   * 节点选中事件
   */
  NODE_SELECTED: "NODE_SELECTED",
  /**
   * 边选中事件
   */
  EDGE_SELECTED: "EDGE_SELECTED",
  /**
   * 节点删除
   */
  CELL_REMOVE: "CELL_REMOVE",
  /**
   * 工具栏禁用状态更改
   */
  TOOLBAR_STATE_CHANGE: "TOOLBAR_STATE_CHANGE",
  /**
   * 画布缩放更改
   */
  ZOOM_CHANGE: "ZOOM_CHANGE",
  /**
   * 节点偏移或者变形状态
   */
  NODE_TRANSFORM_CHANGE: "NODE_TRANSFORM_CHANGE",
  /**
   * 导出(json/image)
   */
  ON_EXPORT: "ON_EXPORT",
  /**
   * 预览
   */
  PREVIEW: "PREVIEW",
  /**
   * 导入
   */
  ON_IMPORT: "ON_IMPORT",
  /**
   * 画布内容变动
   */
  ON_CHANGE: "ON_CHANGE",
};

/**
 * 链接桩默认偏移量
 */
export const PORTS_OFFSET = 3;

/**
 * 拓扑图片段
 */
export const TOPOLOGY_SNIPPET = "topology-snippet";
