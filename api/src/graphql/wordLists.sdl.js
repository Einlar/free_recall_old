export const schema = gql`
  type WordList {
    id: Int!
    length: Int!
    type: ListType!
    categories: [String]!
    words: [JSON]!
  }

  enum ListType {
    RANDOM
    CATEGORIZED
  }

  type Query {
    wordLists: [WordList!]! @requireAuth
    getExperiment(
      email: String!
      age: Int!
      gender: Gender!
      lengths: [Int]
      defaultCategorized: Boolean
    ): JSON @skipAuth
  }

  input CreateWordListInput {
    length: Int!
    type: ListType!
    categories: [String]!
    words: [JSON]!
  }

  input UpdateWordListInput {
    length: Int
    type: ListType
    categories: [String]!
    words: [JSON]!
  }
`
