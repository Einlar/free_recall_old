export const schema = gql`
  type RecallRecord {
    id: Int!
    createdAt: DateTime!
    type: RecordType!
    presentedWords: [String]!
    words: [JSON]!
    subject: Subject!
    subjectId: String!
  }

  enum RecordType {
    RECALL
    RECOGNITION
  }

  type Query {
    recallRecords: [RecallRecord!]! @requireAuth
  }

  input CreateRecallRecordInput {
    type: RecordType!
    presentedWords: [String]!
    words: [JSON]!
    subjectId: String!
  }

  input UpdateRecallRecordInput {
    type: RecordType
    presentedWords: [String]!
    words: [JSON]!
    subjectId: String
  }
`
