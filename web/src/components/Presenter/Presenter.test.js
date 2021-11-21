import { render } from '@redwoodjs/testing/web'

import Presenter from './Presenter'

describe('Presenter', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Presenter />)
    }).not.toThrow()
  })
})
