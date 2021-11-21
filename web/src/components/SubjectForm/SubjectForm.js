import {
  Form,
  Label,
  TextField,
  FieldError,
  SelectField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { globalCss } from '@stitches/react'

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

        <Submit className="button">Conferma i Dati</Submit>
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
})

// const StyledButton = styled(Submit, {
//   fontSize: '1.3em',
//   padding: '0.35em 1.2em',
//   border: '0.1em solid #d61816',
//   margin: '0.3em',
//   borderRadius: '0.12em',
//   boxSizing: 'border-box',
//   textDecoration: 'none',
//   fontFamily: 'Roboto, sans-serif',
//   fontWeight: 300,
//   color: '#d61816',
//   textAlign: 'center',
//   transition: 'all 0.2s',
//   backgroundColor: '#fde2d2',
//   '&:hover': {
//     backgroundColor: '#ffb78b',
//   },
// })
export default SubjectForm
