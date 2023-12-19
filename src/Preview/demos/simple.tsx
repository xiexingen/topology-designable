import React, { useEffect, useRef } from 'react';
import { useSetState } from 'ahooks';
import { Preview } from 'topology-designable';
import iconMap from '../../assets-demo/icon-map';

export default () => {
  const editorRef = useRef()
  const [state,setState] = useSetState({
    value: undefined,
  })

  useEffect(()=>{
    const dashboardData = require('../../assets-demo/dashboard.json');
    setState({
      value: dashboardData['graph']
    })
  },[ ])

  return (
    <Preview
      ref={editorRef as any}
      style={{ height: '100vh' }}
      value={state.value}
      iconMap={iconMap}
    />
  );
};
