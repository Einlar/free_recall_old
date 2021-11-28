import {
  Form,
  Label,
  TextField,
  FieldError,
  SelectField,
  NumberField,
} from '@redwoodjs/forms'
import { globalCss } from '@stitches/react'
import { styled } from 'src/ui/stitches.config'

const SubjectForm = ({ onSubmit: submitCallback }) => {
  globalStyles()

  const onSubmit = (data) => {
    localStorage.setItem('userData', JSON.stringify(data))
    submitCallback()
  }

  return (
    <>
      <p>
        Inserisci qui sotto alcune info di base, che userò solamente per
        differenziare gli esperimenti. Per qualsiasi domanda, puoi scrivere a{' '}
        <a href="mailto:francesco.manzali@studenti.unipd.it">
          francesco.manzali@studenti.unipd.it
        </a>
        .
      </p>

      <Form
        onSubmit={onSubmit}
        style={{
          width: '80%',
          margin: 'auto',
          display: 'grid',
          gridTemplateColumns: '150px 1fr',
          gridGap: '16px',
          marginTop: '24px',
        }}
      >
        <Label name="email" className="label" errorClassName="label error">
          Indirizzo E-mail
        </Label>
        <TextField
          name="email"
          className="input"
          errorClassName="input error"
          validation={{
            required: "L'email è richiesta",
            pattern: {
              value: /[^@]+@[^\.]+\..+/,
              message: 'Inserisci una mail valida',
            },
          }}
        />
        <FieldError name="email" className="error-message" />

        <Label name="age" className="label" errorClassName="label error">
          Età
        </Label>
        <NumberField
          name="age"
          className="input"
          errorClassName="input error"
          validation={{
            required: "L'età è richiesta",
          }}
        />
        <FieldError name="age" className="error-message" />

        <Label name="gender" className="label" errorClassName="label error">
          Genere
        </Label>
        <SelectField
          name="gender"
          className="input"
          validation={{
            required: true,
            validate: {
              matchesInitialValue: (value) => {
                return value !== 'DEFAULT' ? true : 'Il genere è richiesto'
              },
            },
          }}
          defaultValue="DEFAULT"
        >
          <option disabled value="DEFAULT">
            Seleziona
          </option>
          <option value="MALE">Uomo</option>
          <option value="FEMALE">Donna</option>
          <option value="NON_BINARY">Altro</option>
        </SelectField>
        <FieldError name="gender" className="error-message" />

        <SubmitButton type="submit" className="button">
          Conferma i Dati
        </SubmitButton>
      </Form>
    </>
  )
}

const globalStyles = globalCss({
  '.label': {
    gridColumn: '1 / 2',
    float: 'left',
    paddingRight: '24px',
    textAlign: 'right',
  },
  '.input, .button, .error-message': {
    gridColumn: '2 / 3',
  },
  '.input ': {
    padding: '5px',
    fontSize: '16px',
    borderRadius: '7px',
  },
})

const SubmitButton = styled('button', {
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

export default SubjectForm
