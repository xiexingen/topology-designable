---
title: Editor - 设计器
order: 10
---

# Editor - 设计器

拓扑图设计器

## 案例

### 简单案例

<code src="./demos/simple.tsx"></code>


## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tooltip | 移动到文本展示完整内容的提示 | boolean | - |
| length | 在按照长度截取下的文本最大字符数，超过则截取省略(与`lines`存在一个即可) | number | - |
| lines | 在按照行数截取下最大的行数，超过则截取省略(与`length`存在一个即可) | number | `1` |
| fullWidthRecognition | 是否将全角字符的长度视为 2 来计算字符串长度 | boolean | - |
