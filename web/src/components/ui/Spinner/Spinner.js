import { styled, keyframes } from 'src/ui/stitches.config'

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

//Adapted from these open source spinners (https://loading.io/css/)
export const Spinner = styled('div', {
  display: 'inline-block',
  width: '30px',
  height: '30px',
  marginBottom: '10px',
  '&::after': {
    margin: 'auto',
    content: ' ',
    display: 'block',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: '3px solid',
    borderColor: '#333 transparent',
    animation: `${spin} 1.2s linear infinite`,
  },
})
