/**
 * description: 可以直接在设计器中 导入/导出 资源
 */
import { useSetState } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import type { Topology } from 'topology-designable';
import { Editor, defaultPropsSchema } from 'topology-designable';
import iconMap from '../../_assets/icon-map';
import { dashboard as dashboardMaterials } from '../../_assets/materials';

function downloadJson(json: string) {
  const a = document.createElement('a');
  a.download = 'topology.json';
  a.rel = 'noopener';
  const url = URL.createObjectURL(new Blob(json.split('')));
  a.href = url;
  a.click();
}
function downloadImage(base64Image: string) {
  const link = document.createElement('a');
  link.download = 'topology.png';
  link.href = base64Image;
  link.click();
}

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

  const handleExport = async (type: 'json' | 'image') => {
    const editorInstance = editorRef.current as unknown as Editor;
    if (type === 'json') {
      const jsonData = await editorInstance.getJsonData();
      // const imageBase64 = await editorInstance.getImageData();
      if (!jsonData.cells?.length) {
        throw Error('[topology] 资源为空');
      }
      const exportJSON = {
        id: new Date().getTime(),
        size: {
          height: state.size.height,
          width: state.size.width,
        },
        version: '1.0',
        graph: jsonData,
        // thumb: imageBase64,
      };
      downloadJson(JSON.stringify(exportJSON));
    } else if (type === 'image') {
      const imageBase64 = await editorInstance.getImageData();
      downloadImage(imageBase64);
    }
  };

  const handleImport = async (data: Topology.Graph) => {
    if (!data?.graph) {
      throw Error('[graph] 导入的数据格式有误');
    }
    const editorInstance = editorRef.current as unknown as Editor;
    editorInstance.getInstance()?.fromJSON(data.graph, { silent: false });
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
      toolbar={{ export: true, import: true }}
      onExport={handleExport}
      onImport={handleImport}
    />
  );
};
