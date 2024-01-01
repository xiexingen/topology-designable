import { LINE_MARKER_OPTIONS,EDGE_ROUTER_ENUM } from './index'

const BACKGROUND_OPTIONS = [
  { label: "白色", value: "white" },
  { label: "主题色", value: "var(--topology-editor-background-normal)" },
  { label: "透明色", value: "transparent" },
];

const COLOR_OPTIONS = [
  { label: "白色", value: "white" },
  { label: "红色", value: "red" },
  { label: "主题色", value: "var(--topology-editor-normal-color)" },
  { label: "透明色", value: "transparent" },
];

const BORDER_STYLE_OPTIONS = [
  { label: "实线", value: "solid" },
  { label: "虚线", value: "dashed" },
  { label: "无", value: "none" },
];

const colorSchema = {
  title: "颜色",
  type: "string",
  "x-decorator": "FormItem",
  "x-component": "Select",
  enum: COLOR_OPTIONS,
};

const iconSchema = {
  title: "图标",
  type: "string",
  "x-decorator": "FormItem",
  "x-component": "IconSelect",
  "x-component-props": {
    dataSource: '{{deviceIcons}}'
  }
  // 'x-reactions': ['{{useAsyncDataSource(loadDeviceIcons)}}'],
}

const borderColorSchema = {
  title: '边框颜色',
  type: 'string',
  'x-decorator': 'FormItem',
  'x-component': 'Select',
  'x-component-props':{
    placeholder:'--请选择--',
    allowClear: true,
  },
  enum: COLOR_OPTIONS,
};

const borderStyleSchema = {
  title: "风格",
  type: "string",
  "x-decorator": "FormItem",
  "x-component": "Select",
  enum: BORDER_STYLE_OPTIONS,
};

const backgroundSchema = {
  title: "背景颜色",
  type: "string",
  "x-decorator": "FormItem",
  "x-component": "Select",
  enum: BACKGROUND_OPTIONS,
};

const opacitySchema = {
  title: '透明度',
  type: 'number',
  'x-decorator': 'FormItem',
  'x-component': 'InputNumber',
  'x-decorator-props': {
    tooltip: '0-100之间，0:完全透明 100: 完全不透明;默认为 100',
  },
  'x-validator': [
    { min: 0, message: '值不能小于0' },
    { max: 100, message: '值不能大于100' },
  ],
};

const circleSchema = {
  type: "object",
  // layout: {
  //   type: 'void',
  //   'x-component': "FormLayout",
  //   'x-component-props': {
  //     labelWidth: 106,
  //     wrapperWidth: 416
  //   },
  // },
  properties: {
    borderStyle: borderStyleSchema,
    background: backgroundSchema,
  },
};

const rectSchema = {
  type: "object",
  properties: {
    borderStyle: borderStyleSchema,
    background: backgroundSchema,
  },
};

const labelSchema = {
  type: "object",
  properties: {
    label: {
      title: "文本内容",
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    type: {
      title: "文本类型",
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Select",
      enum: [
        { label: "普通文本", value: "normal" },
        { label: "标题", value: "title" },
      ],
    },
    color: colorSchema,
    textAlign: {
      title: "文本对齐",
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Select",
      enum: [
        { label: "水平居中", value: "center" },
        { label: "水平居左", value: "left" },
        { label: "水平居右", value: "right" },
      ],
    },
    layout: {
      title: "文本方向",
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Select",
      enum: [
        { label: "横向", value: "horizontal" },
        { label: "纵向", value: "vertical" },
      ],
    },
    opacity: opacitySchema,
  },
};

const fullShowSchema ={
  title: "文字全量展示",
  type: "boolean",
  "x-decorator": "FormItem",
  "x-decorator-props":{
    tooltip: '默认只展示一行，超出会展示...',
  },
  "x-component": "Checkbox",
}

const lineSchema = {
  type: 'object',
  properties: {
    strokeWidth: {
      title: '线条粗细',
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-validator': [
        { min: 0 },
      ],
    },
    stroke: borderColorSchema,
    strokeDasharray:{
      title: '虚线间距',
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-validator': [
        { min: 0 },
      ],
    },
    opacity: opacitySchema,
  },
};

const deviceSchema = {
  type: "object",
  properties: {
    label: {
      title: "设备名称",
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    icon: iconSchema,
    borderColor: borderColorSchema,
    background: backgroundSchema,
    borderStyle: borderStyleSchema,
    full: fullShowSchema,
  },
};

const downlinkSchema = {
  type: "object",
  properties: {
    label: {
      title: "名称",
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    borderColor: borderColorSchema,
    background: backgroundSchema,
    borderStyle: borderStyleSchema,
    full: fullShowSchema,
  },
};

const edgeSchema = {
  type: "object",
  properties: {
    attrs: {
      type: "object",
      properties: {
        line: {
          type: "object",
          properties: {
            // stroke: {
            //   title: '颜色',
            //   type: 'string',
            //   'x-decorator': 'FormItem',
            //   'x-component': 'ColorPicker',
            // },
            // strokeWidth: {
            //   title: '线宽',
            //   type: 'number',
            //   'x-decorator': 'FormItem',
            //   'x-component': 'InputNumber',
            // },
            strokeDasharray: {
              title: "类型",
              type: "number",
              "x-decorator": "FormItem",
              "x-component": "Select",
              'x-component-props':{
                placeholder:'--请选择--',
                allowClear: true,
              },
              enum: [
                { label: "虚线", value: "3" },
                { label: "实线", value: "" },
              ],
            },
            sourceMarker: {
              title: "起始箭头",
              enum: LINE_MARKER_OPTIONS,
              "x-decorator": "FormItem",
              "x-component": "Select",
              'x-component-props':{
                placeholder:'--请选择--',
                // allowClear: true,
              },
            },
            targetMarker: {
              title: "结束箭头",
              enum: LINE_MARKER_OPTIONS,
              "x-decorator": "FormItem",
              "x-component": "Select",
              'x-component-props':{
                placeholder:'--请选择--',
                // allowClear: true,
              },
            },
          },
        },
      },
    },
    router: {
      title: '连线类型',
      enum: EDGE_ROUTER_ENUM,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props':{
        placeholder:'--请选择--',
        allowClear: true,
      },
    },
    // connector: {
    //   title: '连接器',
    //   enum: EDGE_CONNECTOR_ENUM,
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Select',
    //   'x-component-props':{
    //     placeholder:'--请选择--',
    //     allowClear: true,
    //   },
    // }
  },
};

export default {
  "topology-circle": circleSchema,
  "topology-rect": rectSchema,
  "topology-label": labelSchema,
  'topology-line': lineSchema,
  "topology-device": deviceSchema,
  "topology-downlink": downlinkSchema,
  // 'topology-lightning': lightningSchema,
  edge: edgeSchema,
};
