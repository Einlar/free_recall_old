import { Router, Route, Set } from '@redwoodjs/router'
import HomeLayout from './layouts/HomeLayout/HomeLayout'
import SkeletonLoader from 'src/components/SkeletonLoader'

const Routes = () => {
  return (
    <Router>
      <Set wrap={HomeLayout} whileLoadingPage={SkeletonLoader} pageLoadingDelay={500}>
        <Route path="/stats" page={StatsPage} name="stats" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/experiment" page={ExperimentPage} name="experiment" />
        <Route path="/thank-you" page={ThankYouPage} name="thankYou" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
