import type { Topology } from '@/types/global.d';
import type { PropsPanelProps } from '@/components/props-panel'
import type { ToolbarProps } from '@/components/toolbar/index'
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Graph, Cell } from '@antv/x6';
import classNames from 'classnames';
import { Drawer, Layout } from 'antd';
import throttle from 'lodash/throttle';
import TopologyContext from '@/contexts/topology'
import X6ReactPortalProvider from '@/contexts/x6-react-portal';
import { EVENT_MAP } from '@/constants';
import useGraph from '@/hooks/useGraph'
import eventBus from '@/utils/event-bus';
import MaterialPanel from '@/components/material-panel';
import PropsPanel from '@/components/props-panel';
import Toolbar from '@/components/toolbar';

import '@/index.less'

export type EditorProps = {
  style?: React.CSSProperties;
  className?: string;
  iconMap: Record<string, React.FunctionComponent>,
  materials: Topology.Materials;
  materialFilterable?: boolean;
  propsPanelSchemaMap?: PropsPanelProps['schemaMap'];
  propsPanelComponents?: PropsPanelProps['components'];
  propsPanelScope?: PropsPanelProps['scope'];
  size: Topology.Size;
  toolbar?: ToolbarProps['toolbar'];
  onImport?: (data: Topology.Graph) => Promise<void>;
  onExport?: (type: 'json' | 'image') => Promise<void>;
  onChange?: (change: any) => void;
}

export type EditorRef = {
  getJsonData(): Promise<Record<string, any>>;
  getImageData(): Promise<string>;
  graph?: Graph,
}

const layoutWidth = {
  materialPanel: 340,
  propsPanel: 260,
}

const Editor: React.ForwardRefRenderFunction<EditorRef, EditorProps> = (componentProp, ref) => {
  const graphContainerRef = useRef<any>()
  const [currentNode, setCurrentNode] = useState<Cell | null>(null)
  const [topologyBase64Image, setTopologyBase64Image] = useState('')
  // merge 默认属性
  const props = Object.assign({
    materialFilterable: false,
    materials: [],
    propsPanelScope: {},
    propsPanelComponents: {},
    size: {
      height: 666,
      width: 1888,
    },
    toolbar: true,
  }, componentProp)

  const [graphInstance] = useGraph(graphContainerRef, {
    graphOption: {
      width: props.size.width,
      height: props.size.height,
    }
  })

  const handleCellRemoved = () => {
    setCurrentNode(null);
  }
  const handleChangeCurrentNode = (cell: Cell) => {
    setCurrentNode(cell);
  }
  const handleExport = async (type: 'json' | 'image') => {
    await props.onExport?.(type);
  }

  const handleImport = async (data: Topology.Graph) => {
    await props.onImport?.(data);
  }
  const getImageData = async (): Promise<string> => {
    return await new Promise(resolve => {
      resolve('')
    })
  }

  const handlePreview = async () => {
    const topoBase64Image = await getImageData();
    setTopologyBase64Image(topoBase64Image)
  }

  const handleChange = throttle((arg: any) => {
    props.onChange?.(arg);
  }, 300)

  useEffect(() => {
    eventBus.on(EVENT_MAP.CELL_REMOVE, handleCellRemoved);
    eventBus.on(EVENT_MAP.NODE_SELECTED, handleChangeCurrentNode);
    eventBus.on(EVENT_MAP.EDGE_SELECTED, handleChangeCurrentNode);
    eventBus.on(EVENT_MAP.ON_EXPORT, handleExport);
    eventBus.on(EVENT_MAP.ON_IMPORT, handleImport);
    eventBus.on(EVENT_MAP.PREVIEW, handlePreview);
    eventBus.on(EVENT_MAP.ON_CHANGE, handleChange);

    return () => {
      eventBus.off(EVENT_MAP.CELL_REMOVE, handleCellRemoved);
      eventBus.off(EVENT_MAP.NODE_SELECTED, handleChangeCurrentNode);
      eventBus.off(EVENT_MAP.EDGE_SELECTED, handleChangeCurrentNode);
      eventBus.off(EVENT_MAP.ON_EXPORT, handleExport);
      eventBus.off(EVENT_MAP.ON_IMPORT, handleImport);
      eventBus.off(EVENT_MAP.PREVIEW, handlePreview);
      eventBus.off(EVENT_MAP.ON_CHANGE, handleChange);
    }
  }, [])

  useImperativeHandle(ref, () => ({
    getJsonData: async () => {
      return await new Promise(resolve => {
        resolve({})
      })
    },
    getImageData: async () => {
      return await new Promise(resolve => {
        resolve('')
      })
    },
    graph: graphInstance,
  }));

  return (
    <TopologyContext.Provider value={{
      graph: graphInstance,
      iconMap: props.iconMap
    }}>
      {/* 为 自定义 rect 节点提供数据 */}
      <X6ReactPortalProvider />
      <Layout hasSider style={props.style} className={classNames("topology-designable", props.className)}>
        <Layout.Sider theme="light" width={layoutWidth.materialPanel}>
          <MaterialPanel
            iconMap={props.iconMap}
            materials={props.materials}
            filterable={props.materialFilterable}
          />
        </Layout.Sider>
        <Layout className='topology-designable-content'>
          <Layout.Content style={{ overflow: 'initial' }} className="content-section">
            <Toolbar toolbar={props.toolbar} />
            <div className="canvas">
              <div className="topo-editor" ref={graphContainerRef}></div>
            </div>
          </Layout.Content>
        </Layout>
        <Layout.Sider theme="light" width={layoutWidth.propsPanel}>
          <PropsPanel
            node={currentNode}
            components={props.propsPanelComponents}
            scope={props.propsPanelScope}
            schemaMap={props.propsPanelSchemaMap}
          />
        </Layout.Sider>
      </Layout>
      <Drawer
        title="预览"
        placement="right"
        width="100vw"
        height="100vh"
        onClose={() => {
          setTopologyBase64Image('');
        }}
        open={!!topologyBase64Image}
      >
        <img
          style={{ border: '1px solid #ccc' }}
          alt="预览"
          src={topologyBase64Image}
        />
      </Drawer>
    </TopologyContext.Provider>
  )
}

export default forwardRef(Editor);
