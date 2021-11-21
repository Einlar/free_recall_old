import { wordLists } from './wordLists'

describe('wordLists', () => {
  scenario('returns all wordLists', async (scenario) => {
    const result = await wordLists()

    expect(result.length).toEqual(Object.keys(scenario.wordList).length)
  })
})
