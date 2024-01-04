import type { Graph } from '@antv/x6';
import { useRequest, useSetState } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import { Preview } from 'topology-designable';
import iconMap from '../../_assets/icon-map';
import { DeviceStatus, getDeviceStatus } from '../../_assets/mock';
import ContainerNode from './components/container-node';
import InnerNode from './components/inner-node';

function getGraphCellModelData(graphCell, deviceMap) {
  const { componentProps } = graphCell.getData() || {};
  const cellData = {
    componentData: {},
    containerRender: null as unknown,
    innerRender: null as unknown,
  };
  const deviceId = componentProps?.device.id;
  const deviceData = deviceId && deviceMap[deviceId];
  if (deviceData && graphCell.shape === 'topology-device') {
    // 自定义渲染的数据，会跟节点配置属性一并传给下面两个方法
    cellData.componentData = deviceData;
    // 节点的容器，用于业务自定义渲染，device 节点会渲染该组件,接受两个参数 节点的属性配置 节点的数据(如果有)
    cellData.containerRender = (prop, data) => (
      <ContainerNode prop={prop} data={data} />
    );
    // 节点的内层图标，用于业务自定义渲染，device 节点会渲染该组件(如果有)
    cellData.innerRender = (prop, data) => (
      <InnerNode prop={prop} data={data} />
    );
  }
  return cellData;
}

function arrayToObject(array) {
  return array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
}

export default () => {
  const editorRef = useRef<Preview>();
  const [state, setState] = useSetState({
    value: undefined,
  });

  const updateGraphDevices = (deviceStatus) => {
    // 过滤出所有的 节点
    const graphInstance = editorRef.current?.getInstance() as Graph;
    const fullDeviceNode = graphInstance.getCells()?.filter((item) => {
      return (
        item.isNode() &&
        (item.shape === 'topology-device' || item.shape === 'topology-downlink')
      );
    });
    const deviceMap = arrayToObject(deviceStatus);
    fullDeviceNode?.forEach((cell) => {
      const { componentProps } = cell.getData() || {};
      const cellModelData = getGraphCellModelData(cell, deviceMap);
      // 查询该节点出去的连线
      const outLedges = graphInstance.getConnectedEdges(cell, {
        incoming: false,
        outgoing: true,
        deep: false,
        enclosed: false,
        indirect: false,
      });

      const deviceId = componentProps?.device?.id;
      // 离线节点的出节点标记红色
      outLedges?.forEach((edge) => {
        const isOffline = deviceMap[deviceId]?.status === DeviceStatus.offline;
        edge.setAttrByPath(
          'line/stroke',
          isOffline ? '#E62E2E' : 'var(--topology-editor-border-color)',
        );
        edge.setAttrByPath('line/stroke-width', isOffline ? 2 : 1);
      });
      // 跟已有的配置进行合并
      cell.updateData({
        model: cellModelData,
      });
    });
  };

  useEffect(() => {
    const dashboardData = require('../../_assets/dashboard.json');
    setState({
      value: dashboardData['graph'],
    });
  }, []);

  useRequest(getDeviceStatus, {
    onSuccess: (devicesStatus) => {
      updateGraphDevices(devicesStatus);
    },
  });

  return (
    <Preview
      ref={editorRef}
      style={{ height: '100vh' }}
      value={state.value}
      iconMap={iconMap}
    />
  );
};
