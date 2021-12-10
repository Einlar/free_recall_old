import { db } from 'src/lib/db'
import { ListType, RecordType } from '@prisma/client'

export const wordLists = () => {
  return db.wordList.findMany()
}

//Returns the type of the last experiment performed by `subjectId`
//Output: { records: [{type: <type>, categories: [<categories>]}] }
const getLastExperimentType = async ({ subjectId }) => {
  return await db.subject.findUnique({
    where: {
      id: subjectId,
    },
    select: {
      records: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          type: true,
          categories: true,
          length: true,
        },
        take: 1,
      },
    },
  })

  // return {
  //   records: [
  //     {
  //       type: 'RECALL',
  //       categories: ['animals', 'vehicles'],
  //     },
  //   ],
  // }

  //TODO Add a filter on the length of words, so that "empty" experiments are not considered
  // => Simpler: add the experiment on db only if words is non-empty!
}

//Returns a random list of words from the ones existing in the db.
//Can be either `categorized` or not, and must not include the categories
//in `avoidCategories`
const getWordlist = async ({
  categorized = false,
  avoidCategories = [],
  length = 64,
}) => {
  const listPool = await db.wordList.findMany({
    where: {
      type: categorized ? ListType.CATEGORIZED : ListType.RANDOM,
      NOT: {
        categories: {
          hasSome: avoidCategories,
        },
      },
      length,
    },
    select: {
      id: true,
    },
  })

  console.log('ListPool', listPool)
  //Choose a random list between them and retrieve it
  const randomListId = listPool[Math.floor(Math.random() * listPool.length)].id

  const wordList = await db.wordList.findUnique({
    where: {
      id: randomListId,
    },
  })

  return wordList
}

//Retrieve all the words from a list of `categories`
const getWordsFromCategories = async ({ categories = [] }) => {
  const wordLists = await db.wordList.findMany({
    where: {
      type: ListType.CATEGORY,
      categories: {
        hasSome: categories,
      },
    },
    select: {
      words: true,
    },
  })

  //Merge all words in a single array
  return wordLists.reduce((obj, item) => {
    obj.push(...item.words)
    return obj
  }, [])
}

const getAllRandomWords = async () => {
  const wordLists = await db.wordList.findMany({
    where: {
      type: ListType.RANDOM,
    },
    select: {
      words: true,
    },
  })

  //Merge all words in a single array
  return wordLists.reduce((obj, item) => {
    obj.push(...item.words)
    return obj
  }, [])
}

export const getExperiment = async ({
  email,
  age,
  gender,
  lengths = [8, 16, 32, 64],
  defaultCategorized = null,
}) => {
  //Retrieve subjectId
  let subjectId = await db.subject.findFirst({
    where: {
      email,
      age,
      gender,
    },
    select: {
      id: true,
    },
  })

  //If it does not exist, create a new Subject, and retrieve their subjectId
  if (!subjectId) {
    subjectId = await db.subject.create({
      data: {
        email,
        age,
        gender,
      },
      select: {
        id: true,
      },
    })
  }
  subjectId = subjectId.id
  console.log(`Subject ID: ${subjectId}`)

  //By default, the first experiment to be done is RECALL
  //If an experiment has already been done by the same `subjectId`
  //then pick the other type of experiment (Recall <-> Recognition)

  //Get new wordList.
  //It is `categorized` only if the previous list was categorized.
  //If there was no previous list for `subjectId`, then the `categorized` is randomized

  let experimentType = RecordType.RECALL
  let avoidCategories = []
  const lastExperiments = (await getLastExperimentType({ subjectId })).records
  let categorized = Math.floor(Math.random() * 2) === 0
  if (typeof defaultCategorized === 'boolean') {
    categorized = defaultCategorized
    console.log(`Default categorized to ${defaultCategorized}`)
  }

  let length = lengths[Math.floor(Math.random() * lengths.length)]

  console.log('Last experiments', lastExperiments)
  if (lastExperiments && lastExperiments.length > 0) {
    console.log('There was a previous experiment: ', lastExperiments[0])
    const lastExperimentType = lastExperiments[0].type
    experimentType =
      lastExperimentType === RecordType.RECALL
        ? RecordType.RECOGNITION
        : RecordType.RECALL
    avoidCategories = lastExperiments[0].categories

    if (experimentType === RecordType.RECOGNITION) {
      //Maintain previous length & categorized if this is the second part
      categorized = lastExperiments[0].categories.length > 0
      length = lastExperiments[0].length
    }
  }

  console.log('New experiment will be of type: ', experimentType)
  console.log(
    `Choosing a new list with (categorized: ${categorized}, avoidCategories: ${avoidCategories}), length: ${length}`
  )

  const wordList = await getWordlist({ categorized, avoidCategories, length })

  if (experimentType === RecordType.RECALL) {
    return {
      subjectId,
      experimentType,
      categorized,
      words: wordList.words,
      categories: wordList.categories,
    }
  }

  //Add distractors to each word (only for the Recognition experiment)
  if (experimentType === RecordType.RECOGNITION) {
    let distractors = []
    if (categorized) {
      distractors = await getWordsFromCategories({
        categories: wordList.categories,
      })
    } else {
      distractors = await getAllRandomWords()
    }

    //Distractors cannot appear in the main list
    const wordsInList = wordList.words.map((item) => item.word)
    distractors = distractors.filter((item) => !wordsInList.includes(item.word))

    //For each word to present, pick the distractor with the most similar frequency.
    for (let idx = 0; idx < wordList.words.length; idx++) {
      const freqDiff = distractors.map((item) =>
        Math.abs(item.frequency - wordList.words[idx].frequency)
      )
      const minIndex = freqDiff.indexOf(Math.min(...freqDiff))

      wordList.words[idx]['distractor'] = distractors[minIndex]
      distractors.splice(minIndex, 1) //This distractor has been "used up", so it is removed
    }

    return {
      subjectId,
      experimentType,
      categorized,
      words: wordList.words,
      categories: wordList.categories,
    }
  }
}
