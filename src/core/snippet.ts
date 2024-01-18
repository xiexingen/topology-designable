import type { Edge, Graph, Node } from '@antv/x6';
import defaultPorts from '../constants/default-ports';

export type TSnippetOption = {
    graph: Graph;
    snippetNode: Node;
};

/**
 * 根据配置项创建代码片段
 * @param position
 */
function createSnippet(option: TSnippetOption) {
    const { graph, snippetNode } = option;
    const nodeData = snippetNode.getData();
    const { children: snippetProps } = nodeData.componentProps;
    const position = snippetNode.getPosition();
    const size = snippetNode.getSize();
    const containerParentNode = snippetNode.getParent();
    graph.removeNode(snippetNode, { disconnectEdges: true, dryrun: true });
    // 查找配置的父层容器
    const containerOption: Topology.SnippetNode = snippetProps.nodes.find(
        (item: any) => !item.parent,
    );
    const containerNode: Node = graph.addNode({
        shape: containerOption.component,
        embeddable: containerOption.embeddable,
        data: {
            componentProps: containerOption.componentProps,
        },
        position,
        size: size,
        ports: defaultPorts,
    });
    // 存储配置的id跟添加到画板中的节点Id的映射(配置连接线的时候需要使用)
    const idMap: Record<string, Node> = {};
    // 添加子节点
    const childNodes: Topology.SnippetNode[] = snippetProps.nodes.filter(
        (item: any) => item.parent,
    );
    const containerZindex = containerNode.getZIndex() ?? 1;
    childNodes.forEach((item) => {
        const itemPosition = item.position;
        // 如果是相对位置则加上父节点的位置
        if (item.relative !== false && itemPosition) {
            itemPosition.x = itemPosition.x + position.x;
            itemPosition.y = itemPosition.y + position.y;
        }
        const newNode = graph.createNode({
            position: itemPosition,
            shape: item.component,
            data: {
                componentProps: item.componentProps,
            },
            size: item.size,
            zIndex: containerZindex + 1,
            ports: defaultPorts,
        });
        containerNode.addChild(newNode);
        idMap[item.id] = newNode;
    });

    if (containerParentNode) {
        containerParentNode.addChild(containerNode);
    }
    // 添加连线
    const edges: Edge.Metadata[] = snippetProps.edges?.map(
        (edgeConfig: any) => {
            const sourceCell = idMap[edgeConfig.source.cell];
            const targetCell = idMap[edgeConfig.target.cell];
            const [sourceCellPort] = sourceCell.getPortsByGroup(
                edgeConfig.source.port,
            );
            const [targetCellPort] = targetCell.getPortsByGroup(
                edgeConfig.target.port,
            );
            return {
                attrs: {
                    line: {
                        stroke: 'var(--topology-editor-border-color)',
                        strokeWidth: 1,
                        targetMarker: null,
                        sourceMarker: null,
                    },
                },
                router: 'normal',
                connector: 'rounded',
                ...edgeConfig,
                source: {
                    cell: sourceCell,
                    port: sourceCellPort?.id,
                },
                target: {
                    cell: targetCell,
                    port: targetCellPort?.id,
                },
            };
        },
    );
    if (Array.isArray(edges) && edges.length > 0) {
        graph.addEdges(edges);
    }
}

export default createSnippet;
