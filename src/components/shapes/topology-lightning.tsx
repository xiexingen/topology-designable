import React from 'react';
import { Graph,Node } from '@antv/x6';
import Lightning,{ ILightning } from './lightning'

const TopologyLightning: React.FC<{ node: Node; graph: Graph;}> = ({ node }) => {
  const data = node.getData();
  const componentProps = data.componentProps as unknown as ILightning;
  return <Lightning {...componentProps} />
}
export default TopologyLightning;
