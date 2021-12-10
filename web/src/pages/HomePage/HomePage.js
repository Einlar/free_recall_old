import { MetaTags } from '@redwoodjs/web'
import { styled } from '@stitches/react'
import SubjectData from 'src/components/SubjectData'

const HomePage = ({ type = 'A' }) => {
  return (
    <>
      <MetaTags
        title="Home"
        // description="Home description"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormFree>
        <SubjectData type={type} />
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
