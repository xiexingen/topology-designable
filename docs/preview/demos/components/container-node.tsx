import type { MenuProps } from 'antd';
import { Dropdown, message, theme } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';

export type ContainerNodeProps = {
  prop: any; // 这里应该是组件的属性类型
  data: any; // 这里应该是数据类型
};

const useStyles = createStyles(() => {
  return {
    containerNode: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
  };
});

const items: MenuProps['items'] = [
  {
    label: '一键登录',
    key: 'login',
  },
  {
    label: '设备详情',
    key: 'detail',
  },
  {
    label: '一键封禁',
    key: 'ban',
  },
];

const InnerNode: React.FC<ContainerNodeProps> = () => {
  const { styles } = useStyles();
  const {
    token: { colorTextTertiary },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    const matchItem = items.find((item) => item?.key === key) as unknown;
    const label = matchItem?.['label'] || '未知操作';
    message.info(`执行了: ${label} 操作`);
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      trigger={['contextMenu']}
    >
      <div
        className={styles.containerNode}
        style={{
          color: colorTextTertiary,
        }}
      />
    </Dropdown>
  );
};

export default InnerNode;
