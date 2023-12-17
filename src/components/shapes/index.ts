import { register } from '@antv/x6-react-shape';

import TopologyCircle from './topology-circle';
import TopologyRect from './topology-rect';
import TopologyLabel from './topology-label';
import TopologyLine from './topology-line';
import TopologyLightning from './topology-lightning';
import TopologyDevice from './topology-device';
import TopologyDownlink from './topology-downlink';
import TopologySnippet from './topology-snippet';

export default function () {
  // 注册圆形
  register({
    shape: 'topology-circle',
    effect:['data'],
    component: TopologyCircle,
  });
  // 注册正方形
  register({
    shape: 'topology-rect',
    effect:['data'],
    component: TopologyRect,
  });
  // 注册文本组件
  register({
    shape: 'topology-label',
    effect:['data'],
    component: TopologyLabel,
  });
  // 注册基础线条
  register({
    shape: 'topology-line',
    effect:['data'],
    component: TopologyLine,
  });
  // 注册闪电组件
  register({
    shape: 'topology-lightning',
    effect:['data'],
    component: TopologyLightning,
  });
  // 注册设备组件
  register({
    shape: 'topology-device',
    effect: ['data'],
    component: TopologyDevice,
  });
  // 注册下钻组件
  register({
    shape: 'topology-downlink',
    effect:['data'],
    component: TopologyDownlink,
  });
  // 注册片段组件
  register({
    shape: 'topology-snippet',
    effect:['data'],
    component: TopologySnippet,
  });
}
