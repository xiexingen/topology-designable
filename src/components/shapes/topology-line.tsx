import React from 'react';
import { Graph,Node } from '@antv/x6';
import Line,{ ILine } from './line'

const TopologyLine: React.FC<{ node: Node; graph: Graph;}> = ({ node }) => {
  const data = node.getData();
  const componentProps = data.componentProps as unknown as ILine;
  return <Line {...componentProps} />
}
export default TopologyLine;
