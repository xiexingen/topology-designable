import type { Topology } from '@/types/global';
import React from 'react';
import { Select, Flex } from 'antd';

type IconSelectProps = {
  value?: string;
  dataSource?: Array<Topology.TopologyIconProp>;
  allowClear?: boolean;
  showSearch?: boolean;
  disabled?: boolean;
  optionValueProp?: string;
  optionLabelProp?: string;
  onChange?: (value: string, option: any) => void;
}

const IconSelect: React.FC<IconSelectProps> = (props) => {
  const filterOption = (input: string, option) => {
    return (option?.[props.optionLabelProp || 'label'] ?? '').toLowerCase().includes(input.toLowerCase())
  };

  return (
    <Select
      value={props.value}
      showSearch={props.showSearch}
      disabled={props.disabled}
      allowClear={props.allowClear}
      filterOption={filterOption}
      options={props.dataSource}
      onChange={props.onChange}
      optionRender={(option) => {
        const item = option.data;
        return (
          <Flex align='center' justify="space-between">
            <span>{item[props.optionLabelProp as string]}</span>
            <img width="32" height="32" src={item.icon as unknown as string} alt={item[props.optionLabelProp as string]} className="img" />
          </Flex >
        )
      }}
    />
  );
};

IconSelect.defaultProps = {
  dataSource: [],
  optionLabelProp: 'label',
  optionValueProp: 'value',
  disabled: false,
  showSearch: true,
  allowClear: true,
}

export default IconSelect
