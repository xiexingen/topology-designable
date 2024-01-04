import React from 'react';

export type ContainerNodeProps = {
  prop: any; // 这里应该是组件的属性类型
  data: any; // 这里应该是数据类型
};

const InnerNode: React.FC<ContainerNodeProps> = () => {
  return <>container-node</>;
};

export default InnerNode;
