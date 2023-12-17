import React from 'react';
import { Graph,Node } from '@antv/x6';
import Device,{ IDevice } from './device'
import omit from 'lodash/omit';

const TopologyDevice: React.FC<{ node: Node; graph: Graph;}> = ({ node }) => {
  const data = node.getData();
  const componentProps = data.componentProps as IDevice;
  const componentData = omit(data,'componentProps');
  return (
    <Device
      {...componentProps}
      componentData={componentData}
      componentProps={componentProps}
    />
  )
}
export default TopologyDevice;
