/**
 * description: 可以配置展示/隐藏某些工具栏
 */
import { useSetState } from 'ahooks';
import React, { useRef } from 'react';
import { Editor, defaultPropsSchema } from 'topology-designable';
import iconMap from '../../_assets/icon-map';
import { dashboard as dashboardMaterials } from '../../_assets/materials';

// 可以为 true | false 或者下面的配置项
const toolbarOption = {
  zoom: true, // 缩放
  undo: true, // 撤回
  redo: true, // 重做
  cut: true, // 剪切
  copy: true, // 复制
  paste: true, // 粘贴
  delete: true, // 删除
  setTop: true, // 置顶
  setBottom: true, // 置底
  horizontalAlign: true, // 水平对齐
  verticalAlign: true, // 垂直对齐
  contentSplit: true, // 内容均分
  import: true, // 导入
  export: true, // 导出
  preview: true, // 预览
};

export default () => {
  const editorRef = useRef();
  const [state] = useSetState({
    size: {
      height: 666,
      width: 1888,
    },
    materials: dashboardMaterials,
    value: undefined,
  });

  return (
    <Editor
      ref={editorRef as any}
      style={{ height: 800 }}
      materials={state.materials}
      value={state.value}
      iconMap={iconMap}
      propsPanelSchemaMap={defaultPropsSchema}
      size={state.size}
      toolbar={toolbarOption}
    />
  );
};
