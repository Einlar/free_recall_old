import { Router, Route, Set } from '@redwoodjs/router'
import HomeLayout from './layouts/HomeLayout/HomeLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={HomeLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/experiment" page={ExperimentPage} name="experiment" />
        <Route path="/thank-you" page={ThankYouPage} name="thankYou" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
