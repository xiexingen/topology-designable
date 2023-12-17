import React from 'react';
import { Graph,Node } from '@antv/x6';
import Circle,{ ICircle } from './circle'

const TopologyCircle: React.FC<{ node: Node; graph: Graph;}> = ({ node }) => {
  const data = node.getData();
  const componentProps = data.componentProps as unknown as ICircle;
  return <Circle {...componentProps} />
}
export default TopologyCircle;
