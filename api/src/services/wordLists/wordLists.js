import { db } from 'src/lib/db'
import { ListType, RecordType } from '@prisma/client'

export const wordLists = () => {
  return db.wordList.findMany()
}

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
        },
        take: 1,
      },
    },
  })

  //TODO Add a filter on the length of words, so that "empty" experiments are not considered
}

const getWordlist = async ({ categorized = false, avoidCategories = [] }) => {
  const listPool = await db.wordList.findMany({
    where: {
      type: categorized ? ListType.CATEGORIZED : ListType.RANDOM,
      NOT: {
        categories: {
          hasSome: avoidCategories,
        },
      },
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

  //TODO Shuffle the words

  return wordList
}

// const getDistractors = async ({ wordList }) => {
//   const categories = wordList.categories

//Get all words from the two categories

//Get words that were not shown

//The distractor for each word is a word with similar frequency
// var distractors = [];
// words_to_present.forEach(pWord => {
//     let freqDiff = new_words.map((nWord) => Math.abs(nWord.frequency - pWord.frequency));
//     const index = freqDiff.indexOf(Math.min(...freqDiff));

//     distractors.push(new_words[index]);
//     new_words.splice(index, 1);
// });
// }

export const getExperiment = async ({ email, age, gender }) => {
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

  //If it does not exist, create a new Subject
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

  let experimentType = RecordType.RECALL
  const lastExperiments = await getLastExperimentType({ subjectId }).records
  if (lastExperiments && lastExperiments.length > 0) {
    const lastExperimentType = lastExperiments[0].type
    experimentType =
      lastExperimentType === RecordType.RECALL
        ? RecordType.RECOGNITION
        : RecordType.RECALL
  }

  console.log(experimentType)
  if (experimentType === RecordType.RECALL) {
    const categorized = Math.floor(Math.random() * 2) === 0
    const wordList = await getWordlist({ categorized })
    return {
      experimentType,
      categorized,
      words: wordList.words,
      categories: wordList.categories,
    }
  }
  //TODO
  //Retrieve last experiment type (recall/recognition) and choose the other (or start from recall)
  //Then choose categorized or random (reread in the thesis the exact procedure)
  //If categorized, retrieve last experiment categories and avoid them

  //Retrieve the distractors for the recognition task and add them to the JSON

  //Maybe use a well defined schema as return type.

  // console.log(await getRecallExperiment({ categorized: true }))
  // return [{ word: 'Ciao' }]
}
