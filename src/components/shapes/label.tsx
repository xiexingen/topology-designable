import React from 'react';
import classNames from 'classnames';
import { Color, TextAlignType, TextLayout, TextType } from '@/constants/enum';

export interface ILabel {
  color: Color;
  type: TextType;
  textAlign: TextAlignType;
  layout: TextLayout;
  label: string,
  opacity?: number;
}

const Label: React.FC<ILabel> = (props) => {
  const computedStyle: React.CSSProperties = {
    color: props.color,
    textAlign: props.textAlign,
    fontSize: props.type === TextType.normal ? 'medium' : 'x-large',
    opacity: `${props.opacity}%`,
  }

  return (
    <div
      className={
        classNames(
          "topology-designable-node",
          "label",
          {
            'layout-horizontal': props.layout === TextLayout.horizontal,
            'layout-vertical': props.layout === TextLayout.vertical,
          }
        )
      }
      style={computedStyle}
    >
      {props.label}
    </div>
  )
}

Label.defaultProps = {
  color: Color.normal,
  type: TextType.normal,
  textAlign: TextAlignType.center,
  layout: TextLayout.horizontal,
  label: 'label',
  opacity: 100,
}

export default Label;
