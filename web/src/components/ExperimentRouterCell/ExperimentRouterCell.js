import ExperimentSteps from 'src/components/ExperimentSteps'
import ExplainRecall from 'src/components/Recall/ExplainRecall'
import FormRecall from 'src/components/Recall/FormRecall'

export const QUERY = gql`
  query FetchExperimentData($email: String!, $age: Int!, $gender: Gender!) {
    getExperiment(email: $email, age: $age, gender: $gender)
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ getExperiment: experimentData }) => {
  const { experimentType, words, categories } = experimentData

  return (
    <>
      {experimentType === 'RECALL' && (
        <ExperimentSteps
          explain={ExplainRecall}
          form={FormRecall}
          words={words}
          categories={categories}
        />
      )}
      {experimentType === 'RECOGNITION' && (
        <p>Recognition Task (Work in Progress)</p>
      )}
    </>
  )

  // return <div>{JSON.stringify(getExperiment)}</div>
}
