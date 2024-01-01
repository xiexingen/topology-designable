import { connect, mapProps, mapReadPretty } from '@formily/react'
import { PreviewText } from '@formily/antd-v5'
import IconSelect from './icon-select'

export default connect(
  IconSelect,
  mapProps((props) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(PreviewText.Select)
)
