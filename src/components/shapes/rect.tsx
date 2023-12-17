import React from 'react';
import { Background, BorderStyle } from '@/constants/enum';

export interface IRect {
  borderStyle: BorderStyle;
  background: Background;
}

const Rect: React.FC<IRect> = (props) => {
  const computedStyle: React.CSSProperties = {
    // borderStyle为 dashed 的时候用主题边框颜色，其他情况用灰色
    borderColor: props.borderStyle === BorderStyle.dashed ? 'var(--topology-editor-border-color)' : '#cccccc',
    // borderStyle 为 none 时没有阴影
    boxShadow: props.borderStyle === BorderStyle.none ? 'none' : '2px 2px 4px 2px rgba(0, 0, 0, 0.1)',
    borderStyle: props.borderStyle,
    background: props.background,
  }

  return (
    <div className="topology-designable-node rect" style={computedStyle} />
  )
}

Rect.defaultProps = {
  borderStyle: BorderStyle.solid,
  background: Background.white,
}

export default Rect;
