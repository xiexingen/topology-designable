import { Graph, Node } from '@antv/x6';
import React from 'react';
import Device, { IDevice } from './device';

const TopologyDevice: React.FC<{ node: Node; graph: Graph }> = ({ node }) => {
  const data = node.getData();
  const componentProps = data.componentProps as IDevice;
  const componentData = data.componentData as any;
  return (
    <Device
      {...componentProps}
      componentData={componentData}
      componentProps={componentProps}
      containerRender={data.containerRender}
      innerRender={data.innerRender}
    />
  );
};
export default TopologyDevice;
