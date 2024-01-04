import React from 'react';

export type InnerNodeProps = {
  prop: any; // 这里应该是组件的属性类型
  data: any; // 这里应该是数据类型
};

const InnerNode: React.FC<InnerNodeProps> = () => {
  return <>inner-node</>;
};

export default InnerNode;

{
  /* <template>
  <div class="inner-node" :class="{ [computedClass]: true }">
    <svg
      class="monitor-status"
      xmlns="http://www.w3.org/2000/svg"
      style="width: 100%; height: 100%;"
      version="1.1"
    >
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
      />
    </svg>
    <div class="run-status">
      <!-- 设备状态异常(设备检修、状态异常、监测失败) -->
      <Popover
        v-if="statusInfo.run_time_exception"
        placement="top"
        content="发现设备异常"
        trigger="hover"
      >
        <component :is="LEGEND.RUN_EXCEPTION" slot="reference" class="item" />
      </Popover>
      <Popover
        v-if="statusInfo.monitor_fail"
        placement="top"
        content="设备监测失败"
        trigger="hover"

      >
        <component :is="LEGEND.OFFLINE" slot="reference" class="item" />
      </Popover>
      <Popover
        v-if="statusInfo.overhaul"
        placement="top"
        content="设备正在检修中..."
        trigger="hover"

      >
        <component
          :is="LEGEND.EQUIPMENT_MAINTENANCE"
          slot="reference"
          class="item"
        />
      </Popover>
      <!-- 告警 -->
      <Popover
        v-else-if="showAlert"
        placement="top"
        :open-delay="1000"
        trigger="hover"
        popper-class="topology-full-node-popover-tip"
      >
        <div>发现告警</div>
        <span slot="reference" class="item-with-text">
          <span class="count">
            {{ statusInfo.threat_alarm > 99 ? "99+" : statusInfo.threat_alarm }}
          </span>
        </span>
      </Popover>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inner-node {
  box-sizing: border-box;
  display: inline-block;
  border-radius: 4px;
  position: absolute;
  // border-width: 1px;
  // border-style: dashed;
  // opacity: 0.6;

  .monitor-status {
    position: absolute;
    left: 0;
    top: 0;
    fill: none;
    stroke: rgb(99, 90, 90);
    stroke-width: 2;
    stroke-dasharray: 4, 3;
    stroke-dashoffset: 3;
  }

  &.success {
    .monitor-status {
      stroke: $color-success-9;
    }
  }

  &.danger {
    .monitor-status {
      stroke: $color-error-9;
    }
  }

  &.disabled {
    .monitor-status {
      stroke: black;
    }
  }

  &.alert,
  &.overhaul,
  &.exception {
    .monitor-status {
      stroke-width: 4;
      animation: dashmove 1s linear infinite;
    }
  }

  &.alert {
    .monitor-status {
      stroke: #f12e2f;
    }
  }

  &.overhaul {
    .monitor-status {
      stroke: #ff761a;
    }
  }

  &.exception {
    .monitor-status {
      stroke: #f8af1c;
    }
  }

  @keyframes dashmove {
    0% {
      stroke-dashoffset: 6;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }
}

.run-status {
  position: absolute;
  z-index: 1;
  text-align: left;
  margin-top: -10px;
  margin-left: -12px;

  // 消除 icon 图标的padding
  .item {
    margin: -2px;
    animation: blink 8s infinite;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }

    20% {
      opacity: 0;
    }

    40% {
      opacity: 1;
    }

    100% {
      opacity: 1;
    }
  }
}
</style> */
}
