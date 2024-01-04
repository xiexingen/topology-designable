import bank from './icons/bank.svg';
import chinaMobile from './icons/china-mobile.svg';
import chinaUnicom from './icons/china-unicom.svg';
import cloud from './icons/cloud.svg';
import databaseAudit from './icons/database-audit.svg';
import ddos from './icons/ddos.svg';
import firewallIp from './icons/firewall-ip.svg';
import firewall from './icons/firewall.svg';
import government from './icons/government.svg';
import internet from './icons/internet.svg';
import police from './icons/police.svg';
import switchIcon from './icons/switch.svg';
import web from './icons/web.svg';

export const ICON_NAMES = {
  bank: 'bank',
  chinaMobile: 'chinaMobile',
  chinaUnicom: 'chinaUnicom',
  cloud: 'cloud',
  databaseAudit: 'databaseAudit',
  ddos: 'ddos',
  firewallIp: 'firewallIp',
  firewall: 'firewall',
  government: 'government',
  internet: 'internet',
  police: 'police',
  switch: 'switch',
  web: 'web',
};

export default {
  [ICON_NAMES.bank]: {
    label: '银行',
    value: ICON_NAMES.bank,
    icon: bank,
  },
  [ICON_NAMES.chinaMobile]: {
    label: '移动专线',
    value: ICON_NAMES.chinaMobile,
    icon: chinaMobile,
  },
  [ICON_NAMES.chinaUnicom]: {
    label: '联通专线',
    value: ICON_NAMES.chinaUnicom,
    icon: chinaUnicom,
  },
  [ICON_NAMES.cloud]: {
    label: '云平台',
    value: ICON_NAMES.cloud,
    icon: cloud,
  },
  [ICON_NAMES.databaseAudit]: {
    label: '数据库审计',
    value: ICON_NAMES.databaseAudit,
    icon: databaseAudit,
  },
  [ICON_NAMES.ddos]: {
    label: '抗DDOS攻击',
    value: ICON_NAMES.ddos,
    icon: ddos,
  },
  [ICON_NAMES.firewallIp]: {
    label: 'IP封禁',
    value: ICON_NAMES.firewallIp,
    icon: firewallIp,
  },
  [ICON_NAMES.firewall]: {
    label: '防火墙',
    value: ICON_NAMES.firewall,
    icon: firewall,
  },
  [ICON_NAMES.internet]: {
    label: '互联网',
    value: ICON_NAMES.internet,
    icon: internet,
  },
  [ICON_NAMES.government]: {
    label: '政府',
    value: ICON_NAMES.government,
    icon: government,
  },
  [ICON_NAMES.police]: {
    label: '公安',
    value: ICON_NAMES.police,
    icon: police,
  },
  [ICON_NAMES.switch]: {
    label: '交换机',
    value: ICON_NAMES.switch,
    icon: switchIcon,
  },
  [ICON_NAMES.web]: {
    label: 'Web应用',
    value: ICON_NAMES.web,
    icon: web,
  },
};
