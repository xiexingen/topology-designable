import React,{ useContext } from 'react';
import classNames from 'classnames';
import { Background, BorderStyle,BorderColor, } from '@/constants/enum';
import TopologyContext from '@/contexts/topology'

type TRender = ({
  componentData,
  componentProps,
}) => React.ReactNode;

export interface IBaseNode {
  borderStyle: BorderStyle;
  borderColor: BorderColor,
  background: Background;
  icon: string;
  label: string;
  full?: boolean;
  renderInner?: TRender;
  renderFull?: TRender;
  className?: string;
  componentData?: any;
  componentProps?: any;
}

const BaseNode: React.FC<IBaseNode> = (props) => {
  const computedStyle: React.CSSProperties = {
    // borderStyle为 dashed 的时候用国网的边框颜色，其他情况用灰色
    borderColor: props.borderColor,
    // borderStyle 为 none 时没有阴影
    boxShadow: props.borderStyle === BorderStyle.none ? 'none' : '2px 2px 4px 4px rgba(0, 0, 0, 0.1)',
    borderStyle: props.borderStyle,
    background: props.background,
  }
  const { iconMap } = useContext(TopologyContext);

  return (
    <div
      className={
        classNames(
          "topology-designable-node",
          "node",
          { 'full': props.full, },
          props.className
        )
      }
      style={computedStyle}
    >
      <div className="inner">
        <img
          width="100%"
          height="100%"
          src={iconMap?.[props.icon]?.icon as any}
          alt="label"
        />
        {/* 运行状态 */}
        {
          props.renderInner && props.renderInner({
            componentData: props.componentData,
            componentProps: props.componentProps,
          })
        }
      </div>
      <div title="label" className="label">
        {props.label}
      </div>
      {/* 操作蒙版 */}
      {
        props.renderFull && props.renderFull({
          componentData: props.componentData,
          componentProps: props.componentProps,
        })
      }
    </div>
  )
}

BaseNode.defaultProps = {
  borderStyle: BorderStyle.solid,
  background: Background.white,
  full: false,
}

export default BaseNode;
