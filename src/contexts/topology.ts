import { Graph } from '@antv/x6';
import { createContext } from 'react';

interface ITopologyContext {
  graph?: Graph,
  iconMap?: Record<string, React.FunctionComponent>
}

export default createContext<ITopologyContext>({

})
