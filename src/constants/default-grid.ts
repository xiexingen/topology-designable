import type { GridManager } from '@antv/x6/lib/graph/grid';

const defaultGrid: Partial<GridManager.CommonOptions> & GridManager.DrawGridOptions = {
  visible: true,
  size: 4,
  type: 'doubleMesh',
  args: [
    {
      color: 'white', // 主网格线颜色
      thickness: 1, // 主网格线宽度
    },
    {
      color: '#ccc', // 次网格线颜色
      thickness: 1, // 次网格线宽度
      factor: 5, // 主次网格线间隔
    },
  ]
};


export default defaultGrid;
