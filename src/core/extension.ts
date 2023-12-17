import type { Graph, Node, Cell } from '@antv/x6';
import min from 'lodash/min';
import max from 'lodash/max';
import mean from 'lodash/mean';
import sortBy from 'lodash/sortBy';

/**
 * 设置节点位置(同时调整子节点位置)
 */
export function setPositionDeep(
  graph: Graph,
  node: Node,
  x: number,
  y: number,
) {
  const { x: preX, y: preY } = node.getPosition();
  const changeX = x - preX;
  const changeY = y - preY;

  node.setPosition(x, y);
  const childrens = node.getChildren();
  if (Array.isArray(childrens) && childrens.length > 0) {
    childrens.forEach((child)=>{
      if (child.isNode()) {
        const childPosition = child.getPosition();
        setPositionDeep(graph, child, childPosition.x + changeX, childPosition.y + changeY);
      }
    });
  }
}

/**
 * 设置水平对齐
 * @param graph graph 实例
 * @param alignment 水平对齐方式
 */
export function setHorizontalAlignment(graph: Graph, alignment: 'left'|'right'|'center' = 'left') {
  const selections = graph.getSelectedCells();
  const nodes = selections?.filter((node) => node?.isNode()) as Node[];
  // 只处理同一层级的节点
  const alignNodes = nodes.filter(node=>node.parent === nodes[0].parent);
  const arrPositionX = alignNodes.map(node=> node.getPosition().x);
  let newPosition:number | undefined;
  switch (alignment) {
    case 'left':
      newPosition = min(arrPositionX);
      break;
    case 'center':
      newPosition = mean(arrPositionX);
      break;
    case 'right':
      newPosition = max(arrPositionX);
      break;
    default:
      newPosition = undefined;
      break;
  }
  if (newPosition !== undefined) {
    graph.batchUpdate(()=>{
      alignNodes.forEach((node: Node) => {
        const { y } = node.getPosition();
        setPositionDeep(graph, node, newPosition as number, y);
      });
    });
  }
}

/**
 * 设置垂直对齐
 * @param graph graph 实例
 * @param alignment 垂直对齐方式
 */
export function setVerticalAlignment(graph: Graph, alignment: 'top'|'middle'|'bottom' = 'top') {
  const selections = graph.getSelectedCells();
  const nodes = selections?.filter((node) => node?.isNode()) as Node[];
  // 只处理同一层级的节点
  const alignNodes = nodes.filter(node=>node.parent === nodes[0].parent);
  const arrPositionY = alignNodes.map(node=> node.getPosition().y);
  let newPosition: number|undefined;
  switch (alignment) {
    case 'top':
      newPosition = min(arrPositionY);
      break;
    case 'middle':
      newPosition = mean(arrPositionY);
      break;
    case 'bottom':
      newPosition = max(arrPositionY);
      break;
    default:
      newPosition = undefined;
      break;
  }
  if (newPosition !== undefined) {
    graph.batchUpdate(()=>{
      alignNodes.forEach((node) => {
        const { x } = node.getPosition();
        setPositionDeep(graph, node, x, newPosition as number);
      });
    });
  }
}

/**
 * 置顶/置底
 * @param graph graph 实例
 * @param type 操作类型
 */
export function setZIndex(graph: Graph, type:'top'|'bottom' = 'top') {
  const cells = graph.getCells();
  const zIndexes = cells.map((cell) => cell.getZIndex());
  const selections = graph.getSelectedCells();
  graph.batchUpdate(()=>{
    if (type === 'top') {
      const maxZIndex = (max(zIndexes) || 0) + 1;
      selections.forEach((cell) => cell.setZIndex(maxZIndex));
    } else if (type === 'bottom') {
      const minZIndex = (min(zIndexes) || 0) - 1;
      selections.forEach((cell) => cell.setZIndex(minZIndex));
    }
  });
}

/**
 * 设置 zIndex 值
 * @param cell 要设置的节点
 * @param zIndex 值
 * @param deep 是否递归设置子节点
 */
