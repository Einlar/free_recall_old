import { render } from '@redwoodjs/testing/web'

import ExperimentSteps from './ExperimentSteps'

describe('ExperimentSteps', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExperimentSteps />)
    }).not.toThrow()
  })
})
