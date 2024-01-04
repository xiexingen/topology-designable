import { useSetState } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import { Preview } from 'topology-designable';
import iconMap from '../../_assets/icon-map';

export default () => {
  const editorRef = useRef();
  const [state, setState] = useSetState({
    value: undefined,
  });

  useEffect(() => {
    const dashboardData = require('../../_assets/dashboard.json');
    setState({
      value: dashboardData['graph'],
    });
  }, []);

  return (
    <Preview
      ref={editorRef as any}
      style={{ height: 666 }}
      value={state.value}
      iconMap={iconMap}
    />
  );
};
