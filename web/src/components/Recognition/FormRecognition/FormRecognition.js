import { useMutation } from '@redwoodjs/web'
import { useState, useEffect } from 'react'
import { navigate, routes } from '@redwoodjs/router'

import { styled } from '@stitches/react'

const ADD_RECORD = gql`
  mutation FormRecognition_CreateRecallRecord(
    $input: CreateRecallRecordInput!
  ) {
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

//TODO Check if words are shuffled correctly
const FormRecognition = ({ subjectId, presentedWords, categories = [] }) => {
  const [createRecord] = useMutation(ADD_RECORD)

  const [experimentStartTime] = useState(+new Date())
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])

  const getWord = (idx) => {
    const topIsTrue = Math.floor(Math.random() * 2) === 0
    return {
      trueWord: presentedWords[idx].word,
      falseWord: presentedWords[idx].distractor.word,
      topIsTrue,
    }
  }

  const [word, setWord] = useState(getWord(0))

  //Record an answer and advance to the next pair of words
  const advance = () => {
    const currentTime = +new Date() - experimentStartTime
    const newAnswer = {
      ...word,
      time: currentTime / 1000,
    }

    setAnswers((prevAnswers) => [...prevAnswers, newAnswer])
    if (index < presentedWords.length - 1) {
      setWord(getWord(index + 1))
      setIndex((prevIndex) => prevIndex + 1)
    }
  }

  useEffect(() => {
    if (answers.length === presentedWords.length) {
      onSubmit()
    }
  }, [answers])

  const onSubmit = () => {
    createRecord({
      variables: {
        input: {
          type: 'RECOGNITION',
          subjectId,
          categories,
          presentedWords: presentedWords.map((item) => item.word),
          words: answers,
        },
      },
    })
    navigate(routes.thankYou())
  }
  return (
    <div style={{ width: '800px' }}>
      <RecoBox className="recobox">
        <ButtonReco
          type="button"
          className="buttonreco"
          onClick={advance}
          value={word.topIsTrue ? word.trueWord : word.falseWord}
        />
        <ButtonReco
          type="button"
          className="buttonreco"
          onClick={advance}
          value={word.topIsTrue ? word.falseWord : word.trueWord}
        />
      </RecoBox>
    </div>
  )
}

const RecoBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '50%',
  margin: '20px auto',
})

const ButtonReco = styled('input', {
  border: '0px',
  fontSize: '2rem',
  fontWeight: 400,
  color: '#383838',
  textAlign: 'center',
  background: '#ffd4bd',
  fontFamily: 'monospace',
  margin: '1rem 0rem',
  padding: '1rem .5rem',
  boxShadow: '2px 2px 0 0 rgb(237, 138, 117)',
  '&:hover': {
    backgroundColor: '#ffb78b',
  },
})

export default FormRecognition
