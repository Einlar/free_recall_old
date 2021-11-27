import { useMutation } from '@redwoodjs/web'
import { useState, useEffect } from 'react'
import { navigate, routes } from '@redwoodjs/router'
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
      setWord(getWord(index))
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
    <div className="recobox">
      <input
        type="button"
        className="buttonreco"
        onClick={advance}
        value={word.topIsTrue ? word.trueWord : word.falseWord}
      />
      <input
        type="button"
        className="buttonreco"
        onClick={advance}
        value={word.topIsTrue ? word.falseWord : word.trueWord}
      />
    </div>
  )
}

export default FormRecognition
