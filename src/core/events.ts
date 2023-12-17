import { EVENT_MAP, GRAPH_ZOOM } from "@/constants/index";
import eventBus from "@/utils/event-bus";
import { getSelectedParentCells } from "@/utils/index";
import type { Graph, Node } from "@antv/x6";
import { setPositionDeep, setZIndexTo } from "./extension";

// 控制连接桩显示/隐藏
function togglePortsVisible(container: any, show: boolean) {
  const ports = container.querySelectorAll(".x6-port-body");
  for (let i = 0, len = ports.length; i < len; i += 1) {
    ports[i].style.visibility = show ? "visible" : "hidden";
  }
}

/**
 * 绑定键盘快捷键
 */
export function bindKeyboardEvent(graph: Graph) {
  // 复制
  graph.bindKey(["meta+c", "ctrl+c"], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells, { deep: true });
    }
    return false;
  });

  // 剪切
  graph.bindKey(["meta+x", "ctrl+x"], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells, { deep: true });
    }
    return false;
  });

  // 粘贴
  graph.bindKey(["meta+v", "ctrl+v"], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  });

  // 撤销
  graph.bindKey(["meta+z", "ctrl+z"], () => {
    if (graph.canUndo()) {
      graph.undo();
    }
    return false;
  });

  // 重做
  graph.bindKey(["meta+shift+z", "ctrl+shift+z"], () => {
    if (graph.canRedo()) {
      graph.redo();
    }
    return false;
  });

  // 全选
  graph.bindKey(["meta+a", "ctrl+a"], (e) => {
    e.preventDefault();
    const cells = graph.getCells();
    if (cells) {
      graph.select(cells);
    }
  });

  // 删除
  graph.bindKey(["backspace", "delete"], (e) => {
    e.preventDefault();
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.removeCells(cells, { deep: true });
    }
  });

  // 上下左右快捷键调整位置
  graph.bindKey("left", (e) => {
    e.preventDefault();
    const operationCells = getSelectedParentCells(graph);
    graph.batchUpdate(() => {
      operationCells.forEach((item) => {
        const cell = item as Node;
        let { x, y } = cell.position();
        x -= 1;
        if (x <= 0) {
          x = 0;
        }
        setPositionDeep(graph, cell, x, y);
      });
    });
  });
  graph.bindKey("right", (e) => {
    e.preventDefault();
    const operationCells = getSelectedParentCells(graph);
    graph.batchUpdate(() => {
      operationCells.forEach((item) => {
        const cell = item as Node;
        let { x, y } = cell.position();
        const { width } = cell.size();
        x += 1;
        if (x + width >= 1920) x = 1920 - width;
        setPositionDeep(graph, cell, x, y);
      });
    });
  });
  graph.bindKey("up", (e) => {
    e.preventDefault();
    const operationCells = getSelectedParentCells(graph);
    graph.batchUpdate(() => {
      operationCells.forEach((item) => {
        const cell = item as Node;
        let { x, y } = cell.position();
        y -= 1;
        if (y <= 0) y = 0;
        setPositionDeep(graph, cell, x, y);
      });
    });
  });
  graph.bindKey("down", (e) => {
    e.preventDefault();
    const operationCells = getSelectedParentCells(graph);
    graph.batchUpdate(() => {
      operationCells.forEach((item) => {
        const cell = item as Node;
        let { x, y } = cell.position();
        const { height } = cell.size();
        y += 1;
        if (y + height >= 1080) y = 1080 - height;
        setPositionDeep(graph, cell, x, y);
      });
    });
  });
}

/**
 * 绑定画布事件
 */
