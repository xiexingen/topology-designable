export const TOOLBAR_ENUM = {
  zoom:'zoom',
  zoomIn:'zoomIn',
  zoomOut:'zoomOut',
  undo:'undo',
  redo:'redo',
  cut:'cut',
  copy:'copy',
  paste:'paste',
  delete:'delete',
  drawCenter:'drawCenter',
  setTop:'setTop',
  setBottom:'setBottom',
  horizontalAlign:'horizontalAlign',
  horizontalLeft:'horizontalLeft',
  horizontalCenter:'horizontalCenter',
  horizontalRight:'horizontalRight',
  verticalAlign:'verticalAlign',
  verticalTop:'verticalTop',
  verticalCenter:'verticalCenter',
  verticalBottom:'verticalBottom',
  contentSplit:'contentSplit',
  horizontalSplit:'horizontalSplit',
  verticalSplit:'verticalSplit',
  import:'import',
  export:'export',
  exportJson:'exportJson',
  exportImage:'exportImage',
  preview:'preview',
  help: "help",
};


/**
 * 工具栏展示项
 */
export const TOOLBAR_OPTIONS = [
  [
    {
      key: TOOLBAR_ENUM.zoom,
      visible: true,
      label: "缩放",
      icon: "",
    },
  ],
  [
    {
      key: TOOLBAR_ENUM.undo,
      visible: true,
      label: "撤回(ctrl+z)",
      icon: "undo",
    },
    {
      key: TOOLBAR_ENUM.redo,
      visible: true,
      label: "恢复(ctrl+y)",
      icon: "redo",
    },
  ],
  [
    {
      key: TOOLBAR_ENUM.copy,
      visible: true,
      label: "复制(ctrl+c)",
      icon: "copy",
    },
    {
      key: TOOLBAR_ENUM.cut,
      visible: true,
      label: "剪切(ctrl+x)",
      icon: "cut",
    },
    {
      key: TOOLBAR_ENUM.paste,
      visible: true,
      label: "粘贴(ctrl+v)",
      icon: "paste",
    },
    {
      key: TOOLBAR_ENUM.delete,
      visible: true,
      label: "删除",
      icon: "delete",
    },
    {
      key: TOOLBAR_ENUM.setTop,
      visible: true,
      label: "置顶(ctrl+t)",
      icon: "setTop",
    },
    {
      key: TOOLBAR_ENUM.setBottom,
      visible: true,
      label: "置底(ctrl+b)",
      icon: "setBottom",
    },
  ],
  [
    {
      key: TOOLBAR_ENUM.horizontalAlign,
      visible: true,
      label: "横向对齐",
      icon: "horizontalAlign",
      options: [
        {
          key: "horizontalLeft",
          visible: true,
          label: "左对齐",
        },
        {
          key: "horizontalCenter",
          visible: true,
          label: "居中",
        },
        {
          key: "horizontalRight",
          visible: true,
          label: "右对齐",
        },
      ],
    },
    {
      key: TOOLBAR_ENUM.verticalAlign,
      visible: true,
      label: "纵向对齐",
      icon: "verticalAlign",
      options: [
        {
          key: "verticalTop",
          visible: true,
          label: "顶部对齐",
        },
        {
          key: "verticalCenter",
          visible: true,
          label: "居中",
        },
        {
          key: "verticalBottom",
          visible: true,
          label: "底部对齐",
        },
      ],
    },
    {
      key: TOOLBAR_ENUM.contentSplit,
      visible: true,
      label: "内容分布",
      icon: "split",
      options: [
        {
          key: "horizontalSplit",
          visible: true,
          label: "横向均分",
        },
        {
          key: "verticalSplit",
          visible: true,
          label: "纵向均分",
        },
      ],
    },
  ],
  [
    {
      key: TOOLBAR_ENUM.import,
      visible: false,
      label: "导入",
      icon: "import",
    },
    {
      key: TOOLBAR_ENUM.export,
      visible: false,
      label: "导出",
      icon: "export",
      options: [
        {
          key: "exportJson",
          visible: true,
          label: "导出拓扑图",
        },
        {
          key: "exportImage",
          visible: true,
          label: "导出图片",
        },
      ],
    },
    {
      key: TOOLBAR_ENUM.preview,
      visible: true,
      label: "预览",
      icon: "preview",
    },
  ],
];
