import { useMutation } from '@redwoodjs/web'
import { useState, useEffect } from 'react'
import { navigate, routes } from '@redwoodjs/router'
import Timer from './Timer'
import { Button } from 'src/components/ui/Button'
import { styled } from 'src/ui/stitches.config'

const ADD_RECORD = gql`
  mutation FormRecall_CreateRecallRecord($input: CreateRecallRecordInput!) {
    createRecallRecord(input: $input) {
      id
      createdAt
      type
      presentedWords
      words
      subjectId
    }
  }
`

const FormRecall = ({ subjectId, presentedWords, categories = [] }) => {
  useEffect(() => {
    console.log('render')
  }, [])
  // const userData = JSON.parse(localStorage.getItem('userData'))
  const [experimentStartTime] = useState(+new Date()) //Start of the experiment
  const [words, setWords] = useState([]) //All recalled words
  //Schema:
  // [
  //   {
  //     word: word,
  //     start: startTime,
  //     end: endTime,
  //     keys: [{
  //       key: key,
  //       value: wordWithAppendedKey,
  //       time: time
  //     }]
  //   }
  // ]

  //State for current word
  const [value, setValue] = useState('') //Input field value
  const [word, setWord] = useState({ start: -1, end: -1, keys: [] })
  const [submit, setSubmit] = useState(false) //Trigger a submit

  const [createRecord] = useMutation(ADD_RECORD)

  useEffect(() => {
    console.log(words)
  }, [words])

  useEffect(() => {
    if (submit) {
      //Get the last word
      const currentTime = +new Date() - experimentStartTime

      const allWords = words

      if (value.trim().length > 0) {
        allWords.push({
          word: value,
          start: word.start / 1000,
          end: currentTime / 1000,
          keys: word.keys,
        })
      }

      if (allWords.length) {
        createRecord({
          variables: {
            input: {
              words: allWords,
              subjectId: subjectId,
              type: 'RECALL',
              presentedWords: presentedWords.map((item) => item.word),
              categories: categories,
            },
          },
        })
      }

      console.log('got words: ', allWords)

      navigate(routes.thankYou())
    }
  }, [submit])

  const registerWord = ({ word, start, end, keys }) => {
    if (word.length > 0) {
      setWords((prevWords) => [
        ...prevWords,
        {
          word,
          start: start / 1000, //Convert all times to seconds
          end: end / 1000,
          keys: keys.map((key) => ({ ...key, time: key.time / 1000 })),
        },
      ])

      //Reset state
      setWord({ start: -1, end: -1, keys: [] })
      setValue('')
    }
  }

  const recordKeyDown = (event) => {
    const currentTime = +new Date() - experimentStartTime
    if (word.start < 0) {
      setWord((prevWord) => ({
        ...prevWord,
        start: currentTime,
      }))
    }

    const { key } = event
    const keyRecord = {
      key,
      value: event.target.value,
      time: currentTime,
    }

    if (key === 'Enter' || key === ' ') {
      registerWord({
        word: event.target.value.trim(),
        start: word.start || currentTime,
        end: currentTime,
        keys: [...word.keys, keyRecord],
      })
    } else {
      setWord((prevWord) => ({
        ...prevWord,
        keys: [...prevWord.keys, keyRecord],
      }))
    }
  }

  return (
    <WrapForm id="wrapform">
      <p>
        Scrivi tutte le parole che ricordi, in un <b>ordine qualsiasi</b>. Premi{' '}
        <b>INVIO</b> (o barra spaziatrice) dopo ogni parola inserita.
      </p>
      <p>
        Se non ne ricordi altre, puoi concludere in anticipo facendo click su{' '}
        <i>Termina Esperimento</i>
      </p>
      <Timer countdownSeconds={6 * 60} endTask={() => setSubmit(true)} />
      <EnterWord
        id="enterword"
        maxLength="40"
        spellCheck="false"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={recordKeyDown}
      />
      <Button type="button" onClick={() => setSubmit(true)}>
        Termina l&apos;esperimento.
      </Button>
    </WrapForm>
  )
}

const WrapForm = styled('div', {
  fontSize: '18px',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'space-around',
  flexWrap: 'wrap',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0.5rem',
  padding: '0.5rem',
})

const EnterWord = styled('input', {
  border: '0px',
  outline: 'none',
  fontSize: '2rem',
  fontWeight: '400',
  color: '#383838',
  textAlign: 'center',
  background: '#ffd4bd',
  fontFamily: 'monospace',
  boxShadow: '1px 0px rgb(237, 138, 117)',
  width: '100%',
  margin: '2rem 0',
  padding: '.5rem 0',
})

export default FormRecall
