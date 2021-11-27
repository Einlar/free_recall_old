import { useState } from 'react'

import Presenter from 'src/components/Presenter'

const ExperimentSteps = ({
  explain: ExplainComponent,
  form: FormComponent,
  words,
  categories,
  subjectId,
}) => {
  const [step, setStep] = useState(0)

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1)
    //TODO Add an ending state
  }

  return (
    <>
      {step === 0 && <ExplainComponent nextStep={nextStep} />}
      {step === 1 && <Presenter wordList={words} endPresentation={nextStep} />}
      {step === 2 && (
        <FormComponent
          presentedWords={words}
          subjectId={subjectId}
          categories={categories}
        />
      )}
    </>
  )
}

export default ExperimentSteps