export function bindGraphEvent(graph: Graph, container: HTMLElement) {
  const dispatchCellCount = () => {
    const cells = graph.getCells();
    eventBus.emit(EVENT_MAP.TOOLBAR_STATE_CHANGE, {
      selectAll: !cells?.length,
      export: !cells?.length,
    });
  };

  graph.on("cell:removed", (arg) => {
    eventBus.emit(EVENT_MAP.EDGE_SELECTED, null);
    eventBus.emit(EVENT_MAP.CELL_REMOVE, arg.cell);
    eventBus.emit(EVENT_MAP.ON_CHANGE, arg);
    dispatchCellCount();
  });

  graph.on("cell:change:*", (arg) => {
    if (arg.key !== "tools") {
      eventBus.emit(EVENT_MAP.ON_CHANGE, arg);
    }
  });

  graph.on("cell:added", (arg) => {
    eventBus.emit(EVENT_MAP.NODE_ADDED, arg);
    eventBus.emit(EVENT_MAP.NODE_SELECTED, arg.cell);
    eventBus.emit(EVENT_MAP.ON_CHANGE, arg);
    graph.resetSelection(arg.cell);
    dispatchCellCount();
  });

  graph.on("cell:click", ({ cell }) => {
    eventBus.emit(EVENT_MAP.NODE_SELECTED, cell);
  });

  graph.on("edge:mouseenter", ({ cell }) => {
    togglePortsVisible(container, true);
    cell.addTools([
      {
        name: "source-arrowhead",
        args: {
          // d: 'M5,0 A5,5 0 1,1 5,10 A5,5 0 1,1 5,0',
          "stroke-width": 1,
        },
      },
      {
        name: "target-arrowhead",
        args: {
          // d: 'M5,0 A5,5 0 1,1 5,10 A5,5 0 1,1 5,0',
          "stroke-width": 1,
        },
      },
      {
        name: "button-remove",
        args: {
          distance: 20,
        },
      },
      "vertices",
      "segments",
    ]);
  });
  graph.on("edge:mouseleave", ({ cell }) => {
    togglePortsVisible(container, false);
    cell.removeTools();
  });

  graph.on("node:mouseenter", ({ cell }) => {
    cell.addTools([
      {
        name: "button-remove",
        args: {
          x: -4,
          y: -4,
        },
      },
    ]);
    togglePortsVisible(container, true);
  });
  graph.on("node:mouseleave", ({ cell }) => {
    cell.removeTools();
    togglePortsVisible(container, false);
  });

  graph.on("node:move", () =>
    eventBus.emit(EVENT_MAP.NODE_TRANSFORM_CHANGE, true)
  );

  graph.on("node:moved", () =>
    eventBus.emit(EVENT_MAP.NODE_TRANSFORM_CHANGE, false)
  );

  graph.on("node:resize", () =>
    eventBus.emit(EVENT_MAP.NODE_TRANSFORM_CHANGE, true)
  );

  graph.on("node:resized", () =>
    eventBus.emit(EVENT_MAP.NODE_TRANSFORM_CHANGE, false)
  );

  graph.on("node:rotate", () =>
    eventBus.emit(EVENT_MAP.NODE_TRANSFORM_CHANGE, true)
  );

  graph.on("node:rotated", () =>
    eventBus.emit(EVENT_MAP.NODE_TRANSFORM_CHANGE, false)
  );

  // 嵌套时，如果被拖拽元素层级低于容器，则将节点层级提升至容器上
  graph.on("node:embedded", ({ node, currentParent }) => {
    if (currentParent === null) {
      return;
    }
    if (
      node.zIndex &&
      currentParent.zIndex &&
      currentParent.zIndex >= node.zIndex
    ) {
      setZIndexTo(node, currentParent.zIndex + 1, true);
    }
  });

  graph.on("edge:selected", ({ edge, cell }) => {
    eventBus.emit(EVENT_MAP.EDGE_SELECTED, cell);
    if (edge.hasTool("vertices")) {
      return;
    }
    edge.addTools({
      name: "vertices",
      args: {
        attrs: { fill: "#8f8f8f" },
      },
    });
  });

  graph.on("edge:unselected", ({ edge }) => {
    eventBus.emit(EVENT_MAP.EDGE_SELECTED, null);
    if (!edge.hasTool("vertices")) {
      return;
    }
    edge.removeTool("vertices");
  });

  graph.on("blank:click", () => {
    eventBus.emit(EVENT_MAP.NODE_SELECTED);
  });

  graph.on("scale", () => {
    const zoom = graph.zoom();
    eventBus.emit(EVENT_MAP.TOOLBAR_STATE_CHANGE, {
      zoomIn: zoom >= GRAPH_ZOOM.max,
      zoomOut: zoom <= GRAPH_ZOOM.min,
    });
    eventBus.emit(EVENT_MAP.ZOOM_CHANGE, zoom);
  });

  graph.on("history:change", () => {
    eventBus.emit(EVENT_MAP.TOOLBAR_STATE_CHANGE, {
      undo: !graph.canUndo(),
      redo: !graph.canRedo(),
    });
  });

  graph.on("selection:changed", ({ selected }) => {
    const flag = !selected?.length;
    const nodes = selected?.filter((item) => item.isNode()) ?? [];
    eventBus.emit(EVENT_MAP.TOOLBAR_STATE_CHANGE, {
      delete: flag,
      setTop: flag,
      setBottom: flag,
      align: nodes.length < 2,
      cut: flag,
      copy: flag,
    });
  });

  graph.on("clipboard:changed", ({ cells }) => {
    eventBus.emit(EVENT_MAP.TOOLBAR_STATE_CHANGE, {
      paste: !cells.length,
    });
  });
}
