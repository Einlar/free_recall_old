import { MetaTags } from '@redwoodjs/web'

const ThankYouPage = () => {
  return (
    <>
      <MetaTags
        title="ThankYou"
        // description="ThankYou description"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <div>
        <p>
          L&apos;esperimento è andato a buon fine! Grazie per avere partecipato!
        </p>
        <p>
          Puoi ora <b>chiudere</b> questa pagina.
        </p>
      </div>
    </>
  )
}

export default ThankYouPage
