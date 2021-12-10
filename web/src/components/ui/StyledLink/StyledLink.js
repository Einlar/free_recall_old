import { styled } from 'src/ui/stitches.config'

export const StyledLink = styled('a', {
  font: 'monospace',
  textDecoration: 'none',
  background: 'linear-gradient(to right, $red10, $red11)',
  backgroundClip: 'text',
  color: 'transparent',
  '&:hover': {
    color: '$red11',
  },
})
