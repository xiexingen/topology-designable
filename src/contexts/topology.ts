import type { Topology } from '@/types/global.d';
import { Graph } from '@antv/x6';
import { createContext } from 'react';

interface ITopologyContext {
  graph?: Graph,
  iconMap?: Record<string, Topology.TopologyIconProp>
}

export default createContext<ITopologyContext>({

})