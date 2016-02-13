import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout'
import HomeView from 'views/HomeView'
import TutorialView from 'views/TutorialView'
import IncludeLibraryView from 'views/blockapps-intro/IncludeLibraryView'
import GetBalanceView from 'views/blockapps-intro/GetBalanceView'
import UseFaucetView from 'views/blockapps-intro/UseFaucetView'
import SendEthersView from 'views/blockapps-intro/SendEthersView'
import DeployContractView from 'views/blockapps-intro/DeployContractView'
import InteractContractView from 'views/blockapps-intro/InteractContractView'
import FinishedView from 'views/blockapps-intro/FinishedView'
import StepView from 'views/StepView'
import AboutView from 'views/AboutView'

export default (
  <Route path='./' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/about' component={AboutView} />
    <Route path='/tutorial' component={TutorialView}>
      <Route path='step' component={StepView}>
        <Route path='1' component={IncludeLibraryView}/>
        <Route path='2' component={GetBalanceView}/>
        <Route path='3' component={UseFaucetView}/>
        <Route path='4' component={SendEthersView}/>
        <Route path='5' component={DeployContractView}/>
        <Route path='6' component={InteractContractView}/>
      </Route>
      <Route path='finished' component={FinishedView}/>
    </Route>
  </Route>
)
