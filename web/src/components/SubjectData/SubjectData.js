import SubjectForm from 'src/components/SubjectForm'
import { useState } from 'react'
import { navigate, routes } from '@redwoodjs/router'
import { styled } from 'src/ui/stitches.config'

const SubjectData = ({ type = 'A' }) => {
  const userData =
    localStorage.getItem('userData') &&
    JSON.parse(localStorage.getItem('userData'))

  const startShowForm = !(
    userData &&
    userData.email &&
    userData.age &&
    userData.gender
  )

  const [showForm, setShowForm] = useState(startShowForm)

  const genderMap = {
    MALE: 'Uomo',
    FEMALE: 'Donna',
    NON_BINARY: 'Altro',
  }
  const goNext = () => {
    navigate(routes.experiment({ type }))
  }

  const clearData = () => {
    localStorage.removeItem('userData')
    setShowForm(true)
  }

  return showForm ? (
    <SubjectForm onSubmit={() => setShowForm(false)} />
  ) : (
    <div>
      <p>Hai già inserito i tuoi dati! Conferma solo che siano corretti:</p>
      <p>
        <strong>E-mail: </strong>
        {userData.email}
      </p>
      <p>
        <strong>Età: </strong>
        {userData.age}
      </p>
      <p>
        <strong>Genere: </strong>
        {genderMap[userData.gender]}
      </p>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <EditButton type="button" onClick={clearData}>
          Modifica Dati
        </EditButton>
        <NextButton type="button" onClick={goNext}>
          Comincia l&apos;esperimento!
        </NextButton>
      </div>
    </div>
  )
}

const EditButton = styled('button', {
  backgroundColor: '$blue9',
  color: '#fff',
  fontSize: '16px',
  border: '2px solid $blue11',
  padding: '10px',
  borderRadius: '5px',
  '&:hover': {
    backgroundColor: '$blue10',
    borderColor: '$blue12',
  },
})

const NextButton = styled('button', {
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

export default SubjectData
