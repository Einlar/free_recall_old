import ExperimentSteps from 'src/components/ExperimentSteps'
import ExplainRecall from 'src/components/Recall/ExplainRecall'
import ExplainRecognition from 'src/components/Recognition/ExplainRecognition'
import FormRecall from 'src/components/Recall/FormRecall'
import FormRecognition from 'src/components/Recognition/FormRecognition'

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
  const { experimentType, words, categories, subjectId } = experimentData

  return (
    <>
      {experimentType === 'RECALL' && (
        <ExperimentSteps
          explain={ExplainRecall}
          form={FormRecall}
          words={words}
          categories={categories}
          subjectId={subjectId}
        />
      )}
      {experimentType === 'RECOGNITION' && (
        <ExperimentSteps
          explain={ExplainRecognition}
          form={FormRecognition}
          words={words}
          categories={categories}
          subjectId={subjectId}
        />
      )}
    </>
  )
}
