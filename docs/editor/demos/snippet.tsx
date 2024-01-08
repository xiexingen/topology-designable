/**
 * description: 有时候我们为了为用户提供更便捷的操作，会聚合某些功能(也叫片段)
 */
import { useSetState } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import { Editor, defaultPropsSchema } from 'topology-designable';
import iconMap from '../../_assets/icon-map';
import { dashboard as dashboardMaterials } from '../../_assets/materials';
import customSnippet from '../../_assets/snippets/custom';

export default () => {
  const editorRef = useRef();
  const [state, setState] = useSetState({
    size: {
      height: 666,
      width: 1888,
    },
    materials: [
      {
        name: 'snippet',
        label: '自定义片段',
        items: [customSnippet],
      },
      ...dashboardMaterials,
    ],
    value: undefined,
  });

  // 模拟加载后端接口数据
  useEffect(() => {
    const dashboardData = require('../../_assets/data/snippet.json');
    setState({
      value: dashboardData['graph'],
    });
  }, []);

  return (
    <>
      <Editor
        ref={editorRef as any}
        style={{ height: 666 }}
        materials={state.materials}
        value={state.value}
        iconMap={iconMap}
        // propsPanelComponents={{}}
        propsPanelSchemaMap={defaultPropsSchema}
        size={state.size}
      />
    </>
  );
};
