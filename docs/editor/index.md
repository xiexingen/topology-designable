---
title: Editor - 设计器
nav:
  title: Editor
  order: -1
---

# Editor - 设计器

拓扑图设计器

## 案例

### 简单案例

<code src="./demos/simple.tsx"></code>

### 自定义属性

<!-- <code src="../src/Preview/demos/custom-props.tsx"></code> -->

### 片段设计器

<!-- <code src="../src/Preview/demos/snippet.tsx"></code> -->

## API

| 参数                 | 说明                                                    | 类型                                       | 默认值                   |
| -------------------- | ------------------------------------------------------- | ------------------------------------------ | ------------------------ |
| iconMap              | 图标映射配置                                            | `Record<string, Topology.TopologyIconProp` | `{}`                     |
| materials            | 物料面板配置,详情请查看                                 | `Topology.Materials`                       | -                        |
| materialFilterable   | 物料面板是否可搜索                                      | `boolean`                                  | `false`                  |
| value                | 实际值                                                  | `Object`                                   | -                        |
| propsPanelSchemaMap  | 属性面板动态表单配置，请查看 formily 的 schema 配置     | `Object`                                   | -                        |
| propsPanelComponents | 属性面板动态组件配置，请查看 formily 的 components 配置 | `Object`                                   | -                        |
| size                 | 画布尺寸                                                | SizeOption                                 | {height: 666,width:1888} |
| toolbar              | 顶部工具栏配置                                          | `false`                                    | `Object`                 |
| onImport             | 导入方法                                                | `Function`                                 | -                        |
| onExport             | 导出方法                                                | `Function`                                 | -                        |
| onChange             | 画板内容改变时触发的方法                                | `Function`                                 | -                        |

### SizeOption

| 参数   | 说明 | 类型   | 默认值 |
| ------ | ---- | ------ | ------ |
| height | 高度 | number | 666    |
| width  | 宽度 | number | 1888   |
