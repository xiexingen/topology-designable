/**
 * 边框类型
 */
export enum BorderStyle {
  /**
   * 实现
   */
  solid = "solid",
  /**
   * 虚线
   */
  dashed = "dashed",
  /**
   * 无边框
   */
  none = "none",
}
/**
 * 背景颜色
 */
export enum BorderColor {
  /**
   * 透明
   */
  transparent = "transparent",
  /**
   * 白色
   */
  white = "white",
  /**
   * 红色
   */
  red = "red",
  /**
   * 白色
   */
  normal = "var(--topology-editor-border-color)",
}

/**
 * 背景颜色
 */
export enum Background {
  /**
   * 透明
   */
  transparent = "transparent",
  /**
   * 白色
   */
  white = "white",
  /**
   * 主题色
   */
  normal = "var(--topology-editor-background-normal)",
}

export enum Color {
  /**
   * 透明
   */
  transparent = "transparent",
  /**
   * 白色
   */
  white = "white",
  /**
   * 红色
   */
  red = "red",
  /**
   * 主题色
   */
  normal = "var(--topology-editor-normal-color)",
}

/**
 * 文本类型
 */
export enum TextType {
  /**
   * 普通
   */
  normal = "normal",
  /**
   * 标题
   */
  title = "title",
}

/**
 * 文本水平对齐方式
 */
export enum TextAlignType {
  /**
   * 水平居中
   */
  center = "center",
  /**
   * 水平居左
   */
  left = "left",
  /**
   * 水平居右
   */
  right = "right",
}

/**
 * 文本布局
 */
export enum TextLayout {
  /**
   * 水平方向
   */
  horizontal = "horizontal",
  /**
   * 垂直方向
   */
  vertical = "vertical",
}
