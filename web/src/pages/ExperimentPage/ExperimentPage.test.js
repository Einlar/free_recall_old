import { render } from '@redwoodjs/testing/web'

import ExperimentPage from './ExperimentPage'

describe('ExperimentPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExperimentPage />)
    }).not.toThrow()
  })
})
