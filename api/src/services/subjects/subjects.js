import { db } from 'src/lib/db'

export const subjects = () => {
  return db.subject.findMany()
}

export const subject = ({ id }) => {
  return db.subject.findUnique({
    where: { id },
  })
}

export const allStats = async () => {
  return {
    started: await lengthStats({ type: 'RECALL' }),
    completed: await lengthStats({ type: 'RECOGNITION' }),
  }
}

export const lengthStats = async ({ type }) => {
  const subjectRecords = await db.subject.findMany({
    where: {
      records: {
        some: {
          type,
        },
      },
    },
    include: {
      records: true,
    },
  })

  //Count only experiments done?
  const lengthCounts = {
    8: {
      categorized: 0,
      random: 0,
    },
    16: {
      categorized: 0,
      random: 0,
    },
    32: {
      categorized: 0,
      random: 0,
    },
    64: {
      categorized: 0,
      random: 0,
    },
  }
  /*
  [ { id, email, age, gender, records: [ { length, type }]}]

  */
  console.log(subjectRecords)
  let count = 0
  for (const subject of subjectRecords) {
    for (const record of subject.records) {
      if (record.type === type) {
        lengthCounts[record.length][
          record.categories.length > 0 ? 'categorized' : 'random'
        ] += 1
        count += 1
      }
    }
  }

  return {
    count,
    lengthCounts,
  }
}

export const subjectsExperimentStarted = async () => {
  return db.subject.aggregate({
    where: {
      records: {
        some: {
          type: 'RECALL',
        },
      },
    },
    _count: true,
  })
}

export const subjectsExperimentCompleted = () => {
  return db.subject.aggregate({
    where: {
      records: {
        some: {
          type: 'RECOGNITION',
        },
      },
    },
    _count: true,
  })
}

export const Subject = {
  records: (_obj, { root }) =>
    db.subject.findUnique({ where: { id: root.id } }).records(),
}
