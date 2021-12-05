import { MetaTags } from '@redwoodjs/web'

import { styled } from 'src/ui/stitches.config'
import StatsCell from 'src/components/StatsCell/StatsCell'

const StatsPage = () => {
  return (
    <>
      <MetaTags
        title="Stats"
        // description="Stats description"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <h1>Dashboard</h1>
      <Container>
        <StatsCell />
      </Container>
    </>
  )
}

const Container = styled('div', {
  width: '700px',
})

export default StatsPage
