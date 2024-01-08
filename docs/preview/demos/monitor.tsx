/**
 * title: 实现一个实时监控大屏
 * description: 我们可以查看设备实时状态，可以对某些设备点击右键进行操作(演示可以自定义对节点进行扩展)
 */

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
    componentData: null,
    containerRender: null as unknown,
    innerRender: null as unknown,
  };
  const deviceId = componentProps?.device;
  const deviceData = deviceId && deviceMap[deviceId];
  if (deviceData && graphCell.shape === 'topology-device') {
    // 自定义渲染的数据，会跟节点配置属性一并传给下面两个方法
    cellData.componentData = deviceData;
    // 节点的容器，用于业务自定义渲染，device 节点会渲染该组件,接受两个参数 节点的属性配置 节点的数据(如果有)
    cellData.containerRender = ({ componentData, componentProps }) => (
      <ContainerNode prop={componentProps} data={componentData} />
    );
    // 节点的内层图标，用于业务自定义渲染，device 节点会渲染该组件(如果有)
    cellData.innerRender = ({ componentData, componentProps }) => (
      <InnerNode prop={componentProps} data={componentData} />
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

      const deviceId = componentProps?.device;
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
      cell.updateData(cellModelData);
    });
  };

  useEffect(() => {
    const dashboardData = require('../../_assets/data/dashboard.json');
    setState({
      value: dashboardData['graph'],
    });
  }, []);

  useRequest(getDeviceStatus, {
    pollingInterval: 15000,
    onSuccess: (devicesStatus) => {
      updateGraphDevices(devicesStatus);
    },
  });

  return (
    <Preview
      ref={editorRef}
      style={{ height: 666 }}
      value={state.value}
      iconMap={iconMap}
    />
  );
};
