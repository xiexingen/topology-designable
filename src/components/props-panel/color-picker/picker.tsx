import React from 'react';
import { ColorPicker as AntdColorPicker, ColorPickerProps } from 'antd'

const presets=[
  {
    label: '推荐',
    colors: [
      '#02686C',
      '#F5222D',
      '#000000',
      '#FFFFFF',
      '#FA8C16',
      '#FADB14',
      '#8BBB11',
      '#52C41A',
      '#13A8A8',
    ]
  }
]

type FormilyColorPickerProps = Omit<ColorPickerProps,'onChange'> & {
  onChange: (value: string) => void
}

const ColorPicker: React.FC<FormilyColorPickerProps> = (props) => {
  const handleChange=(value)=>{
    props.onChange(value?.toHexString());
  }
  return (
    <AntdColorPicker presets={presets} showText {...props} onChange={handleChange} defaultFormat="hex" defaultValue="#00000000" />
  );
};

export default ColorPicker
