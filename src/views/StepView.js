import React from 'react'
import GetBalanceView from 'views/blockapps-intro/GetBalanceView'

export class StepView extends React.Component {
    constructor (props) {
      super(props)
      this.state = {step: parseInt(props.params.step, 10)}
    }

    static propTypes = {
      params: React.PropTypes.object.isRequired
    }
    render () {
      return (
          <div>
            <GetBalanceView step={ this.state.step } />
            <p>This is the page { this.state.step } of the tutorial</p>
          </div>
      )
    }
}

export default StepView
