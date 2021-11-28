import { MetaTags } from '@redwoodjs/web'
import { styled } from '@stitches/react'
import SubjectData from 'src/components/SubjectData'

const HomePage = () => {
  return (
    <>
      <MetaTags
        title="Home"
        // description="Home description"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormFree>
        <p style={{ fontSize: '24px' }}> Ciao! </p>
        <p>
          Sono Francesco Manzali, uno studente di fisica presso
          l&apos;Università di Padova.
        </p>
        <p>
          Come parte della mia tesi magistrale, ricerco semplici leggi che
          spieghino come la mente umana richiami i ricordi.
        </p>
        <p>
          A tal proposito, propongo il seguente esperimento. Si tratta di un
          compito di memoria, che richiederà la tua attenzione per meno di 10
          minuti.
        </p>
        <SubjectData />
      </FormFree>
    </>
  )
}

const FormFree = styled('div', {
  padding: '1rem 0',
  '& p': {
    color: '#202020',
    fontFamily: 'sans-serif',
    fontSize: '18px',
    textAlign: 'justify',
    lineHeight: '1.5',
  },
  '& p a': {
    wordBreak: 'break-all',
    fontSize: '0.95rem',
  },
})

export default HomePage
