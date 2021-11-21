import { db } from 'src/lib/db'

export const subjects = () => {
  return db.subject.findMany()
}

export const subject = ({ id }) => {
  return db.subject.findUnique({
    where: { id },
  })
}

export const Subject = {
  records: (_obj, { root }) =>
    db.subject.findUnique({ where: { id: root.id } }).records(),
}
