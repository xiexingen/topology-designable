import type { Topology } from '@/types/global.d';
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Graph, Model } from '@antv/x6';
import classNames from 'classnames';
import { Layout } from 'antd';
import TopologyContext from '@/contexts/topology'
import X6ReactPortalProvider from '@/contexts/x6-react-portal';
import useGraph from '@/hooks/useGraph'

import '@/index.less'
import { useSize } from 'ahooks';

export type EditorProps = {
  iconMap: Record<string, React.FunctionComponent>,
  value?: Model.FromJSONData,
  style?: React.CSSProperties;
  className?: string;
}

export type EditorRef = {
  getInstance: () => Graph;
}

const Editor: React.ForwardRefRenderFunction<EditorRef, EditorProps> = (props, ref) => {
  const graphContainerRef = useRef<any>()
  const graphContainerSize = useSize(graphContainerRef);

  const [graphInstance] = useGraph(graphContainerRef, {
    graphOption: {
      width: graphContainerSize?.width,
      height: graphContainerSize?.height,
      // autoResize: true,
      grid: false,
      embedding: false,
      interacting: false,
      panning: false,
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

  useEffect(()=>{
    if (graphInstance) {
      graphInstance.resize(graphContainerSize?.width,graphContainerSize?.height);
      graphInstance.zoomToFit({
        padding: 0,
      });
    }
  },[graphInstance,graphContainerSize])

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

  useImperativeHandle(ref, () => ({
    getInstance: () => graphInstance as Graph,
  }));

  return (
    <TopologyContext.Provider value={{
      graph: graphInstance,
      iconMap: props.iconMap
    }}>
      <X6ReactPortalProvider />
      <Layout style={props.style} className={classNames("topology-designable", props.className)}>
        <Layout.Content style={{ overflow: 'initial' }} className="content-section">
          <div className="canvas" style={{ width: '100%', height: '100%' }}>
            <div className="topo-editor topo-editor-preview" style={{ height: '100%' }} ref={graphContainerRef}></div>
          </div>
        </Layout.Content>
      </Layout>
    </TopologyContext.Provider>
  )
}

export default forwardRef(Editor);
