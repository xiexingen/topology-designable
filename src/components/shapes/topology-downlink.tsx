import { Graph, Node } from '@antv/x6';
import React from 'react';
import Downlink, { IDownlink } from './downlink';

const TopologyDownlink: React.FC<{ node: Node; graph: Graph }> = ({ node }) => {
  const data = node.getData();
  const componentProps = data.componentProps as IDownlink;
  const componentData = data.componentData as any;
  return (
    <Downlink
      {...componentProps}
      componentData={componentData}
      componentProps={componentProps}
      containerRender={data.containerRender}
      innerRender={data.innerRender}
    />
  );
};
export default TopologyDownlink;
