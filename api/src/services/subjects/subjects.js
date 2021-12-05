import { db } from 'src/lib/db'

export const subjects = () => {
  return db.subject.findMany()
}

export const subject = ({ id }) => {
  return db.subject.findUnique({
    where: { id },
  })
}

export const subjectsExperimentStarted = () => {
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
