import { render } from '@redwoodjs/testing/web'

import SubjectForm from './SubjectForm'

describe('SubjectForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SubjectForm />)
    }).not.toThrow()
  })
})
