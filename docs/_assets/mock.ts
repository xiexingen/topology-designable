const devices = [
  {
    id: 'bank',
    name: '银行',
  },
  {
    id: 'cloud',
    name: '云平台',
  },
  {
    id: 'databaseAudit',
    name: '数据库审计',
  },
  {
    id: 'ddos',
    name: '抗DDOS攻击',
  },
  {
    id: 'firewallIp',
    name: 'IP封禁',
  },
  {
    id: 'firewall',
    name: '防火墙',
  },
  {
    id: 'government',
    name: '政府',
  },
  {
    id: 'police',
    name: '公安',
  },
  {
    id: 'switch',
    name: '交换机',
  },
  {
    id: 'web',
    name: 'Web应用',
  },
];

/**
 * 设备状态枚举值
 */
export enum DeviceStatus {
  /**
   * 正常
   */
  normal = 1,
  /**
   * 设备检修中
   */
  overhaul = 2,
  /**
   * 设备异常
   */
  abnormal = 3,
  /**
   * 警告信息
   */
  alarm = 4,
  /**
   * 设备离线
   */
  offline = 5,
}

export function delay(ms: number = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

/**
 * 生成一个 1-max 的随机整数
 * @param max
 */
export function randomValue(max: number) {
  if (max <= 0) {
    throw new Error('max must be greater than 0');
  }
  return (Math.ceil(Math.random() * 100) % max) + 1;
}

/**
 * 模拟设备列表请求
 */
export async function getDeviceStatus() {
  // eslint-disable-next-line no-console
  console.log('请求设备状态列表');
  await delay();
  return await new Promise((resolve) => {
    const result = devices.map((item) => {
      const randomStatus = randomValue(5);
      return {
        ...item,
        status: randomStatus, //  1: 正常  2: 设备检修中   3: 设备异常   4:警告信息   5: 设备离线
        alarm: randomStatus === 4 ? randomValue(100) : 0, //
      };
    });
    resolve(result);
  });
}

/**
 * 查询设备列表
 * @returns Array
 */
export async function getDevices() {
  // eslint-disable-next-line no-console
  console.log('请求设备列表');
  await delay();
  return await new Promise((resolve) => {
    resolve(
      devices.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    );
  });
}
