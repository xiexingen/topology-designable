import React from 'react'
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons'

const shortKeys=[
  {
    label: '复制',
    shortKey: 'ctrl+c'
  },
  {
    label: '剪切',
    shortKey: 'ctrl+x'
  },
  {
    label: '粘贴',
    shortKey: 'ctrl+v'
  },
  {
    label: '撤销',
    shortKey: 'ctrl+z'
  },
  {
    label: '重做',
    shortKey: 'ctrl+shift+z'
  },
  {
    label: '全选',
    shortKey: 'ctrl+a'
  },
  {
    label: '删除',
    shortKey: 'delete/backspace'
  },
  {
    label: '上移',
    shortKey: 'up'
  },
  {
    label: '下移',
    shortKey: 'down'
  },
  {
    label: '左移',
    shortKey: 'left'
  },
  {
    label: '右移',
    shortKey: 'right'
  },
  {
    label: '拖动画板',
    shortKey: 'ctrl+鼠标左键+移动'
  },
  {
    label: '放大/缩小',
    shortKey: 'ctrl+滚轮'
  },
]

const Help: React.FC = () => {

  const renderTooltip=()=>{
    return (
      <div className='help'>
        {
        shortKeys.map(item=>{
          return (
            <p key={item.label} style={{marginBottom: 10}}>
              <span>{item.label}:</span>
              <span className='short-key'>
              {item.shortKey}
              </span>
            </p>
          )
        })
        }
      </div>
    )
  }
  return (
    <Tooltip trigger="click" placement="bottom" title={renderTooltip}>
      <QuestionCircleOutlined />
    </Tooltip>
  )
}

export default Help;
