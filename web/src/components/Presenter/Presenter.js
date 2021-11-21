import { useState, useEffect } from 'react'
import { styled } from '@stitches/react'

const Presenter = ({ wordList, endPresentation }) => {
  const [index, setIndex] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    console.log(wordList)
  }, [wordList])

  //Show a word for 1s
  const showWord = () => {
    setShow(true)
    setTimeout(nextWord, 1000)
  }

  //Remove current word and advance the index
  const nextWord = () => {
    setShow(false)
    setIndex((prevIndex) => prevIndex + 1)
  }

  //Show all words, one at a time, and call `endPresentation` at the end
  useEffect(() => {
    if (index < wordList.length) {
      setTimeout(showWord, 500)
    } else {
      setTimeout(endPresentation, 1000)
    }
  }, [index])
  return (
    <PresentWord>
      {index} {show && wordList[index].word}
    </PresentWord>
  )
}

const PresentWord = styled('div', {
  fontSize: '40px',
  fontWeight: 400,
  textAlign: 'center',
  color: '#383838',
  fontFamily: 'monospace',
  padding: '0.5em',
  margin: '1em',
  maxWidth: '90%',
})

export default Presenter
