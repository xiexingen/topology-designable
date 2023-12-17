import React from 'react';
import classNames from 'classnames';

interface IDefaultProps {
  icon?: string;
  label?: string;
  className?: string;
}

const Default: React.FC<IDefaultProps> = (props) => {
  return (
    <div className={classNames('default', props.className)}>
      <img className="icon" src={props.icon} alt={props.label || ''} />
      <label title={props.label} className="label">{props.label}</label>
    </div>
  );
};

Default.defaultProps = {
  icon: '',
  label: '',
}

export default Default
