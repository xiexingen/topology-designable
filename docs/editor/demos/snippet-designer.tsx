/**
 * description: 选中需要使用的 "容器节点" 打开控制器，然后点击 "打印" 按钮，可以拷贝生成的 json 作为一个片段配置直接使用
 */
import { useSetState } from 'ahooks';
import { Button, Space, Typography, message, notification } from 'antd';
import React, { useEffect, useRef } from 'react';
import { Editor, defaultPropsSchema } from 'topology-designable';
import iconMap from '../../_assets/icon-map';
import { dashboard as dashboardMaterials } from '../../_assets/materials';

export default () => {
  const editorRef = useRef();
  const [messageApi] = message.useMessage();
  const [api, contextHolder] = notification.useNotification();
  const [state, setState] = useSetState({
    size: {
      height: 666,
      width: 1888,
    },
    materials: dashboardMaterials,
    value: undefined,
  });

  const handlePrintSnippet = async () => {
    const editorInstance = editorRef.current as unknown as Editor;
    const graphInstance = editorInstance.getInstance();
    if (!graphInstance) {
      return;
    }
    const selectedCells = graphInstance.getSelectedCells();
    if (Array.isArray(selectedCells) && selectedCells.length !== 1) {
      messageApi.error('[graph] 仅支持选中一个导出节点(容器节点)');
      return;
    }
    const selectedContainer = selectedCells[0] as any;
    if (
      Array.isArray(selectedContainer.children) &&
      selectedContainer.children.length > 0
    ) {
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
        },
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
          },
        },
        size: {
          height: containerSize.height,
          width: containerSize.width,
        },
        columnSpan: 3, // 【可空】配置该资产占 3 列展示
        rowSpan: 2, // 【可空】配置该资产占 2 列展示
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
              icon: cellComponentProps.icon
                ? cellComponentProps.icon.replace(
                    /.*\/([\d|-\w]+)\.svg$/gi,
                    '$1',
                  )
                : cellComponentProps.icon,
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
          const sourcePort = cell
            .getSourceCell()
            ?.port?.ports?.find((item: any) => item.id === cell.source.port);
          const targetPort = cell
            .getTargetCell()
            ?.port?.ports?.find((item: any) => item.id === cell.target.port);
          const newEdge = {
            source: cell.source?.cell
              ? {
                  cell: cell.source.cell,
                  port: sourcePort?.group,
                }
              : cell.source,
            target: cell.target?.cell
              ? {
                  cell: cell.target.cell,
                  port: targetPort?.group,
                }
              : cell.target,
          };
          snippetEdges.push(newEdge);
        }
      });
      const strSnippet = JSON.stringify(snippetConfig, null, 2);
      api.open({
        message: '片段',
        description: (
          <Typography.Paragraph copyable={{ text: strSnippet }}>
            <pre style={{ maxHeight: 'calc(100vh - 240px)', overflow: 'auto' }}>
              {strSnippet}
            </pre>
          </Typography.Paragraph>
        ),
        style: {
          width: 650,
        },
        duration: null,
        btn: (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => api.destroy('snippet')}
            >
              我知道了
            </Button>
          </Space>
        ),
        key: 'snippet',
      });
      return;
    }
    messageApi.error('[graph] 导出的片段至少包含一个子节点');
  };

  // 模拟加载后端接口数据
  useEffect(() => {
    const dashboardData = require('../../_assets/data/snippet.json');
    setState({
      value: dashboardData['graph'],
    });
  }, []);

  // 模拟选中
  useEffect(() => {
    if (state.value) {
      const editorInstance = editorRef.current as unknown as Editor;
      const graphInstance = editorInstance.getInstance();
      graphInstance.select('80c8697b-0972-464f-9bdd-ae95a57b9e19');
    }
  }, [state.value]);

  return (
    <>
      <Space style={{ padding: 8 }}>
        {contextHolder}
        <Button type="primary" onClick={handlePrintSnippet}>
          打印代码片段
        </Button>
      </Space>
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
