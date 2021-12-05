export const schema = gql`
  type RecallRecord {
    id: Int!
    createdAt: DateTime!
    type: RecordType!
    length: Int!
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
    length: Int!
    presentedWords: [String]!
    words: [JSON]!
    categories: [String]
    subjectId: String!
  }

  input UpdateRecallRecordInput {
    type: RecordType
    length: Int
    presentedWords: [String]!
    words: [JSON]!
    categories: [String]
    subjectId: String
  }

  type Mutation {
    createRecallRecord(input: CreateRecallRecordInput!): RecallRecord! @skipAuth
  }
`
