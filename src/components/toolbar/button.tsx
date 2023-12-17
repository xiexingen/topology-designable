import React from 'react';
import { Tooltip } from 'antd'

interface IButtonProps {
  disabled:boolean;
  tooltip:string;
  icon: any;
  iconHeight?:number;
  iconWidth?:number;
  onClick?:()=>void;
}

const Button: React.FC<IButtonProps> = (props) => {
  const Content = <img onClick={props.onClick} height={props.iconHeight} width={props.iconWidth} src={props.icon} alt={props.tooltip} />
  return (
    <>
      {
        props.tooltip?<Tooltip mouseEnterDelay={0.8} placement="bottom" title={props.tooltip}>{Content}</Tooltip>:Content
      }
    </>
  );
};

Button.defaultProps= {
  iconWidth: 14,
  iconHeight:14,
  disabled:false,
}

export default Button
