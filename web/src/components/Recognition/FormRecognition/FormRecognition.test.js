import { render } from '@redwoodjs/testing/web'

import FormRecognition from './FormRecognition'

describe('FormRecognition', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FormRecognition />)
    }).not.toThrow()
  })
})
