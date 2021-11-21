import { render } from '@redwoodjs/testing/web'

import SubjectData from './SubjectData'

describe('SubjectData', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SubjectData />)
    }).not.toThrow()
  })
})
