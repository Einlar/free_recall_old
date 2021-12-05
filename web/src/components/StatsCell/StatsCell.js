export const QUERY = gql`
  query StatsQuery {
    subjectsExperimentStarted
    subjectsExperimentCompleted
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  subjectsExperimentStarted,
  subjectsExperimentCompleted,
}) => {
  const started = subjectsExperimentStarted._count || 0
  const completed = subjectsExperimentCompleted._count || 0

  return (
    <ul>
      <li>Subjects who did at least the Free Recall phase: {started}</li>
      <li>Subjects who did both phases: {completed}</li>
    </ul>
  )
}
