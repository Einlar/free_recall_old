import presentationGif from './img/presentation_ita_random.gif'
import recallGif from './img/recall_ita_random.gif'

const ExplainRecall = ({ nextStep }) => {
  return (
    <div className="main_container">
      <p>
        In questo esperimento è richiesta la tua <b>piena attenzione</b> per al
        massimo <b>7 minuti</b>, perciò scegli un ambiente{' '}
        <b>privo di distrazioni</b>.
      </p>
      <ul>
        <li>
          <p>
            Una volta iniziato l&apos;esperimento ti sarà mostrata una{' '}
            <b>serie di parole</b>, una dopo l&apos;altra:
          </p>
        </li>
      </ul>
      <p>
        <img src={presentationGif} alt="loading gif..." />
      </p>
      <span>
        <p>
          Cerca di ricordarne il <b>maggior numero possibile!</b>
        </p>
      </span>
      <ul>
        <li>
          <p>
            <b>Dopo</b> la presentazione, ti sarà chiesto di <b>scrivere</b> le
            parole che <b>ricordi</b>, in un <b>ordine qualsiasi</b>, entro un
            tempo prefissato:
          </p>
        </li>
      </ul>
      <p>
        <img src={recallGif} alt="loading gif..." />
      </p>
      <span>
        <p>
          {/* Inserire qualcosa sui typo / intrusions? */}
          Questo compito è <b>molto difficile</b>: le parole sono <b>tante</b> e
          il tempo è poco! Perciò non scoraggiarti se non riuscissi a ricordare
          tutto quanto. Puoi sempre terminare l&apos;esperimento in anticipo, se
          ti accorgi di non ricordare più nulla.
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

export default ExplainRecall
