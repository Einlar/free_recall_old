import { useState, useEffect } from 'react'
import { styled } from 'src/ui/stitches.config'

const Timer = ({ countdownSeconds = 360, endTask }) => {
  const durationMinutes = Math.floor(countdownSeconds / 60)
  const durationSeconds = countdownSeconds % 60

  const [timer] = useState(+new Date())
  const [minutes, setMinutes] = useState(durationMinutes)
  const [seconds, setSeconds] = useState(durationSeconds)

  const updateTimer = () => {
    let now = +new Date()
    let elapsed = (now - timer) / 1000 //Seconds elapsed
    let missing = Math.round(countdownSeconds - elapsed)

    if (missing > 0) {
      setMinutes(Math.floor(missing / 60))
      setSeconds(missing % 60)
    } else {
      endTask()
    }
  }
  useEffect(() => {
    var intervalTimer = setInterval(() => {
      updateTimer()
    }, 1000)

    return () => {
      clearInterval(intervalTimer)
    }
  }, [])

  //endTask callback is called when the timer ends
  return (
    <Countdown className="timer">
      {minutes.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}
      :
      {seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}
    </Countdown>
  )
}

const Countdown = styled('div', {
  fontSize: '2rem',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  letterSpacing: '0.125rem',
  fontWeight: 'normal',
  textTransform: 'uppercase',
  color: '#333',
  textAlign: 'center',
})

export default Timer
