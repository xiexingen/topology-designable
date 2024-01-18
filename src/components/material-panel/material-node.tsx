import React from 'react';
import classNames from 'classnames';
import BaseNode from '../shapes/base-node';
import Circle from '../shapes/circle';
import Label from '../shapes/label';
import Lightning from '../shapes/lightning';
import Line from '../shapes/line';
import Rect from '../shapes/rect';
import Default from './default';

interface IMaterialNodeProps {
    material: Topology.Node;
    prefix?: string;
    icon?: string;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
}

const componentMap: { [key: string]: any } = {
    'topology-downlink': BaseNode,
    'topology-device': BaseNode,
    'topology-label': Label,
    'topology-line': Line,
    'topology-rect': Rect,
    'topology-lightning': Lightning,
    'topology-circle': Circle,
};

const MaterialNode: React.FC<IMaterialNodeProps> = (props) => {
    const prefixText = props.prefix ? `${props.prefix}-` : '';

    const computedStyle: React.CSSProperties = {
        gridRow: props.material.rowSpan
            ? `span ${props.material.rowSpan}`
            : undefined,
        gridColumn: props.material.columnSpan
            ? `span ${props.material.columnSpan}`
            : undefined,
    };

    // 匹配上的节点
    const MaterialNode = componentMap[props.material.component] ?? null;

    return (
        <div
            className={classNames('item', props.material.component)}
            style={computedStyle}
            data-type={`${prefixText}${props.material.id}`}
            onMouseDown={props.onMouseDown}
        >
            {MaterialNode ? (
                <MaterialNode {...props.material.componentProps} />
            ) : (
                <Default
                    icon={props.icon}
                    label={props.material.label}
                    className={classNames({
                        span:
                            props.material.rowSpan || props.material.columnSpan,
                    })}
                />
            )}
        </div>
    );
};

MaterialNode.defaultProps = {
    prefix: '',
};

export default MaterialNode;
