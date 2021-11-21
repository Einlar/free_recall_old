import { recallRecords } from './recallRecords'

describe('recallRecords', () => {
  scenario('returns all recallRecords', async (scenario) => {
    const result = await recallRecords()

    expect(result.length).toEqual(Object.keys(scenario.recallRecord).length)
  })
})
