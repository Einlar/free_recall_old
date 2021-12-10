import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { styled } from 'src/ui/stitches.config'

export const QUERY = gql`
  query StatsQuery {
    allStats
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ allStats }) => {
  const { started, completed } = allStats
  const lengths = [8, 16, 32, 64]

  const makeRow = ({ stats, type }) => {
    let row = []

    let total = { started: 0, completed: 0 }
    for (const length of lengths) {
      const countStarted = stats.started.lengthCounts[length][type]
      const countCompleted = stats.completed.lengthCounts[length][type]
      row.push({
        started: countStarted,
        completed: countCompleted,
      })
      total.started += countStarted
      total.completed += countCompleted
    }

    return [...row, total]
  }

  const makeTotals = ({ stats }) => {
    let row = []
    let total = {
      started: 0,
      completed: 0,
    }
    for (const length of lengths) {
      const totalStarted =
        stats.started.lengthCounts[length]['categorized'] +
        stats.started.lengthCounts[length]['random']
      const totalCompleted =
        stats.completed.lengthCounts[length]['categorized'] +
        stats.completed.lengthCounts[length]['random']
      row.push({
        started: totalStarted,
        completed: totalCompleted,
      })

      total.started += totalStarted
      total.completed += totalCompleted
    }

    return [...row, total]
  }

  return (
    <article style={{ paddingBottom: '40px' }}>
      <p>
        <b>Legend: </b>
        <StartComplete
          started={'done at least recall'}
          completed={'done both'}
        />
      </p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Experiment statistics">
          <TableHead>
            <TableRow>
              <TableCell>Length</TableCell>
              <TableCell>8</TableCell>
              <TableCell>16</TableCell>
              <TableCell>32</TableCell>
              <TableCell>64</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="categorized">
              <TableCell variant="head">Categorized</TableCell>
              {makeRow({ stats: allStats, type: 'categorized' }).map(
                ({ started, completed }, idx) => (
                  <TableCell key={idx}>
                    <StartComplete started={started} completed={completed} />
                  </TableCell>
                )
              )}
            </TableRow>
            <TableRow>
              <TableCell variant="head">Random</TableCell>
              {makeRow({ stats: allStats, type: 'random' }).map(
                ({ started, completed }, idx) => (
                  <TableCell key={idx}>
                    <StartComplete started={started} completed={completed} />
                  </TableCell>
                )
              )}
            </TableRow>
            <TableRow>
              <TableCell variant="head">Total</TableCell>
              {makeTotals({ stats: allStats }).map(
                ({ started, completed }, idx) => (
                  <TableCell key={idx}>
                    <StartComplete started={started} completed={completed} />
                  </TableCell>
                )
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </article>
  )
}

const StartComplete = ({ started, completed }) => {
  return (
    <span>
      {completed} <span style={{ color: '#a15600' }}>({started})</span>
    </span>
  )
}
