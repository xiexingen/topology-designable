import React from 'react';
import { Select } from 'antd';
import styles from './icon-select.less';

interface IIconSelectProps {
  value?: string;
  dataSource?: Array<any>;
  allowClear?: boolean;
  disabled?: boolean;
  optionValueProp?: string;
  optionLabelProp?: string;
  onChange?: (value: string,option:any) => void;
}

const IconSelect: React.FC<IIconSelectProps> = (props) => {
  return (
    <Select
      value={props.value}
      onChange={props.onChange}
    >
      {
        props.dataSource?.map(item=>{
          return (
            <Select.Option
              key={item[props.optionValueProp as string]}
              value={item[props.optionValueProp as string]}
            >
              <div className={styles['styles']}>
                <span>{ item[props.optionLabelProp as string] }</span>
                <img src={item.icon} alt={item[props.optionLabelProp as string]} className={styles.img} />
              </div>
            </Select.Option>
          )
        })
      }
    </Select>
  );
};

IconSelect.defaultProps = {
  dataSource: [],
  optionLabelProp: 'label',
  optionValueProp: 'value',
  disabled: false,
  allowClear: true,
}

export default IconSelect
