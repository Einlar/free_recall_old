import { routes, Redirect } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ExperimentRouterCell from 'src/components/ExperimentRouterCell'

const checkUserData = () => {
  const userData =
    localStorage.getItem('userData') &&
    JSON.parse(localStorage.getItem('userData'))

  return userData && userData.email && userData.age && userData.gender
}

const ExperimentPage = ({ type }) => {
  return checkUserData() ? (
    <>
      <MetaTags
        title="Experiment"
        // description="Experiment description"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <ExperimentRouterCell
        {...JSON.parse(localStorage.getItem('userData'))}
        type={type}
      />
    </>
  ) : (
    <Redirect to={routes.home()} />
  )
}

export default ExperimentPage
