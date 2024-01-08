/**
 * description: 通过组件提供的 getImageData 和 getThumbData 可以获取 预览图 和 缩略图
 */
import { useSetState } from 'ahooks';
import { Button, Modal, Space } from 'antd';
import React, { useEffect, useRef } from 'react';
import { Editor, defaultPropsSchema } from 'topology-designable';
import iconMap from '../../_assets/icon-map';
import { dashboard as dashboardMaterials } from '../../_assets/materials';

export default () => {
  const editorRef = useRef();
  const [state, setState] = useSetState({
    size: {
      height: 666,
      width: 1888,
    },
    materials: dashboardMaterials,
    value: undefined,
  });

  // 模拟加载后端接口数据
  useEffect(() => {
    const dashboardData = require('../../_assets/data/dashboard.json');
    setState({
      value: dashboardData['graph'],
    });
  }, []);

  const handlePreview = async () => {
    const editorInstance = editorRef.current as unknown as Editor;
    const imageData = await editorInstance.getImageData();
    Modal.info({
      title: '预览',
      centered: true,
      maskClosable: true,
      styles: {
        content: {
          width: state.size.width,
          height: state.size.height,
          overflow: 'auto',
        },
      },
      content: (
        <img
          src={imageData}
          alt="preview"
          style={{ width: '100%', height: '100%' }}
        />
      ),
      footer: null,
    });
  };

  const handlePreviewThumb = async () => {
    const editorInstance = editorRef.current as unknown as Editor;
    const imageData = await editorInstance.getThumbData(400, 200);
    Modal.info({
      title: '缩略图',
      centered: true,
      maskClosable: true,
      content: (
        <img
          src={imageData}
          alt="preview"
          style={{ width: '100%', height: '100%' }}
        />
      ),
      footer: null,
    });
  };

  return (
    <>
      <Space style={{ padding: '8px 0' }}>
        <Button onClick={handlePreview}>查看预览图</Button>
        <Button onClick={handlePreviewThumb}>查看缩略图</Button>
      </Space>
      <Editor
        ref={editorRef as any}
        style={{ height: 800 }}
        materials={state.materials}
        value={state.value}
        iconMap={iconMap}
        // propsPanelComponents={{}}
        propsPanelSchemaMap={defaultPropsSchema}
        size={state.size}
      />
    </>
  );
};
