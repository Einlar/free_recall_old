import { db } from '$api/src/lib/db'
import { ListType } from '@prisma/client'

import randomWords from './data/random_categories.json'
import categorizedWords from './data/output_categories.json'
import wordCategories from './data/whole_categories.json'

export default async () => {
  console.info('Resetting WordLists...')
  db.wordList.deleteMany({})

  console.log('Seeding random words...')
  const result = await db.wordList.createMany({
    data: randomWords.map((obj) => ({
      ...obj,
      type: ListType.RANDOM,
    })),
  })
  console.log(`Seeded ${result.count} random lists\n`)

  console.log('Seeding categorized words...')
  const result2 = await db.wordList.createMany({
    data: categorizedWords.map((obj) => ({
      ...obj,
      type: ListType.CATEGORIZED,
    })),
  })
  console.log(`Seeded ${result2.count} categorized lists\n`)

  console.log('Seeding categories...')
  const result3 = await db.wordList.createMany({
    data: wordCategories.map((obj) => ({
      ...obj,
      type: ListType.CATEGORY,
    })),
  })
  console.log(`Seeded ${result3.count} categories\n`)
}
