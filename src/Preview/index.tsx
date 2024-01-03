import type { Topology } from '@/types/global.d';
import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import { Graph, Model } from '@antv/x6';
import { useSize } from 'ahooks';
import classNames from 'classnames';
import { Button, Layout, Space } from 'antd';
import { PlusOutlined, MinusOutlined, } from '@ant-design/icons';
import TopologyContext from '@/contexts/topology'
import X6ReactPortalProvider from '@/contexts/x6-react-portal';
import useGraph from '@/hooks/useGraph'


import '@/index.less'
import { GRAPH_ZOOM } from '@/constants';
import EventBus from '@/utils/event-bus';

export type EditorProps = {
  iconMap: Record<string, Topology.TopologyIconProp>,
  value?: Model.FromJSONData,
  style?: React.CSSProperties;
  className?: string;
}

export type EditorRef = {
  getInstance: () => Graph;
}

const Editor: React.ForwardRefRenderFunction<EditorRef, EditorProps> = (props, ref) => {
  const graphContainerRef = useRef<any>()
  const eventBusRef = useRef<EventBus>(new EventBus());
  const [zoom, setZoom] = useState(1)
  const graphContainerSize = useSize(graphContainerRef);

  const [graphInstance] = useGraph(graphContainerRef, eventBusRef.current, {
    graphOption: {
      width: graphContainerSize?.width,
      height: graphContainerSize?.height,
      // autoResize: true,
      grid: false,
      embedding: false,
      interacting: false,
      panning: true,
    },
    pluginOption: {
      transform: false,
      selection: false,
      snapline: false,
      keyboard: false,
      clipboard: false,
      history: false,
      scroller: false,
    },
    keyBoardEvent: false,
    graphEvent: false,
  })

  const handleZoomToFit = () => {
    if (!graphInstance) {
      return;
    }
    graphInstance.zoomToFit({
      padding: 2,
    });
  }

  useEffect(() => {
    if (graphInstance) {
      graphInstance.resize(graphContainerSize?.width, graphContainerSize?.height);
      graphInstance.zoomToFit({
        padding: 2,
      });
    }
  }, [graphInstance, graphContainerSize])

  useEffect(() => {
    if (graphInstance) {
      if (props.value) {
        graphInstance.fromJSON(props.value);
      }
      else {
        graphInstance.clearCells();
      }
    }
  }, [
    graphInstance,
    props.value,
  ])

  useEffect(() => {
    if (!graphInstance) {
      return;
    }
    graphInstance.on("scale", () => {
      const zoom = graphInstance.zoom();
      let zoomValue = Math.min(zoom, GRAPH_ZOOM.max)
      zoomValue = Math.max(zoomValue, GRAPH_ZOOM.min)
      setZoom(Math.max(zoomValue))
    });
  }, [graphInstance])

  useImperativeHandle(ref, () => ({
    getInstance: () => graphInstance as Graph,
  }));


  const handleChangeZoom = (zoom: number, absolute = false) => {
    if (!graphInstance) {
      return;
    }
    graphInstance.zoom(zoom, {
      minScale: GRAPH_ZOOM.min,
      maxScale: GRAPH_ZOOM.max,
      absolute,
    });
  };

  const zoomText = Math.floor(zoom * 100) + '%';

  return (
    <TopologyContext.Provider value={{
      graph: graphInstance,
      iconMap: props.iconMap,
      eventBus: eventBusRef.current,
    }}>
      <X6ReactPortalProvider />
      <Layout style={props.style} className={classNames("topology-designable", "topology-designable-preview", props.className)}>
        <Layout.Content style={{ overflow: 'initial' }} className="topology-designable-content">
          <div className="canvas" style={{ width: '100%', height: '100%' }}>
            <div className='preview-zoom'>
              <Space.Compact size="small" block>
                <Button icon={<MinusOutlined />} onClick={() => handleChangeZoom(-0.1)} />
                <Button
                  title={`单击切换到自适应\n双击切换到100%`}
                  onClick={handleZoomToFit}
                  onDoubleClick={() => handleChangeZoom(1, true)}
                >{zoomText}</Button>
                <Button icon={<PlusOutlined />} onClick={() => handleChangeZoom(0.1)} />
              </Space.Compact>
            </div>
            <div className="editor editor-preview" style={{ height: '100%' }} ref={graphContainerRef}></div>
          </div>
        </Layout.Content>
      </Layout>
    </TopologyContext.Provider>
  )
}

export default forwardRef(Editor);
