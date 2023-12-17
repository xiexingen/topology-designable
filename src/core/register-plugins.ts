import {
  CLIPBOARD_OPTION,
  HISTORY_OPTION,
  KEYBOARD_OPTION,
  SCROLLER_OPTION,
  SELECTION_OPTION,
  SNAPLINE_OPTION,
  TRANSFORM_OPTION,
} from "@/constants/default-plugin";
import { getMergeOption } from "@/utils/index";
import { Graph } from "@antv/x6";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { History } from "@antv/x6-plugin-history";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Scroller } from "@antv/x6-plugin-scroller";
import { Selection } from "@antv/x6-plugin-selection";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Transform } from "@antv/x6-plugin-transform";

export type PredefinePluginOption = {
  transform?: boolean | Transform.Options;
  selection?: boolean | Selection.Options;
  snapline?: boolean | Snapline.Options;
  keyboard?: boolean | Keyboard["options"];
  clipboard?: boolean | Clipboard.Options;
  history?: boolean | History.Options;
  scroller?: boolean | Scroller.Options;
};

/**
 * 注册需要使用的所有插件
 */
const registerPlugins = (graph: Graph, option?: PredefinePluginOption) => {
  if (option?.transform !== false) {
    const transformOption = getMergeOption(
      option?.transform ?? true,
      TRANSFORM_OPTION
    );
    graph.use(new Transform(transformOption));
  }
  if (option?.selection !== false) {
    const selectionOption = getMergeOption(
      option?.selection ?? true,
      SELECTION_OPTION
    );
    graph.use(new Selection(selectionOption));
  }

  if (option?.snapline !== false) {
    const snaplineOption = getMergeOption(
      option?.snapline ?? true,
      SNAPLINE_OPTION
    );
    graph.use(new Snapline(snaplineOption));
  }

  if (option?.keyboard !== false) {
    const keyboardOption = getMergeOption(
      option?.keyboard ?? true,
      KEYBOARD_OPTION
    );
    graph.use(new Keyboard(keyboardOption));
  }

  if (option?.clipboard !== false) {
    const clipboardOption = getMergeOption(
      option?.clipboard ?? true,
      CLIPBOARD_OPTION
    );
    graph.use(new Clipboard(clipboardOption));
  }

  if (option?.history !== false) {
    const historyOption = getMergeOption(
      option?.history ?? true,
      HISTORY_OPTION
    );
    graph.use(new History(historyOption));
  }

  if (option?.scroller !== false) {
    const scrollerOption = getMergeOption(
      option?.scroller ?? true,
      SCROLLER_OPTION
    );
    graph.use(new Scroller(scrollerOption));
  }
};

export default registerPlugins;
