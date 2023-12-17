import React from 'react';
import {  BorderColor } from '@/constants/enum';

export interface ILine {
  stroke: BorderColor;
  strokeWidth: number;
  strokeDasharray: number;
  opacity?: number;
}

const Line: React.FC<ILine> = (props) => {
  return (
    <svg
      className="dayu-topology-editor-node line"
      version="1.1"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="50%"
        y1="0"
        x2="50%"
        y2="100%"
        opacity={`${props.opacity}%`}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
        strokeDasharray={props.strokeDasharray}
      />
    </svg>
  )
}

Line.defaultProps = {
  strokeWidth: 1,
  stroke: BorderColor.normal,
  strokeDasharray: 0,
  opacity:100,
}

export default Line;
