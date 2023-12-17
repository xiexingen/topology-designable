import React from 'react';
import { Graph,Node } from '@antv/x6';
import Label,{ ILabel } from './label'

const TopologyLabel: React.FC<{ node: Node; graph: Graph;}> = ({ node }) => {
  const data = node.getData();
  const componentProps = data.componentProps as unknown as ILabel;
  return <Label {...componentProps} />
}
export default TopologyLabel;
