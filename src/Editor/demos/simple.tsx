import type { EditorRef } from '..';
import type { Topology } from '@/types/global';
import React, { useRef } from 'react';
import { useSetState } from 'ahooks';
import { Button, Space, message } from 'antd';
import { Editor, defaultPropsSchema } from 'topology-designable';
import { dashboard as dashboardMaterials } from '@/assets-demo/materials'
import iconMap from '../../assets-demo/icon-map';
// @ts-ignore
import dashboardData from '../../assets-demo/dashboard.json';

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
  const editorRef = useRef()
  const [messageApi] = message.useMessage();
  const [state] = useSetState({
    size: {
      height: 666,
      width: 1888,
    },
    materials: dashboardMaterials
  })

  const handleExport = async (type: 'json' | 'image') => {
    const editorInstance = editorRef.current as unknown as EditorRef;
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
        graph: jsonData
      };
      downloadJson(JSON.stringify(exportJSON));
    } else if (type === 'image') {
      const imageBase64 = await editorInstance.getImageData();
      downloadImage(imageBase64);
    }
  }
  const handleImport = async (data: Topology.Graph) => {
    if (!data?.graph) {
      throw Error('[graph] 导入的数据格式有误');
    }
    const editorInstance = editorRef.current as unknown as EditorRef;
    editorInstance.graph?.fromJSON(data.graph, { silent: false });
  }

  const  handlePrintSnippet=async () =>{
    const editorInstance = editorRef.current as unknown as EditorRef;
    const graphInstance = editorInstance.getInstance();
    if(!graphInstance){
      return;
    }
    const selectedCells = graphInstance.getSelectedCells();
    if (Array.isArray(selectedCells) && selectedCells.length !== 1) {
      messageApi.error('[graph] 仅支持选中一个导出节点');
      return;
    }
    const selectedContainer = selectedCells[0] as any;
    if (Array.isArray(selectedContainer.children) && selectedContainer.children.length > 0) {
      const containerSize = selectedContainer.getSize();
      const containerPosition = selectedContainer.getPosition();
      // 存储代码片段配置
      const snippetNodes: any[] = [
        // 根节点
        {
          id: selectedContainer.id,
          component: selectedContainer.shape,
          embeddable: true,
          componentProps: selectedContainer.getData()?.componentProps,
        }
      ];
      const snippetEdges: any[] = [];
      const snippetConfig = {
        id: '[TODO:请填充资产唯一标识，如:third-party]',
        label: '[TODO:请填充标题]',
        icon: '[TODO:请填充图标]',
        component: 'topology-snippet',
        componentProps: {
          icon: '[TODO:请填充图标]',
          children: {
            nodes: snippetNodes,
            edges: snippetEdges,
          }
        },
        size: {
          height: containerSize.height,
          width: containerSize.width,
        },
      };
      const childrenNodes = selectedContainer.getChildren();
      childrenNodes.forEach((cell: any) => {
        if (cell.isNode()) {
          const cellSize = cell.getSize();
          const cellPosition = cell.getPosition();
          const cellComponentProps = cell.getData()?.componentProps;
          const newNode = {
            id: cell.id,
            component: cell.shape,
            componentProps: {
              ...cellComponentProps,
              icon: cellComponentProps.icon ? cellComponentProps.icon.replace(/.*\/([\d|-\w]+)\.svg$/gi, '$1') : cellComponentProps.icon,
            },
            size: cellSize,
            position: {
              x: cellPosition.x - containerPosition.x,
              y: cellPosition.y - containerPosition.y,
            },
            relative: true, // 相对父容器位置
            parent: selectedContainer.id,
          };
          snippetNodes.push(newNode);
        } else if (cell.isEdge()) {
          const sourcePort = cell.getSourceCell()?.port?.ports?.find((item: any) => item.id === cell.source.port);
          const targetPort = cell.getTargetCell()?.port?.ports?.find((item: any) => item.id === cell.target.port);
          const newEdge = {
            source: cell.source?.cell ? {
              cell: cell.source.cell,
              port: sourcePort?.group,
            } : cell.source,
            target: cell.target?.cell ? {
              cell: cell.target.cell,
              port: targetPort?.group,
            } : cell.target,
          };
          snippetEdges.push(newEdge);
        }
      });

      // eslint-disable-next-line no-console
      console.info('-------------代码片段配置 start----------------');
      // eslint-disable-next-line no-console
      console.info(snippetConfig);
      // eslint-disable-next-line no-console
      console.info('-------------代码片段配置 end----------------');
      return;
    }
    messageApi.error('[graph] 至少包含一个子节点');
  }

  const handleChange = (value: any) => {
    // eslint-disable-next-line no-console
    console.log('editor change', value);
  }

  return (
    <>
      <Editor
        ref={editorRef as any}
        style={{ height: '100vh' }}
        materials={state.materials}
        value={dashboardData.graph}
        iconMap={iconMap}
        // propsPanelComponents={{}}
        propsPanelSchemaMap={defaultPropsSchema}
        size={state.size}
        toolbar={{ export: true, import: true }}
        onExport={handleExport}
        onImport={handleImport}
        onChange={handleChange}
      />
      <Space style={{padding:8}}>
        <Button type="primary" onClick={handlePrintSnippet}>打印代码片段</Button>
      </Space>
    </>
  );
};
