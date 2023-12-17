import { Transform } from '@antv/x6-plugin-transform';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Scroller } from '@antv/x6-plugin-scroller';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';

export const TRANSFORM_OPTION: Transform.Options= {
  resizing: {
    enabled: true,
    orthogonal: true,
    restrict: true,
    allowReverse: false,
  },
  rotating: {
    enabled: true,
    grid: 5
  }
}

export const SELECTION_OPTION: Selection.Options= {
  enabled: true,
  // className: 'select-cell',
  rubberband: true,
  pointerEvents: 'none',
  movable: true,
  showNodeSelectionBox: true,
  showEdgeSelectionBox: true,
  // modifiers: 'ctrl'
}

export const SNAPLINE_OPTION: Snapline.Options= {
  enabled: true,
}

export const KEYBOARD_OPTION: Keyboard['options']= {
  enabled: true,
  global: true
}

export const CLIPBOARD_OPTION: Clipboard.Options= {
  enabled: true
}

export const HISTORY_OPTION: History.Options= {
  enabled: true,
  // ignoreChange: true,
  beforeAddCommand: (option, arg)=>{
    if (arg?.['key'] === 'tools') {
      return false;
    }
    return true;
  },
  // executeCommand: (cmd, revert, options)=>{
  //   console.log('executeCommand');
  //   console.log(cmd, revert, options);
  // }
}

export const SCROLLER_OPTION: Scroller.Options= {
  className: 'topology-designable-scoller',
  enabled: true,
  pageVisible: true,
  pageBreak: true,
  pannable: {
    enabled: true,
    eventTypes: ['leftMouseDown'],
  },
  autoResize: false,
  // width: 400,
  // height: 300,
  // pageWidth: 400,
  // pageHeight: 300,
  // minVisibleWidth: 900,
  // minVisibleHeight: 300,
  padding: 40,
  modifiers: ['ctrl', 'meta'],
}