export function setZIndexTo(cell: Cell, zIndex:number, deep = true) {
  cell.setZIndex(zIndex);
  if (deep) {
    const childrens = cell.getChildren();
    childrens?.forEach(children=>{
      setZIndexTo(children, zIndex + 1, true);
    });
  }
}

/**
 * 横向均分
 * @param graph
 */
export function setHorizontalSplit(graph: Graph) {
  const selections =  graph.getSelectedCells();
  const nodes = selections?.filter((node) => node?.isNode()) as Node[];
  // 只处理同一层级的节点
  const splitNodes = nodes.filter(node=>node.parent === nodes[0].parent);
  if (splitNodes.length === 0) {
    return;
  }
  const sortedNodes = sortBy(splitNodes, (item)=> {
    const position = item.getPosition();
    return position.x;
  });
  // 得到结尾的x坐标
  const reduceInfo = sortedNodes.reduce(
    (redu, node) => {
      const { x } = node.position();
      const { width } = node.size();
      const endX = x + width;
      // 计算选择区域的总宽度
      if (redu.maxEndX < endX) {
        redu.maxEndX = endX;
      }
      // 汇总节点宽度总合
      redu.sumNodeWidth += width;
      return redu;
    },
    { maxEndX: 0, sumNodeWidth: 0 }
  );
  const startX = sortedNodes[0].position().x;
  // 用选择区域的总宽度减去每个节点的宽度得到可分配的宽度
  const spaceWidth = reduceInfo.maxEndX - startX - reduceInfo.sumNodeWidth;
  // 得到单个可分配的宽度
  const spaceStepWidth = Math.ceil(spaceWidth / (sortedNodes.length - 1));
  graph.batchUpdate(()=>{
    sortedNodes.forEach((node: Node, index) => {
      const { y, x } = node.position();
      if (index === 0) {
        setPositionDeep(graph, node, x, y);
      } else {
        // 上一个的 x坐标+自身的宽度+单个可分配的宽度
        const prevNode = sortedNodes[index - 1];
        const { x: prevX } = prevNode.position();
        const { width: prevWidth } = prevNode.size();
        setPositionDeep(graph, node, prevX + prevWidth + spaceStepWidth, y);
      }
    });
  });
}

/**
 * 纵向均分
 * @param graph
 */
export function setVerticalSplit(graph: Graph) {
  const selections =  graph.getSelectedCells();
  const nodes = selections?.filter((node) => node?.isNode()) as Node[];
  // 只处理同一层级的节点
  const splitNodes = nodes.filter(node=>node.parent === nodes[0].parent);
  if (splitNodes.length === 0) {
    return;
  }
  const sortedNodes = sortBy(splitNodes, (item)=> {
    const position = item.position();
    return position.y;
  });
  // 得到结尾的x坐标
  const reduceInfo = sortedNodes.reduce(
    (redu, node) => {
      const { y } = node.position();
      const { height } = node.size();
      const endY = y + height;
      // 计算选择区域的总高度
      if (redu.maxEndY < endY) {
        redu.maxEndY = endY;
      }
      // 汇总节点高度总合
      redu.sumNodeHeight += height;
      return redu;
    },
    { maxEndY: 0, sumNodeHeight: 0 }
  );
  const startY = sortedNodes[0].position().y;
  // 用选择区域的总高度减去每个节点的高度得到可分配的高度
  const spaceHeight =
    reduceInfo.maxEndY - startY - reduceInfo.sumNodeHeight;
  // 得到单个可分配的宽度
  const spaceStepHeight = Math.ceil(spaceHeight / (sortedNodes.length - 1));
  graph.batchUpdate(()=>{
    sortedNodes.forEach((node, index) => {
      const { y, x } = node.position();
      if (index === 0) {
        setPositionDeep(graph, node, x, y);
      } else {
      // 上一个的 x坐标+自身的宽度+单个可分配的宽度
        const prevNode = sortedNodes[index - 1];
        const { y: prevY } = prevNode.position();
        const { height: prevHeight } = prevNode.size();
        setPositionDeep(graph, node, x, prevY + prevHeight + spaceStepHeight);
      }
    });
  });
}
