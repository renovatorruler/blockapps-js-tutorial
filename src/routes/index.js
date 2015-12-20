import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout'
import HomeView from 'views/HomeView'
import TutorialView from 'views/TutorialView'
import StepView from 'views/StepView'
import AboutView from 'views/AboutView'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/about' component={AboutView} />
    <Route path='/tutorial' component={TutorialView}>
        <Route path='step/:step' component={StepView}/>
    </Route>
  </Route>
)
