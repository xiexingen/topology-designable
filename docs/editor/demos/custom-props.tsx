import { action } from '@formily/reactive';
import { useSetState } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import type { Topology } from 'topology-designable';
import { Editor, defaultPropsSchema } from 'topology-designable';
import iconMap from '../../_assets/icon-map';
import { dashboard as dashboardMaterials } from '../../_assets/materials';
import { getDevices } from '../../_assets/mock';

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

function fetchDevices(field) {
  field.loading = true;
  getDevices().then(
    action?.bound?.((data) => {
      field.dataSource = data;
      field.loading = false;
    }),
  );
}

const customPropsPanelSchemaMap = {
  ...defaultPropsSchema,
  // 我们对 topology-device 进行自定义，在默认的基础上增加一个设备绑定属性设置
  'topology-device': {
    type: 'object',
    properties: {
      ...defaultPropsSchema['topology-device'].properties,
      // 自定义增加的设备属性
      device: {
        title: '设备绑定',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          placeholder: '-- 请选择设备--',
          showSearch: true,
          filterOption: (
            input: string,
            option?: { label: string; value: string },
          ) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
          allowClear: true,
        },
        // enum:[ { label:'设备1', value:'sb1' } ]，如果是静态数据可以直接写
        // 由于我们的数据是从服务端获取的，我们按照 Formily 的写法来
        'x-reactions': '{{fetchDevices}}',
      },
    },
  },
};

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
    const editorInstance = editorRef.current as Editor;
    if (type === 'json') {
      const jsonData = await editorInstance.getJsonData();
      const imageBase64 = await editorInstance.getImageData();
      if (!jsonData.cells?.length) {
        throw Error('[topology] 资源为空');
      }
      const exportJSON = {
        id: '111',
        type: 1,
        size: {
          height: state.size.height,
          width: state.size.width,
        },
        version: '1.0',
        description: '',
        thumb: imageBase64,
        graph: jsonData,
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

  const handleChange = (value: any) => {
    // eslint-disable-next-line no-console
    console.log('editor change', value);
  };

  // 模拟加载后端接口数据
  useEffect(() => {
    const dashboardData = require('../../_assets/dashboard.json');
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
      propsPanelSchemaMap={customPropsPanelSchemaMap}
      propsPanelScope={{
        fetchDevices,
      }}
      size={state.size}
      toolbar={{ export: true, import: true }}
      onExport={handleExport}
      onImport={handleImport}
      onChange={handleChange}
    />
  );
};
