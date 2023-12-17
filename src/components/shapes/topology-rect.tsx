import React from 'react';
import { Graph,Node } from '@antv/x6';
import Rect,{ IRect } from './rect'

const TopologyRect: React.FC<{ node: Node; graph: Graph;}> = ({ node }) => {
  const data = node.getData();
  const componentProps = data.componentProps as unknown as IRect;
  return <Rect {...componentProps} />
}
export default TopologyRect;
