import { subjects } from './subjects'

describe('subjects', () => {
  scenario('returns all subjects', async (scenario) => {
    const result = await subjects()

    expect(result.length).toEqual(Object.keys(scenario.subject).length)
  })
})
