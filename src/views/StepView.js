import React from 'react'
import GetBalanceView from 'views/blockapps-intro/GetBalanceView'
import IncludeLibraryView from 'views/blockapps-intro/IncludeLibraryView'

export class StepView extends React.Component {
    constructor (props) {
      super(props)
      this.state = {step: parseInt(props.params.step, 10)}
    }

    static propTypes = {
      history: React.PropTypes.object,
      params: React.PropTypes.object.isRequired
    }

    render () {
      let view
      if (this.state.step === 1) {
        view = <IncludeLibraryView step={this.state.step} history={this.props.history} />
      } else if (this.state.step === 2) {
        view = <GetBalanceView step={this.state.step} history={this.props.history}/>
      }
      return (
          <div>
            {view}
            <p>This is the page { this.state.step } of the tutorial</p>
          </div>
      )
    }
}

export default StepView
