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

### 自定义属性组件

<code src="./demos/custom-props.tsx" ></code>

### 容器组件配置

<code src="./demos/embed.tsx"></code>

### 预览图&缩略图

<code src="./demos/thumb.tsx"></code>

### 导入导出

<code src="./demos/import-export.tsx"></code>

### 工具栏配置

<code src="./demos/toolbar.tsx"></code>

### 自定义片段

<code src="./demos/snippet.tsx"></code>

### 片段设计器

<code src="./demos/snippet-designer.tsx"></code>

## API

| 参数                 | 说明                                                    | 类型                                             | 默认值                   |
| -------------------- | ------------------------------------------------------- | ------------------------------------------------ | ------------------------ |
| iconMap              | 图标映射配置                                            | `Record<string, Topology.TopologyIconProp`       | `{}`                     |
| materials            | 物料面板配置,详情请查看                                 | `Topology.Materials`                             | -                        |
| materialFilterable   | 物料面板是否可搜索                                      | `boolean`                                        | `false`                  |
| value                | 实际值                                                  | `Object`                                         | -                        |
| propsPanelSchemaMap  | 属性面板动态表单配置，请查看 formily 的 schema 配置     | `Object`                                         | -                        |
| propsPanelComponents | 属性面板动态组件配置，请查看 formily 的 components 配置 | `Object`                                         | -                        |
| size                 | 画布尺寸                                                | `SizeOption`                                     | {height: 666,width:1888} |
| toolbar              | 顶部工具栏配置                                          | `false` \| `true` \| `ToolbarOption` \| `Object` | true                     |
| onImport             | 导入方法                                                | `Function`                                       | -                        |
| onExport             | 导出方法                                                | `Function`                                       | -                        |
| onChange             | 画板内容改变时触发的方法                                | `Function`                                       | -                        |

### SizeOption

| 参数   | 说明 | 类型   | 默认值 |
| ------ | ---- | ------ | ------ |
| height | 高度 | number | 666    |
| width  | 宽度 | number | 1888   |

### ToolbarOption

| 参数            | 说明     | 类型      | 默认值  |
| --------------- | -------- | --------- | ------- |
| zoom            | 缩放     | `Boolean` | `true`  |
| undo            | 缩放     | `Boolean` | `true`  |
| redo            | 重做     | `Boolean` | `true`  |
| cut             | 剪切     | `Boolean` | `true`  |
| copy            | 复制     | `Boolean` | `true`  |
| paste           | 粘贴     | `Boolean` | `true`  |
| delete          | 删除     | `Boolean` | `true`  |
| setTop          | 置顶     | `Boolean` | `true`  |
| setBottom       | 置底     | `Boolean` | `true`  |
| horizontalAlign | 水平对齐 | `Boolean` | `true`  |
| verticalAlign   | 垂直对齐 | `Boolean` | `true`  |
| contentSplit    | 内容均分 | `Boolean` | `true`  |
| import          | 导入     | `Boolean` | `false` |
| export          | 导出     | `Boolean` | `false` |
| preview         | 预览     | `Boolean` | `true`  |

## Method

| 参数         | 说明                                                                                           | 类型                                                      | 默认值 |
| ------------ | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------ |
| getThumbData | 获取缩略图                                                                                     | `(width:number,heigth:number)=>Promise<string>`           | -      |
| getImageData | 获取预览图(会按照编辑器的尺寸 1:1 生成静态图片), htmlToImageOption 支持 `html-to-image` 的参数 | `(htmlToImageOption:Record<string,any>)=>Promise<string>` | -      |
| getJsonData  | 获取设计器的设计资源,不会包含                                                                  | `()=>Promise<Object>`                                     | -      |
| getInstance  | 获取 Graph 实例                                                                                | `()=>Graph`                                               | -      |

## Event

| 参数     | 说明                                                   | 类型          | 默认值 |
| -------- | ------------------------------------------------------ | ------------- | ------ |
| onChange | 拓扑图中任意变动时触发(节点增删改、移动、属性设置....) | `(arg)=>void` | -      |
