import {
  BellTwoTone,
  ExclamationCircleTwoTone,
  ToolTwoTone,
} from '@ant-design/icons';
import { Badge, Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import React from 'react';
import { DeviceStatus } from '../../../_assets/mock';

export type InnerNodeProps = {
  prop: any; // 这里应该是组件的属性类型
  // 这里应该是数据类型
  data: {
    id: string;
    name: string;
    status: DeviceStatus;
    alarm?: number;
  };
};

const useStyles = createStyles(() => {
  return {
    innerNode: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      left: 0,
      top: 0,
      boxSizing: 'border-box',
      display: 'inline-block',
      borderRadius: '4px',
      // [`@media screen and (max-width: ${token.screenXS}px)`]: {
      //   width: '100%',
      // },
      '.monitor-status': {
        position: 'absolute',
        left: 0,
        top: 0,
        fill: 'none',
        stroke: '#595959',
        strokeWidth: 2,
        strokeDasharray: '4, 3',
        strokeDashoffset: 3,
      },
      '&.normal': {
        '.monitor-status': {
          stroke: '#73d13d',
        },
      },
      '&.offline': {
        '.monitor-status': {
          stroke: '#bfbfbf',
        },
      },
      '&.abnormal': {
        '.monitor-status': {
          stroke: '#ff4d4f',
        },
      },
      '&.overhaul': {
        '.monitor-status': {
          stroke: '#003a8c',
        },
      },
      '&.alarm': {
        '.monitor-status': {
          stroke: '#faad14',
        },
      },
      '&.abnormal,&.overhaul,&.alarm': {
        '.monitor-status': {
          strokeWidth: 4,
          animationName: 'marqueeAnimation',
          animationDuration: '1s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        },
      },
      '.run-status': {
        position: 'absolute',
        zIndex: 1,
        textAlign: 'left',
        marginTop: '-12px',
        marginLeft: 0,
        '.item': {
          margin: '-2px',
          animationName: 'blinkAnimation',
          animationDuration: '8s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        },
      },
      '@keyframes blinkAnimation': {
        '0%': { opacity: 1 },
        '20%': { opacity: 0 },
        '40%': { opacity: 1 },
        '100%': { opacity: 1 },
      },
      '@keyframes marqueeAnimation': {
        '0%': { strokeDashoffset: 6 },
        '100%': { strokeDashoffset: 0 },
      },
    },
  };
});

const InnerNode: React.FC<InnerNodeProps> = ({ data }) => {
  const { styles } = useStyles();
  return (
    <div
      className={classNames(styles.innerNode, {
        [DeviceStatus[data.status]]: true,
      })}
    >
      <svg
        className="monitor-status"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
        version="1.1"
      >
        <rect x="0" y="0" width="100%" height="100%" />
      </svg>
      <div className="run-status">
        {data.status === DeviceStatus.abnormal && (
          <Tooltip placement="top" title="发现设备异常">
            <ExclamationCircleTwoTone
              twoToneColor="#ff4d4f"
              style={{ color: '#ff4d4f', fontSize: 20 }}
              className="item"
            />
          </Tooltip>
        )}
        {data.status === DeviceStatus.overhaul && (
          <Tooltip placement="top" title="设备正在检修中...">
            <ToolTwoTone
              twoToneColor="#003a8c"
              style={{ color: '#003a8c', fontSize: 20 }}
              className="item"
            />
          </Tooltip>
        )}
        {data.status === DeviceStatus.alarm && (
          <Tooltip placement="top" title="发现告警">
            <Badge size="small" count={data.alarm}>
              <BellTwoTone
                twoToneColor="#faad14"
                style={{ color: '#faad14', fontSize: 20 }}
                className="item"
              />
            </Badge>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default InnerNode;
