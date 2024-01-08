/**
 * description: 可以自行配置 `embeddable` 属性来控制哪些类型的节点可以当做容器组件接受其他组件的嵌入
 */
import { useSetState } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import { Editor, defaultPropsSchema } from 'topology-designable';
import iconMap, { ICON_NAMES } from '../../_assets/icon-map';

export default () => {
  const editorRef = useRef();
  const [state, setState] = useSetState({
    size: {
      height: 666,
      width: 1888,
    },
    materials: [
      {
        name: 'device',
        label: '',
        items: [
          {
            id: 'database-audit',
            component: 'topology-device',
            embeddable: true,
            size: {
              height: 74,
              width: 74,
            },
            componentProps: {
              borderStyle: 'solid',
              label: '允许相互嵌套',
              icon: ICON_NAMES.databaseAudit,
              background: 'white',
            },
          },
          {
            id: 'circle',
            label: '圆形',
            component: 'topology-circle',
            embeddable: true,
            componentProps: {
              borderStyle: 'solid',
              background: 'var(--topology-editor-background-normal)',
            },
            size: {
              height: 74,
              width: 74,
            },
          },
          {
            id: 'rect-dashed-normal',
            label: '正方形',
            component: 'topology-rect',
            embeddable: true,
            componentProps: {
              borderStyle: 'dashed',
              background: 'var(--topology-editor-background-normal)',
            },
            size: {
              height: 74,
              width: 74,
            },
          },
        ],
      },
    ],
    value: undefined,
  });

  // 模拟加载后端接口数据
  useEffect(() => {
    const dashboardData = require('../../_assets/data/embed.json');
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
