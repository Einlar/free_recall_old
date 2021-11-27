import { render } from '@redwoodjs/testing/web'

import ThankYouPage from './ThankYouPage'

describe('ThankYouPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThankYouPage />)
    }).not.toThrow()
  })
})
