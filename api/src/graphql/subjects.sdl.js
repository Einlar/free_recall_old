export const schema = gql`
  type Subject {
    id: String!
    email: String!
    age: Int!
    gender: Gender!
    records: [RecallRecord]!
  }

  enum Gender {
    MALE
    FEMALE
    NON_BINARY
  }

  type Query {
    subjects: [Subject!]! @requireAuth
    allStats: JSON @skipAuth
    subjectsExperimentStarted: JSON @skipAuth
    subjectsExperimentCompleted: JSON @skipAuth
  }

  input CreateSubjectInput {
    email: String!
    age: Int!
    gender: Gender!
  }

  input UpdateSubjectInput {
    email: String
    age: Int
    gender: Gender
  }
`
