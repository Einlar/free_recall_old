import { styled, globalCss } from '@stitches/react'

const HomeLayout = ({ children }) => {
  globalStyles()

  return (
    <Body>
      <Wrapper>
        <Main>{children}</Main>
        <Footer>
          <Copyright>
            <li>Experiment</li>
            <li>
              Design: <a href="https://html5up.net/astral">HTML5 UP</a>
            </li>
            <li>
              Demo images: <a href="https://unsplash.com">Unsplash</a>
            </li>
          </Copyright>
        </Footer>
      </Wrapper>
    </Body>
  )
}

const globalStyles = globalCss({
  body: { margin: 0 },
})

const Body = styled('div', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: '#de6262 linear-gradient(to right, #ffb88c, #de6262)',
  overflowY: 'scroll',
})

const Wrapper = styled('div', {
  width: '50em',
  margin: '0 auto',
  minHeight: '100vh',
  maxWidth: '90%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

const Main = styled('div', {
  display: 'block',
  position: 'relative',
  overflow: 'hidden',
  background: '#f2f2f2',
  padding: '0 2em',
  boxShadow: '0px 1px 0px 0px rgb(0 0 0 / 25%)',
})

const Footer = styled('div', {
  color: 'rgba(255, 255, 255, 0.45)',
  textAlign: 'center',
  padding: '2em 0 0 0',
  fontSize: '0.75em',
  display: 'block',
  '& a': {
    color: 'rgba(255, 255, 255, 0.65)',
    transition: 'color 0.25s ease-in-out',
  },
})

const Copyright = styled('ul', {
  listStyle: 'none',
  paddingLeft: 0,
  '& li': {
    display: 'inline-block',
    borderLeft: 'solid 1px rgba(255, 255, 255, 0.25)',
    lineHeight: 1,
    paddingLeft: '1em',
    paddingRight: '1em',
  },
  '& li:first-child': {
    paddingLeft: 0,
    marginLeft: 0,
    borderLeft: 0,
  },
})

export default HomeLayout
