import React from 'react';
import { Background, BorderStyle } from '@/constants/enum';
import BaseNode, { IBaseNode } from './base-node';

export type IDownlink= IBaseNode

const Device: React.FC<IDownlink> = (props) => {
  return (
    <BaseNode className="downlink" {...props} />
  )
}

Device.defaultProps = {
  borderStyle: BorderStyle.solid,
  background: Background.white,
  full: false
}

export default Device;
