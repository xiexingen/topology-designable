import type { Cell } from '@antv/x6';
import type { Topology } from '@/types/global';
import type { ISchema, SchemaReactComponents } from '@formily/react'
import React, { useEffect, useState, useContext } from 'react';
import { Card } from 'antd';
import { createForm, onFieldInputValueChange } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, Select, NumberPicker, Checkbox, Radio, Cascader, DatePicker, Password, Switch, TimePicker, Transfer, TreeSelect, } from '@formily/antd-v5';
import pick from 'lodash/pick';
import get from 'lodash/get';
import set from 'lodash/set';
import reduce from 'lodash/reduce';
import cloneDeep from 'lodash/cloneDeep'
import TopologyContext from '@/contexts/topology'
import IconSelect from '@/components/props-panel/icon-select'


export type PropsPanelProps = {
  node: Cell | null;
  schemaMap?: Record<string, ISchema>;
  components?: SchemaReactComponents;
  scope?: any;
}

function getTitle(node: PropsPanelProps['node']) {
  if (node === null) {
    return '编辑画布信息';
  }
  if (node.isNode()) {
    return '编辑节点信息';
  }
  if (node.isEdge()) {
    return '编辑连线信息';
  }
  return '-';
}

const SchemaField = createSchemaField()
const defaultComponents = {
  FormItem,
  Input,
  InputNumber: NumberPicker,
  Select,
  NumberPicker,
  Checkbox,
  Radio,
  Cascader,
  DatePicker,
  Password,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  IconSelect,
}
const EDGE_PROP_KEYS = ['attrs', 'router', 'connector'];

function getNodeComponentProps(node: Cell) {
  // 查询出节点上配置的属性数据
  let nodeComponentProps = {};
  if (node.isEdge()) {
    nodeComponentProps = cloneDeep(pick(node.prop(), EDGE_PROP_KEYS));
  } else if (node.isNode()) {
    const nodeData = node.getData();
    nodeComponentProps = nodeData.componentProps;
  } else {
    throw Error(`[graph] 未实现的节点类型:${JSON.stringify(node)}`);
  }
  return nodeComponentProps;
}
const PropsPanel: React.FC<PropsPanelProps> = (props) => {
  const [title, setTitle] = useState('-');
  const [schema, setSchema] = useState({});
  const [deviceIcons, setDeviceIcons] = useState<Topology.TopologyIconProp[]>([]);

  const { iconMap = {} } = useContext(TopologyContext);

  const form = createForm({
    effects() {
      // 当用户改变表单项的时候更新到节点
      onFieldInputValueChange('*', async (field) => {
        if (!props.node) {
          return;
        }
        await field.validate();
        const inputValue = field.inputValue;
        // 查询出节点上配置的属性数据
        const nodeComponentProps: Record<string, any> = getNodeComponentProps(props.node);
        const pathName = field.path.toString()
        const preValue = get(nodeComponentProps, pathName)
        if (inputValue === preValue) {
          return;
        }
        if (props.node.isEdge()) {
          const newProps = set(nodeComponentProps, pathName, inputValue)
          props.node.prop(newProps);
        } else if (props.node.isNode()) {
          props.node.setData({
            componentProps: {
              ...nodeComponentProps,
              [pathName]: inputValue,
            }
          }, { deep: false });
        }
      })
    },
  })

  const handleNodeChange = (node: Cell | null) => {
    // 将表单的值清空
    form.setValues({}, 'overwrite');
    if (!node) {
      return;
    }
    const nodeComponentProps = getNodeComponentProps(node);
    // 必须使用展开运算符，否则会丢失引用类型的值
    form.setValues({
      ...nodeComponentProps
    }, 'overwrite');
  }

  useEffect(() => {
    const title = getTitle(props.node);
    const tempSchema = props.node?.shape ? props.schemaMap?.[props.node.shape] : {};
    setTitle(title);
    setSchema(tempSchema || {});
  }, [props.node])

  useEffect(() => {
    handleNodeChange(props.node)
  }, [schema, form, props.node])

  useEffect(() => {
    const result = reduce(iconMap, (result, cur) => {
      result.push(cur)
      return result;
    }, [] as Topology.TopologyIconProp[])
    setDeviceIcons(result)
  }, [iconMap])

  // const loadDeviceIcons = async () => {
  //   return new Promise((resolve) => {
  //     const result = reduce(iconMap, (result, cur) => {
  //       result.push(cur)
  //       return result;
  //     }, [] as Topology.TopologyIconProp[])
  //     resolve(result)
  //   })
  // }

  // const useAsyncDataSource = (service) => (field) => {
  //   field.loading = true
  //   service(field).then(
  //     action?.bound?.((data) => {
  //       field.dataSource = data
  //       field.loading = false
  //     })
  //   )
  // }

  return (
    <Card size="small" title={title} rootClassName='topology-designable-props-panel'>
      <Form feedbackLayout="popover" form={form} layout="vertical" colon={false}>
        <SchemaField
          scope={{
            ...props.scope,
            // useAsyncDataSource,
            // loadDeviceIcons,
            deviceIcons,
          }}
          components={{
            ...defaultComponents,
            ...props.components
          }}
          schema={schema}
        />
      </Form>
    </Card>
  )
};

PropsPanel.defaultProps = {
  node: null,
  schemaMap: {},
  components: {}
}

export default PropsPanel
