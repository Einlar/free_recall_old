import presentationGif from './img/presentation_ita_random.gif'
import recoGif from './img/reco_ita_random.gif'

const ExplainRecognition = ({ nextStep }) => {
  // nextStep: callback to navigate to the next step in the experiment
  return (
    <div className="main_container">
      <p>
        In questo esperimento è richiesta la tua <b>piena attenzione</b> per
        circa <b>5 minuti</b>, perciò scegli un ambiente
        <b>privo di distrazioni</b>.
      </p>
      <ul>
        <li>
          <p>
            Una volta iniziato l&apos;esperimento, ti sarà mostrata una
            <b>serie di parole</b>, una dopo l&apos;altra:
          </p>
        </li>
      </ul>
      <span>
        <img
          src={presentationGif}
          alt="Esempio di presentazione delle parole"
        />
      </span>
      <p>
        Cerca di ricordarne il <b>maggior numero possibile</b>!
      </p>
      <ul>
        <li>
          <span>
            <p>
              <b>Dopo</b> la presentazione, ti saranno mostrate delle
              <b>coppie di parole</b>. In ogni coppia, una parola è presa dalla
              lista che hai appena visto, mentre l&apos;altra non c&apos;entra
              nulla.
            </p>
            <p>
              Fai sempre <b>click</b> sulla <b>parola più familiare</b>, quella
              che pensi di aver <b>già visto</b> nella lista appena presentata.
            </p>
          </span>
        </li>
      </ul>
      <p>
        <img src={recoGif} alt="Esempio di riconoscimento parole" />
      </p>
      <span>
        <p>
          <b>Nota:</b> Questo compito è <b>molto difficile</b>: le parole sono{' '}
          <b>tante</b> e il tempo è poco! Perciò qualche volta può capitare di
          dover tirare a indovinare.
        </p>
        <p>
          Per qualsiasi domanda/feedback puoi contattarmi a{' '}
          <a
            className="linkfree"
            href="mailto:francesco.manzali@studenti.unipd.it"
          >
            francesco.manzali@studenti.unipd.it
          </a>
          .
        </p>
      </span>
      <button type="button" onClick={() => nextStep()}>
        Comincia l&apos;Esperimento
      </button>
    </div>
  )
}

export default ExplainRecognition
