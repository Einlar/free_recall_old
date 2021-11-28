import { render } from '@redwoodjs/testing/web'

import SkeletonLoader from './SkeletonLoader'

describe('SkeletonLoader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SkeletonLoader />)
    }).not.toThrow()
  })
})
