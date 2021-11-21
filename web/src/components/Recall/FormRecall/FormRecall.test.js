import { render } from '@redwoodjs/testing/web'

import FormRecall from './FormRecall'

describe('FormRecall', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FormRecall />)
    }).not.toThrow()
  })
})
