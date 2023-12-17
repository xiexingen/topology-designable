import type { CollapseProps } from 'antd'
import type { Node } from '@antv/x6'
import type { Topology } from '@/types/global.d';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dnd } from '@antv/x6-plugin-dnd';
import { Collapse, Input } from 'antd';
import { EVENT_MAP, TOPOLOGY_SNIPPET } from '@/constants/index';
import defaultPorts from '@/constants/default-ports';
import TopologyContext from '@/contexts/topology'
import createSnippet from '@/core/snippet';
import eventBus from '@/utils/event-bus';
import MaterialNode from './material-node'

interface IMaterialPanelProps {
  filterable?: boolean;
  iconMap: { [key: string]: any };
  materials: Topology.Materials
}

/**
 * 获取 以组+id为key，以配置项为值的物料映射
 * @param materials 物料配置数组
 * @returns
 */
function getMaterialMap(materials: Topology.Materials) {
  const result: Record<string, Topology.Node> = {};
  materials?.forEach(group => {
    const prefix = group.name ? `${group.name}-` : '';
    group.items.forEach(material => {
      const key = `${prefix}${material.id}`;
      result[key] = material;
    });
  });
  return result;
}

const MaterialPanel: React.FC<IMaterialPanelProps> = (props) => {
  // 物料面板元素 ref
  const sideBarRef = useRef<HTMLDivElement>(null);
  // dnd 实例 ref
  const dndRef = useRef<Dnd>();
  // 存储是否有组
  const [hasGroup, setHasGroup] = useState(true);
  // 默认打开的面板
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  // 展示的物料
  const [materials, setMaterials] = useState(props.materials);
  // material id - 配置映射
  const [materialMap, setMaterialMap] = useState<Record<string, Topology.Node>>({});

  const { graph } = useContext(TopologyContext);

  // 初始化物料侧边栏
  const initSideBar = () => {
    if (!sideBarRef.current) {
      throw Error('物料面板不存在');
    }
    if (!graph) {
      throw Error('graph尚未初始化完成');
    }
    dndRef.current = new Dnd({
      target: graph,
      scaled: false,
      dndContainer: sideBarRef.current,
      // getDragNode(node) {
      //   return graph.value.createNode(node);
      // },
      // getDropNode: (node) => {
      //   return node.clone();
      // },
    });
  }

  /**
   * 针对代码片段的处理逻辑
   */
  const onNodeAdded = async (arg: any) => {
    if (!graph) {
      return;
    }
    if (arg.cell.shape !== TOPOLOGY_SNIPPET) {
      return;
    }
    // 解决往容器节点中拖入片段节点时重复创建节点的问题
    if (arg.options.ui) {
      graph.removeNode(arg.cell, { disconnectEdges: true, dryrun: true });
      return;
    }
    // 解决往容器中拖拽获取不到 parent 的情况
    await new Promise((resolve) => {
      resolve(1)
    });
    // 创建拓扑图片段
    createSnippet({
      graph: graph,
      snippetNode: arg.cell,
    });
  }

  useEffect(() => {
    const hasGroupName = props.materials.some(item => item.name);
    // 是否有组
    setHasGroup(hasGroupName);
    // 默认打开的物料面板
    setActiveKeys(props.materials.map(item => item.name))
    // id - 配置映射
    const tempMaterialMap = getMaterialMap(props.materials);
    setMaterialMap(tempMaterialMap);
  }, [props.materials])

  useEffect(() => {
    eventBus.on(EVENT_MAP.NODE_ADDED, onNodeAdded);
    return () => {
      eventBus.on(EVENT_MAP.NODE_ADDED, onNodeAdded);
    }
  }, [])

  useEffect(()=>{
    if(graph){
      initSideBar();
    }
  },[graph])

  const handleStartDrag = (e: any) => {
    if (!graph) {
      throw Error('graph 尚未初始化')
    }
    if (!dndRef.current) {
      throw Error('dnd实例尚未初始化')
    }
    const target = e.currentTarget;
    const key = target.getAttribute('data-type');
    if (!key) {
      throw Error('拖拽节点尚未配置 data-key 属性');
    }
    const componentConfig = materialMap[key];
    const nodeConfig: Node.Metadata = {
      shape: componentConfig.component,
      size: componentConfig.size,
      ports: defaultPorts,
      embeddable: componentConfig.embeddable,
      data:{
        componentProps: componentConfig.componentProps,
      }
    };
    const node = graph.createNode(nodeConfig);
    dndRef.current.start(node, e);
  }


  const items: CollapseProps['items'] = materials.map(collapseGroup => {
    return {
      key: collapseGroup.name,
      label: collapseGroup.label,
      children: collapseGroup.items?.map(item => {
        return (
          <MaterialNode
            key={`${collapseGroup.name}-${item.id}`}
            icon={typeof item.icon === 'string' ? props.iconMap[item.icon] : item.icon}
            prefix={collapseGroup.name}
            material={item}
            onMouseDown={handleStartDrag}
          />
        )
      })
    }
  });

  const handleSearch = (value: string) => {
    const filterText = value || '';
    const filteredMaterials = props.materials.map(material => {
      return {
        ...material,
        items: material.items?.filter(item => {
          const label = item.label || item.componentProps?.label || '';
          return label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) !== -1;
        })
      };
    });
    setMaterials(filteredMaterials)
  }

  const handleChangeActiveKeys = (keys: string | string[]) => {
    if (typeof keys === 'string') {
      setActiveKeys([keys])
      return;
    }
    setActiveKeys(keys)
  }

  return (
    <div ref={sideBarRef} className="topology-designable-material-panel">
      {
        props.filterable && (
          <div className="search-container">
            <Input.Search
              placeholder="搜索"
              enterButton
              allowClear={true}
              onSearch={handleSearch}
            />
          </div>
        )
      }
      {
        hasGroup ? (
          <Collapse activeKey={activeKeys} onChange={handleChangeActiveKeys} items={items} />
        ) : (
          <div className="material-list">
            {
              props.materials[0].items.map(item => {
                return (
                  <MaterialNode
                    key={item.id}
                    icon={typeof item.icon === 'string' ? props.iconMap[item.icon] : item.icon}
                    material={item}
                    onMouseDown={handleStartDrag}
                  />
                )
              })
            }
          </div>
        )
      }
    </div>
  );
};

export default MaterialPanel
