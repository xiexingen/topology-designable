import React from 'react';
import { Graph,Node } from '@antv/x6';
import Downlink,{ IDownlink } from './downlink'
import omit from 'lodash/omit';

const TopologyDownlink: React.FC<{ node: Node; graph: Graph;}> = ({ node }) => {
  const data = node.getData();
  const componentProps = data.componentProps as IDownlink;
  const componentData = omit(data,'componentProps');
  return (
    <Downlink
      {...componentProps}
      componentData={componentData}
      componentProps={componentProps}
    />
  )
}
export default TopologyDownlink;
