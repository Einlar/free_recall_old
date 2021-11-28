import { styled } from 'src/ui/stitches.config'
import { Spinner } from 'src/components/ui/Spinner'

const SkeletonLoader = () => {
  return (
    <Container>
      <p>Sto caricando la pagina...</p>
      <Spinner />
    </Container>
  )
}

export const Container = styled('div', {
  width: '800px',
  fontSize: '18px',
  textAlign: 'center',
})
export default SkeletonLoader
