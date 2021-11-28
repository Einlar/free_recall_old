import { styled } from '@stitches/react'

export const Button = styled('button', {
  backgroundColor: '$red9',
  color: '#fff',
  fontSize: '16px',
  padding: '10px',
  border: '2px solid $red11',
  borderRadius: '5px',
  marginLeft: '10px',
  '&:hover': {
    backgroundColor: '$red10',
    borderColor: '$red12',
  },
})
