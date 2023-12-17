import type { PortManager } from "@antv/x6/lib/model/port";
import type { Attr } from "@antv/x6/lib/registry";

const defaultPortStyle: Attr.CellAttrs = {
  circle: {
    r: 6,
    magnet: true,
    stroke: "var(--topology-editor-border-color)",
    strokeWidth: 1,
    // fill: '#fff',
    style: {
      visibility: "hidden",
    },
  },
};

const defaultPorts: PortManager.Metadata = {
  groups: {
    top: {
      position: {
        name: "top",
      },
      attrs: defaultPortStyle,
    },
    bottom: {
      position: {
        name: "bottom",
      },
      attrs: defaultPortStyle,
    },
    left: {
      position: {
        name: "left",
      },
      attrs: defaultPortStyle,
    },
    right: {
      position: {
        name: "right",
      },
      attrs: defaultPortStyle,
    },
  },
  items: [
    {
      group: "top",
    },
    {
      group: "bottom",
    },
    {
      group: "left",
    },
    {
      group: "right",
    },
  ],
};

export default defaultPorts;
