export namespace Topology {
  /**
   * 连接线
   */
  export type Line = {
    router: string;
    connector?: string;
    source?: {
      nodeId: string;
      port: string;
    };
    target?: {
      nodeId: string;
      port: string;
    };
  };
  /**
   * 节点
   */
  export type Node = {
    /**
     * 唯一标识Id
     */
    id: string;
    /**
     * 业务名称(一般对应业务，如: PC、WebApplication)
     */
    label?: string;
    /**
     * 使用的基础组件
     */
    component: string;
    /**
     * 资产展示态
     */
    icon?: string;
    /**
     * 是否允许作为父容器
     */
    embeddable?: boolean;
    size: {
      width: number;
      height: number;
    };
    /**
     * 透传给基础组件的属性定义
     */
    componentProps?: any;
    /**
     * 跨行
     */
    rowSpan?: number;
    /**
     * 跨列
     */
    columnSpan?: number;
  };
  export type SnippetNode = {
    /**
     * 唯一标识Id
     */
    id: string;
    /**
     * 所属父节点Id
     */
    parent?: string;
    /**
     * 使用的基础组件
     */
    component: string;
    /**
     * 是否允许作为父容器
     */
    embeddable?: boolean;
    size: {
      width: number;
      height: number;
    };
    position?: {
      x: number;
      y: number;
    };
    relative?: boolean;
    /**
     * 透传给基础组件的属性定义
     */
    componentProps: any;
  };
  export type SnippetEdge = {
    source: {
      cell: string;
      port?: string;
    };
    target: {
      cell: string;
      port?: string;
    };
  };
  /**
   * 资产定义
   */
  type Material = {
    name: string;
    /**
     * 展示的分组名称(为空则不以组的形式展示)
     */
    label: string;
    items: Array<Node>;
  };
  export type Materials = Array<Material>;
  /**
   * 拓扑图结构
   */
  export type Graph = {
    /**
     * 拓扑图的唯一标识
     */
    id: string;
    /**
     * 用来区别是第几张图(1:技防图、2:资产分布图、3:资产拓扑图)
     */
    type: number;
    /**
     * 存储画板尺寸
     */
    size: {
      /**
       * 画板实际宽度
       */
      width: string;
      /**
       * 画板实际高度
       */
      height: string;
    };
    /**
     * 版本号
     */
    version?: string;
    /**
     * 描述
     */
    description?: string;
    /**
     * 缩略图
     */
    thumb: string;
    /**
     * 存储 x6 的数据结构
     */
    graph: any;
    [key: string]: any;
  };

  export type PropSchema = {
    [key: string]: any;
  };
  export type Size= {
    height:number;
    width:number;
  }
}
