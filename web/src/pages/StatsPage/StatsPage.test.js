import { render } from '@redwoodjs/testing/web'

import StatsPage from './StatsPage'

describe('StatsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StatsPage />)
    }).not.toThrow()
  })
})
