import React from 'react';
import { Background, BorderStyle } from '@/constants/enum';
import BaseNode, { IBaseNode } from './base-node';

export type IDevice= IBaseNode

const Device: React.FC<IDevice> = (props) => {
  return (
    <BaseNode className="device" {...props} />
  )
}

Device.defaultProps = {
  borderStyle: BorderStyle.solid,
  background: Background.white,
  full: false
}

export default Device;
