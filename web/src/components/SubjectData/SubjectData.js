import SubjectForm from 'src/components/SubjectForm'
import { useState } from 'react'
import { navigate, routes } from '@redwoodjs/router'

const SubjectData = () => {
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
    navigate(routes.experiment())
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
      <button type="button" onClick={clearData}>
        Modifica Dati
      </button>
      <button type="button" onClick={goNext}>
        Comincia l&apos;esperimento!
      </button>
    </div>
  )
}

export default SubjectData
