import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout'
import HomeView from 'views/HomeView'
import TutorialView from 'views/TutorialView'
import IncludeLibraryView from 'views/blockapps-intro/IncludeLibraryView'
import GetBalanceView from 'views/blockapps-intro/GetBalanceView'
import AboutView from 'views/AboutView'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/about' component={AboutView} />
    <Route path='/tutorial' component={TutorialView}>
        <Route path='step/1' component={IncludeLibraryView}/>
        <Route path='step/2' component={GetBalanceView}/>
    </Route>
  </Route>
)
