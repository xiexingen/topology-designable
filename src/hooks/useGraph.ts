import { GRAPH_ZOOM } from "@/constants";
import defaultGrid from "@/constants/default-grid";
import { bindGraphEvent, bindKeyboardEvent } from "@/core/events";
import registerDependency from "@/core/register-dependency";
import type { PredefinePluginOption } from "@/core/register-plugins";
import registerPlugins from "@/core/register-plugins";
import EventBus from '@/utils/event-bus';
import type { Options } from "@antv/x6";
import { Graph, Shape } from "@antv/x6";
import { useEffect, useState } from "react";

export type GraphOptions = {
  graphOption: Partial<Omit<Options.Manual, "container">>;
  pluginOption?: PredefinePluginOption;
  keyBoardEvent?: boolean;
  graphEvent?: boolean;
};

export default (
  mountElement: React.MutableRefObject<HTMLElement> | null,
  eventBus: EventBus,
  option?: GraphOptions
) => {
  const [graphInstance,setGraphInstance] =useState<Graph>()

  useEffect(() => {
    registerDependency();
  }, []);

  useEffect(() => {
    if (!mountElement?.current) {
      return;
    }
    // 实例化
    const graph = new Graph({
      grid: defaultGrid,
      // 画布的最小最大缩放级别
      scaling: {
        ...GRAPH_ZOOM,
      },
      autoResize: true, //是否监听容器大小改变，并自动更新画布大小
      // moveThreshold: 2,
      background: {
        color: "#FFFFFF",
        opacity: 1,
        position: "center",
        repeat: "no-repeat",
        size: "100%",
        angle: 2,
        quality: 1,
      },
      // 分组
      embedding: {
        enabled: true,
        frontOnly: true,
        /** 只有有父节点标识的节点才能作为群组容器 */
        findParent({ node }) {
          const bbox = node.getBBox();
          const that= this as any;
          return that.getNodes().filter((node) => {
            const embeddable = node.getProp("embeddable");
            if (embeddable) {
              const targetBBox = node.getBBox();
              return bbox.isIntersectWithRect(targetBBox);
            }
            return false;
          });
        },
      },
      // 画板平移,跟 scroller 插件会冲突，只能存在一个
      // panning: {
      //   enabled: true,
      //   modifiers: ['ctrl', 'meta'],
      //   eventTypes: ['leftMouseDown'],
      // },
      translating: {
        restrict: true,
        // restrict(view) {
        //   if (view) {
        //     const cell = view.cell;
        //     if (cell.isNode()) {
        //       const parent = cell.getParent();
        //       if (parent) {
        //         return parent.getBBox();
        //       }
        //     }
        //   }
        //   return null;
        // },
      },
      // 缩放
      mousewheel: {
        enabled: true,
        global: true,
        zoomAtMousePosition: true,
        modifiers: ["ctrl", "meta"],
        minScale: GRAPH_ZOOM.min,
        maxScale: GRAPH_ZOOM.max,
        factor: 1.1,
      },
      connecting: {
        // snap: {
        //   radius: 40,
        // },
        allowBlank: true,
        allowNode: true,
        allowEdge: true,
        allowLoop: false,
        allowMulti: true, // 'withPort',
        connectionPoint: "anchor",
        // connectionPoint: {
        //   name: 'anchor',
        //   args: {
        //     sticky: true,
        //   },
        // },
        router: "orth",
        // connector: {
        //   name: 'rounded',
        //   args: {
        //     type: 'arc',
        //     // size: 4,
        //     radius: 8,
        //   },
        // },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                sourceMarker: null,
                targetMarker: null,
                stroke: "var(--topology-editor-border-color)",
                strokeWidth: 1,
              },
            },
            zIndex: 1,
            router: "normal",
            connector: {
              name: "rounded",
              args: {
                radius: 0,
              },
            },
          });
        },
        // validateConnection({ targetMagnet }) {
        //   return !!targetMagnet;
        // },
      },
      highlighting: {
        // 连接桩可以被连接时在连接桩外围围渲染一个包围框
        magnetAvailable: {
          name: "stroke",
          args: {
            attrs: {
              fill: "#fff",
              stroke: "#A4DEB1",
              strokeWidth: 4,
            },
          },
        },
        // 连接桩吸附连线时在连接桩外围围渲染一个包围框
        magnetAdsorbed: {
          name: "stroke",
          args: {
            attrs: {
              fill: "#fff",
              stroke: "#31d0c6",
              strokeWidth: 4,
            },
          },
        },
      },
      interacting: {
        nodeMovable: true,
        magnetConnectable: true,
        edgeMovable: true,
        edgeLabelMovable: true,
        arrowheadMovable: true,
        vertexMovable: true,
        vertexAddable: true,
        vertexDeletable: true,
      },
      async: true,
      virtual: true,
      ...option?.graphOption,
      container: mountElement.current,
    });
    // 注册插件
    registerPlugins(graph, option?.pluginOption);

    // 绑定快捷键
    if(option?.keyBoardEvent !== false){
      bindKeyboardEvent(graph);
    }

    // 绑定画布事件
    if(option?.graphEvent !== false){
      bindGraphEvent(graph, mountElement.current,eventBus);
    }
    setGraphInstance(graph)
  }, [mountElement]);

  return [graphInstance];
};
