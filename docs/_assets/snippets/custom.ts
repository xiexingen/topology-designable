import customSnippet from '../images/custom-snippet.png';

export default {
  id: 'custom-snippet',
  label: '自定义片段',
  icon: customSnippet,
  component: 'topology-snippet',
  componentProps: {
    icon: customSnippet,
    children: {
      nodes: [
        {
          id: '80c8697b-0972-464f-9bdd-ae95a57b9e19',
          component: 'topology-rect',
          embeddable: true,
          componentProps: {
            borderStyle: 'dashed',
            background: 'var(--topology-editor-background-normal)',
          },
        },
        {
          id: '5c2ec5bc-3189-448f-a4f5-6e2d2ef127d9',
          component: 'topology-device',
          componentProps: {
            borderStyle: 'none',
            label: '银行',
            icon: 'bank',
            background: 'transparent',
            device: 'bank',
          },
          size: {
            width: 74,
            height: 74,
          },
          position: {
            x: 2.000000000000796,
            y: 3.999999999998863,
          },
          relative: true,
          parent: '80c8697b-0972-464f-9bdd-ae95a57b9e19',
        },
        {
          id: '93fe2c02-3f84-4deb-aa38-f154edf77759',
          component: 'topology-device',
          componentProps: {
            borderStyle: 'none',
            label: '政府',
            icon: 'government',
            background: 'transparent',
            device: 'government',
          },
          size: {
            width: 74,
            height: 74,
          },
          position: {
            x: 122.0000000000008,
            y: 3.999999999998863,
          },
          relative: true,
          parent: '80c8697b-0972-464f-9bdd-ae95a57b9e19',
        },
        {
          id: '4e6718fc-b762-4cbb-af24-6c1f65e968ad',
          component: 'topology-device',
          componentProps: {
            borderStyle: 'none',
            label: '公安',
            icon: 'police',
            background: 'transparent',
            device: 'police',
          },
          size: {
            width: 74,
            height: 74,
          },
          position: {
            x: 242.0000000000008,
            y: 3.999999999998863,
          },
          relative: true,
          parent: '80c8697b-0972-464f-9bdd-ae95a57b9e19',
        },
      ],
      edges: [
        {
          source: {
            cell: '4e6718fc-b762-4cbb-af24-6c1f65e968ad',
            port: 'left',
          },
          target: {
            cell: '93fe2c02-3f84-4deb-aa38-f154edf77759',
            port: 'right',
          },
        },
        {
          source: {
            cell: '93fe2c02-3f84-4deb-aa38-f154edf77759',
            port: 'left',
          },
          target: {
            cell: '5c2ec5bc-3189-448f-a4f5-6e2d2ef127d9',
            port: 'right',
          },
        },
      ],
    },
  },
  size: {
    height: 84,
    width: 316,
  },
  columnSpan: 3, // 配置该资产占 3 列展示
  rowSpan: 1, // 配置该资产占 1 列展示
};
