import React, { useContext, useRef, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { Dropdown, Divider, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSetState } from 'ahooks'
import TopologyContext from '@/contexts/topology'
import Help from './help';
import { setHorizontalAlignment, setHorizontalSplit, setVerticalAlignment, setVerticalSplit, setZIndex } from '@/core/extension';
import { EVENT_MAP, GRAPH_ZOOM, ZOOM_OPTIONS } from '@/constants/index';
import { TOOLBAR_OPTIONS, TOOLBAR_ENUM } from '@/constants/toolbar';
import icons from './icons';
import Button from './button';


type ToolbarKeys = keyof typeof TOOLBAR_ENUM;

export type ToolbarProps = {
  toolbar?: boolean | Partial<{ [P in ToolbarKeys]: boolean }>
}

const zoomOptions = ZOOM_OPTIONS.map(item => ({ label: item.label, key: item.value }))
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const zooomRef = useRef(1)
  const { graph,eventBus } = useContext(TopologyContext);
  const [state, setState] = useSetState<{ [key: string]: boolean }>({
    undo: true,
    redo: true,
    delete: true,
    export: false,
    exportImage: true,
    exportJson: true,
    setTop: true,
    setBottom: true,
    align: true,
    contentSplit: true,
    verticalAlign: true,
    horizontalAlign: true,
    cut: true,
    copy: true,
    paste: true,
  })

  const zoomText = Math.floor(zooomRef.current * 100) + '%';

  const handleDeleteSelect = () => {
    const cells = graph?.getSelectedCells();
    if (!cells) {
      return;
    }
    graph?.removeCells(cells);
  };

  const handleImport = async () => {
    const options = {
      types: [
        {
          description: '拓扑图文件',
          accept: {
            'text/plain': ['.json'],
          },
        },
      ],
    };
    // @ts-ignore
    const [fileHandle] = await window.showOpenFilePicker(options);
    const file = await fileHandle.getFile();
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async (e) => {
      if (!e.target) {
        return;
      }
      if (!e.target.result) {
        return;
      }
      let blob;
      if (typeof e.target.result === 'object') {
        blob = new Blob([e.target.result]);
      } else {
        blob = e.target.result;
      }
      // @ts-ignore
      const json = await blob.text();
      const result = JSON.parse(json);
      eventBus?.emit(EVENT_MAP.ON_IMPORT, result);
    };
    return false;
  };

  const handleExport = async (type: string) => {
    eventBus?.emit(EVENT_MAP.ON_EXPORT, type, graph);
  };

  const handlePreview = () => {
    eventBus?.emit(EVENT_MAP.PREVIEW);
  };

  const handleCloseDrawer = () => {
    eventBus?.emit(EVENT_MAP.NODE_SELECTED);
  };

  const handleChangeZoom = (zoom: number,absolute=false) => {
    graph?.zoom(zoom, {
      minScale: GRAPH_ZOOM.min,
      maxScale: GRAPH_ZOOM.max,
      absolute,
    });
  };

  const handleMenuClick = (key: string) => {
    if (!graph) {
      return;
    }
    if (state[key]) {
      return;
    }
    switch (key) {
      case TOOLBAR_ENUM.zoomIn:
        handleChangeZoom(0.1);
        return;
      case TOOLBAR_ENUM.zoomOut:
        handleChangeZoom(-0.1);
        return;
      case TOOLBAR_ENUM.undo:
        if (graph.canUndo()) {
          graph.undo();
        }
        handleCloseDrawer();
        return;
      case TOOLBAR_ENUM.redo:
        if (graph.canRedo()) {
          graph.redo();
        }
        handleCloseDrawer();
        return;
      case TOOLBAR_ENUM.cut:
        graph?.cut(graph?.getSelectedCells() ?? []);
        return;
      case TOOLBAR_ENUM.copy:
        graph?.copy(graph?.getSelectedCells() ?? []);
        return;
      case TOOLBAR_ENUM.paste:
        graph?.paste();
        return;
      case TOOLBAR_ENUM.delete:
        handleDeleteSelect();
        handleCloseDrawer();
        return;
      case TOOLBAR_ENUM.drawCenter:
        graph?.center();
        return;
      case TOOLBAR_ENUM.setTop:
        setZIndex(graph, 'top');
        break;
      case TOOLBAR_ENUM.setBottom:
        setZIndex(graph, 'bottom');
        break;
      case TOOLBAR_ENUM.horizontalLeft:
        setHorizontalAlignment(graph, 'left');
        break;
      case TOOLBAR_ENUM.horizontalCenter:
        setHorizontalAlignment(graph, 'center');
        break;
      case TOOLBAR_ENUM.horizontalRight:
        setHorizontalAlignment(graph, 'right');
        break;
      case TOOLBAR_ENUM.verticalTop:
        setVerticalAlignment(graph, 'top');
        break;
      case TOOLBAR_ENUM.verticalCenter:
        setVerticalAlignment(graph, 'middle');
        break;
      case TOOLBAR_ENUM.verticalBottom:
        setVerticalAlignment(graph, 'bottom');
        break;
      case TOOLBAR_ENUM.horizontalSplit:
        setHorizontalSplit(graph);
        break;
      case TOOLBAR_ENUM.verticalSplit:
        setVerticalSplit(graph);
        break;
      case TOOLBAR_ENUM.import:
        handleImport();
        handleCloseDrawer();
        return;
      case TOOLBAR_ENUM.exportJson:
        handleExport('json');
        return;
      case TOOLBAR_ENUM.preview:
        handlePreview();
        return;
      case TOOLBAR_ENUM.exportImage:
        handleExport('image');
        return;
    }
  };

  function handleGraphZoomChange(zoom: number) {
    zooomRef.current = zoom;
  }

  function handleToolbarStateChange(sourceState: { [key: string]: boolean }) {
    setState({
      ...state,
      ...(sourceState ?? {}),
      horizontalAlign: sourceState.align,
      verticalAlign: sourceState.align,
      contentSplit: sourceState.align,
      exportJson: sourceState.export,
      exportImage: sourceState.export,
    })
  }

  const toolbarList = useMemo(() => {
    const result = TOOLBAR_OPTIONS.map((group) => {
      return [...group].map((item) => {
        return { ...item };
      });
    });
    if (props.toolbar === false) {
      return [];
    } else if (typeof props.toolbar === 'object') {
      result.forEach((group) => {
        return group.map((item) => {
          const propsToolbar = props?.toolbar ?? {} as any;
          const itemVisible = propsToolbar[item.key] as boolean;
          item.visible = itemVisible ?? item.visible;
          return item;
        });
      });
    }

    const filterResult: any[] = [];
    result.forEach((group) => {
      const subGroup = group.filter((item) => item.visible);
      if (subGroup.length > 0) {
        filterResult.push(subGroup);
      }
    });

    return filterResult;
  }, [props.toolbar]);

  useEffect(() => {
    eventBus?.on(EVENT_MAP.TOOLBAR_STATE_CHANGE, handleToolbarStateChange);
    eventBus?.on(EVENT_MAP.ZOOM_CHANGE, handleGraphZoomChange);
    return () => {
      eventBus?.off(EVENT_MAP.TOOLBAR_STATE_CHANGE, handleToolbarStateChange);
      eventBus?.off(EVENT_MAP.ZOOM_CHANGE, handleGraphZoomChange);
    }
  }, [])

  return (
    <div className='toolbar'>
      {
        toolbarList.map((group, groupIndex) => {
          return group.map((item: any, index: number) => {
            return (
              <React.Fragment key={item.key}>
                {
                  groupIndex !== 0 && index === 0 && <Divider key={`${groupIndex}-${index}`} type="vertical" />
                }
                {
                  item.key === TOOLBAR_ENUM.zoom ? (
                    <React.Fragment key={item.key}>
                      <div className='toolbar-item'>
                        <Button
                          disabled={state['zoomOut']}
                          icon={icons['zoomOut']}
                          tooltip="缩小"
                          onClick={() => handleMenuClick(TOOLBAR_ENUM.zoomOut)}
                        />
                      </div>
                      <span className="zoom-select">
                        <Dropdown
                          menu={{
                            items: zoomOptions,
                            onClick: (menu) => handleChangeZoom(Number(menu.key),true)
                          }}
                        >
                          <Space>
                            {zoomText}
                            <DownOutlined />
                          </Space>
                        </Dropdown>
                      </span>
                      <div className='toolbar-item'>
                        <Button
                          disabled={state['zoomIn']}
                          icon={icons['zoomIn']}
                          tooltip="放大"
                          onClick={() => handleMenuClick(TOOLBAR_ENUM.zoomIn)}
                        />
                      </div>
                    </React.Fragment>
                  ) : (
                    item.options ? (
                      <Dropdown
                        key={item.key}
                        placement="bottom"
                        menu={{
                          items: item.options,
                          onClick: (menu) => handleMenuClick(menu.key)
                        }}
                      >
                        <span>
                          <Button
                            disabled={state[item.key]}
                            icon={(icons as any)[item.icon]}
                            tooltip={item.label}
                          />
                        </span>
                      </Dropdown>
                    ) : (
                      <div
                        className={
                          classNames('toolbar-item', { 'disabled': state[item.key] })
                        }
                        key={item.key}
                        onClick={() => handleMenuClick(item.key)}
                      >
                        <Button
                          disabled={state[item.key]}
                          icon={(icons as any)[item.icon]}
                          tooltip={item.label}
                        />
                      </div>)
                  )
                }
              </React.Fragment>
            )
          })
        })
      }
      <div className="toolbar-item toolbar-help">
        <Help />
      </div>
    </div>
  )
};

Toolbar.defaultProps = {
  toolbar: true,
}

export default Toolbar
