import { red, blue, gray } from '@radix-ui/colors'
import { createStitches } from '@stitches/react'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...red,
      ...blue,
      ...gray,
    },
  },
})
