import type { Graph } from "@antv/x6";

/**
 * 获取选中的父节点
 * @param graph
 * @returns 选中的父节点
 */
export function getSelectedParentCells(graph: Graph) {
  const selectedCells = graph.getSelectedCells();
  // TODO 需要考虑多层嵌套的情况
  const operationCells = selectedCells.filter((item) => {
    const parentId = item.getParentId();
    // 如果父节点在选中节点中，则忽略
    if (parentId) {
      return selectedCells.findIndex((cell) => cell.id === parentId) === -1;
    }
    return true;
  });
  return operationCells;
}

/**
 * 合并对象(如果 option 为 true，则直接返回 defaultOption，否则使用 option 去合并 defaultOption)
 * @param option 传入的对象
 * @param defaultOption 默认对象
 * @returns T
 */
export function getMergeOption<T>(option: true | Partial<T>,defaultOption:T) {
  if(typeof option === 'boolean'){
    return defaultOption
  }
  return {
    ...defaultOption,
    ...option,
  }
}
