import { Graph } from '@antv/x6';
import registerShapes from '../components/shapes/index';
import { PORTS_OFFSET } from '../constants/index';

/**
 * 注册链接桩自定义布局
 */
const registerPortsLayout = () => {
  Graph.registerPortLayout(
    'top',
    (args, el) => {
      return [
        {
          position: {
            x: el.width / 2,
            y: -PORTS_OFFSET,
          },
        },
      ];
    },
    true
  );
  Graph.registerPortLayout(
    'bottom',
    (args, el) => {
      return [
        {
          position: {
            x: el.width / 2,
            y: el.height + PORTS_OFFSET,
          },
        },
      ];
    },
    true
  );
  Graph.registerPortLayout(
    'left',
    (args, el) => {
      return [
        {
          position: {
            x: -PORTS_OFFSET,
            y: el.height / 2,
          },
        },
      ];
    },
    true
  );
  Graph.registerPortLayout(
    'right',
    (args, el) => {
      return [
        {
          position: {
            x: el.width + PORTS_OFFSET,
            y: el.height / 2,
          },
        },
      ];
    },
    true
  );
};

// /**
//  * 注册自定义箭头
//  */
// const registerMarker = () => {
//   Graph.registerMarker(
//     'custom-marker',
//     () => {
//       return {
//         tagName: 'circle',
//         fill: '#FFFFFF',
//         strokeWidth: 1,
//         r: 4,
//       };
//     },
//     true
//   );
// };

/**
 * 注册自定义节点  连接器  布局  网格
 */
const registerDependency = () => {
  // registerMarker();
  registerPortsLayout();
  registerShapes();
};

export default registerDependency;
