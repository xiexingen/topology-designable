import { connect, mapProps, mapReadPretty } from '@formily/react'
import { PreviewText } from '@formily/antd-v5'
import Picker from './picker'

export default connect(
  Picker,
  mapProps((props) => {
    return {
      ...props,
    }
  }),
  mapReadPretty(PreviewText.Input)
)
