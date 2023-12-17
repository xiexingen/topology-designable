import React from 'react';
import { Graph,Node } from '@antv/x6';
import Snippet,{ ISnippet } from './snippet'

const TopologySnippet: React.FC<{ node: Node; graph: Graph;}> = ({ node }) => {
  const data = node.getData();
  const componentProps = data.componentProps as unknown as ISnippet;
  return <Snippet {...componentProps} />
}
export default TopologySnippet;
