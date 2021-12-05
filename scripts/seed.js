import { db } from '$api/src/lib/db'
import { ListType } from '@prisma/client'

import randomWords from './data/random_categories.json'
import categorizedWords from './data/output_categories.json'
import wordCategories from './data/whole_categories.json'

export default async () => {
  console.info('Resetting WordLists...')

  let wordListId = 0

  console.log('Seeding random words...')
  for (let i = 0; i < randomWords.length; i++) {
    await db.wordList.upsert({
      where: { id: i },
      create: {
        ...randomWords[i],
        type: ListType.RANDOM,
        categories: [],
      },
      update: {
        ...randomWords[i],
        type: ListType.RANDOM,
        categories: [],
      },
    })
  }

  wordListId += randomWords.length
  console.log('Seeding categorized words...')
  for (let i = 0; i < categorizedWords.length; i++) {
    await db.wordList.upsert({
      where: { id: i + wordListId },
      create: {
        ...categorizedWords[i],
        type: ListType.CATEGORIZED,
      },
      update: {
        ...categorizedWords[i],
        type: ListType.CATEGORIZED,
      },
    })
  }
  wordListId += categorizedWords.length

  console.log('Seeding categories...')
  for (let i = 0; i < wordCategories.length; i++) {
    await db.wordList.upsert({
      where: { id: i + wordListId },
      create: {
        ...wordCategories[i],
        type: ListType.CATEGORY,
      },
      update: {
        ...wordCategories[i],
        type: ListType.CATEGORY,
      },
    })
  }
}
