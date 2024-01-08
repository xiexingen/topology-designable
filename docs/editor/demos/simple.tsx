import { useSetState } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import { Editor, defaultPropsSchema } from 'topology-designable';
import iconMap from '../../_assets/icon-map';
import { dashboard as dashboardMaterials } from '../../_assets/materials';

export default () => {
  const editorRef = useRef();
  const [state, setState] = useSetState({
    size: {
      height: 666,
      width: 1888,
    },
    materials: dashboardMaterials,
    value: undefined,
  });

  const handleChange = (value: any) => {
    // eslint-disable-next-line no-console
    console.log('editor change', value);
  };

  // 模拟加载后端接口数据
  useEffect(() => {
    const dashboardData = require('../../_assets/data/dashboard.json');
    setState({
      value: dashboardData['graph'],
    });
  }, []);

  return (
    <Editor
      ref={editorRef as any}
      style={{ height: 800 }}
      materials={state.materials}
      value={state.value}
      iconMap={iconMap}
      // propsPanelComponents={{}}
      propsPanelSchemaMap={defaultPropsSchema}
      size={state.size}
      onChange={handleChange}
    />
  );
};
