import type { Topology } from '@/types/global.d';
import type { PropsPanelProps } from '@/components/props-panel'
import type { ToolbarProps } from '@/components/toolbar/index'
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Graph, Cell, Model } from '@antv/x6';
import classNames from 'classnames';
import { Drawer, Layout } from 'antd';
import { toPng } from 'html-to-image';
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
  value: Model.FromJSONData,
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
  getJsonData(): Promise<{
    cells: Cell.Properties[];
}>;
  getImageData(option?: Record<string,any>): Promise<string>;
  getThumbData(width?:number,height?:number): Promise<string>;
  getInstance: ()=>Graph;
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

  // 获取编辑器的预览图
  const getImageData = async (htmlToImageOption:Record<string,any> = {}): Promise<string> => {
    if(!graphInstance){
      throw Error('[graph] graph 尚未实例化') ;
    }
    const graphSvg = graphInstance.container.querySelector('.x6-graph-svg') as HTMLElement;
      if (!graphSvg) {
        throw Error('[graph] 未找到画板');
      }
      const clonedGraphSvg = graphSvg.cloneNode(true) as HTMLElement;
      try {
        clonedGraphSvg
          .querySelector('g.x6-graph-svg-viewport')
          ?.setAttribute('transform', 'matrix(1,0,0,1,0,0)');
          graphInstance.container.appendChild(clonedGraphSvg);
        clonedGraphSvg.style.zIndex = '-1';
        clonedGraphSvg.style.width = `${props.size.width}px`;
        clonedGraphSvg.style.height = `${props.size.height}px`;
        const imageBase64 = await toPng(clonedGraphSvg, {
          backgroundColor: 'white',
          ...htmlToImageOption,
        });
        return imageBase64;
      } finally {
        graphInstance.container.removeChild(clonedGraphSvg);
      }
  }

  // 获取编辑器的缩略图
  async function getThumbData(width = 356, height = 140):Promise<string> {
    // 创建一个 Image 对象
    const image = new Image();
    image.src = await getImageData({ quality: 0.2 });
    return await new Promise((resolve, reject)=> {
      // 当图像加载完成后执行回调函数
      image.onload = ()=>{
        // 创建一个 canvas 元素
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw Error('[graph] 获取Canvas异常');
        }
        ctx.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
      image.onerror = (error)=>{
        reject(error);
      };
    });
  }

  const getJsonData = async ():Promise<{
    cells: Cell.Properties[];
  }> => {
    if(!graphInstance){
      throw Error('[graph] graph 尚未实例化') ;
    }
    return new Promise((resolve) => {
      resolve(graphInstance.toJSON());
    });
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
  }, [handleCellRemoved,handleChangeCurrentNode,handleExport,handleImport,handlePreview,handleChange])

  useEffect(()=>{
    if(graphInstance&&props.value){
      graphInstance.fromJSON(props.value);
    }
  },[
    graphInstance,
    props.value
  ])

  useImperativeHandle(ref, () => ({
    getJsonData,
    getImageData,
    getThumbData,
    getInstance: ()=> graphInstance,
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
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <img
            style={{ border: '1px solid #ccc' }}
            width={props.size.width}
            height={props.size.height}
            alt="预览"
            src={topologyBase64Image}
          />
        </div>
      </Drawer>
    </TopologyContext.Provider>
  )
}

export default forwardRef(Editor);
