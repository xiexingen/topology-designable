import type { Topology } from '@/types/global';
import { ICON_NAMES } from './icon-map';

const BACKGROUND_NORMAL = 'var(--topology-editor-background-normal)';

export const dashboard: Topology.Materials = [
  {
    name: 'device',
    label: '设备',
    items: [
      {
        id: 'database-audit',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'solid',
          label: '数据库审计',
          icon: ICON_NAMES.databaseAudit,
          background: 'white',
        },
      },
      {
        id: 'switch',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'solid',
          label: '交换机',
          icon: ICON_NAMES.switch,
          background: 'white',
        },
      },
      {
        id: 'firewall',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'solid',
          label: '防火墙',
          icon: ICON_NAMES.firewall,
          background: 'white',
        },
      },
      {
        id: 'firewall-ip',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'solid',
          label: 'IP封禁',
          icon: ICON_NAMES.firewallIp,
          background: 'white',
        },
      },
      {
        id: 'china-unicom',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'solid',
          label: '联通专线',
          icon: ICON_NAMES.chinaUnicom,
          background: 'white',
        },
      },
      {
        id: 'china-mobile',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'solid',
          label: '移动专线',
          icon: ICON_NAMES.chinaMobile,
          background: 'white',
        },
      },
      {
        id: 'internet',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'solid',
          label: '互联网',
          icon: ICON_NAMES.internet,
          background: 'white',
        },
      },
      {
        id: 'ddos',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'solid',
          label: '抗DDOs攻击',
          icon: ICON_NAMES.ddos,
          background: 'white',
        },
      },
      {
        id: 'web',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'solid',
          label: 'Web应用',
          icon: ICON_NAMES.web,
          background: 'white',
        },
      },
      {
        id: 'bank',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'none',
          label: '银行',
          icon: ICON_NAMES.bank,
          background: 'transparent',
        },
      },
      {
        id: 'government',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'none',
          label: '政府',
          icon: ICON_NAMES.government,
          background: 'transparent',
        },
      },
      {
        id: 'police',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'none',
          label: '公安',
          icon: ICON_NAMES.police,
          background: 'transparent',
        },
      },
      {
        id: 'cloud',
        component: 'topology-device',
        size: {
          height: 74,
          width: 74,
        },
        componentProps: {
          borderStyle: 'dashed',
          label: '云平台',
          icon: ICON_NAMES.cloud,
          background: BACKGROUND_NORMAL,
        },
      },
    ],
  },
  {
    name: 'other',
    label: '其他',
    items: [
      {
        id: 'circle',
        label: '圆形',
        component: 'topology-circle',
        embeddable: true,
        componentProps: {
          borderStyle: 'solid',
          background: 'var(--topology-editor-background-normal)',
        },
        size: {
          height: 74,
          width: 74,
        },
      },
      {
        id: 'rect-dashed-normal',
        label: '正方形',
        component: 'topology-rect',
        embeddable: true,
        componentProps: {
          borderStyle: 'dashed',
          background: 'var(--topology-editor-background-normal)',
        },
        size: {
          height: 74,
          width: 74,
        },
      },
      {
        id: 'rect-solid-white',
        label: '正方形',
        component: 'topology-rect',
        embeddable: true,
        componentProps: {
          borderStyle: 'solid',
          background: 'white',
        },
        size: {
          height: 74,
          width: 74,
        },
      },
      {
        id: 'lightning',
        label: '闪电',
        icon: 'lightning',
        component: 'topology-lightning',
        size: {
          height: 48,
          width: 48,
        },
      },
      {
        id: 'line',
        label: '线条',
        component: 'topology-line',
        componentProps: {
          stroke: 'var(--topology-editor-normal-color)',
          strokeWidth: 1,
        },
        size: {
          height: 300,
          width: 20,
        },
        rowSpan: 2,
      },
      {
        id: 'larger-label',
        label: '大文本',
        component: 'topology-label',
        componentProps: {
          label: '大文本',
          type: 'title',
          layout: 'vertical',
          textAlign: 'center',
          color: 'var(--topology-editor-normal-color)',
        },
        size: {
          height: 240,
          width: 60,
        },
        columnSpan: 2,
      },
      {
        id: 'label',
        label: '普通文本',
        component: 'topology-label',
        componentProps: {
          label: '普通文本',
          type: 'normal',
          layout: 'horizontal',
          textAlign: 'center',
          color: 'var(--topology-editor-normal-color)',
        },
        size: {
          height: 40,
          width: 100,
        },
      },
    ],
  },
];
