import { db } from 'src/lib/db'

export const recallRecords = () => {
  return db.recallRecord.findMany()
}

export const recallRecord = ({ id }) => {
  return db.recallRecord.findUnique({
    where: { id },
  })
}

export const RecallRecord = {
  subject: (_obj, { root }) =>
    db.recallRecord.findUnique({ where: { id: root.id } }).subject(),
}
