import React from 'react';
import { Background, BorderStyle } from '@/constants/enum';


export interface ICircle {
  borderStyle: BorderStyle;
  background: Background;
}

const Circle: React.FunctionComponent<ICircle> = (props) => {
  const computedStyle: React.CSSProperties = {
    borderStyle: props.borderStyle,
    background: props.background,
  }

  return (
    <div className="topology-designable-node circle" style={computedStyle} />
  )
}

Circle.defaultProps = {
  borderStyle: BorderStyle.solid,
  background: Background.white,
}

export default Circle;
