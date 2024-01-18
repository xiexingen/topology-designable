import { Graph } from '@antv/x6';
import { createContext } from 'react';
import EventBus from '@/utils/event-bus';

interface ITopologyContext {
    graph: Graph;
    iconMap: Record<string, Topology.TopologyIconProp>;
    eventBus: EventBus;
}

export default createContext<Partial<ITopologyContext>>({});
