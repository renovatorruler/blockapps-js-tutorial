import React from 'react'

export class StepView extends React.Component {
    static propTypes = {
      params: React.PropTypes.object.isRequired
    }
    render () {
      return (
          <p>This is the page { this.props.params.step } of the tutorial</p>
      )
    }
}

export default StepView
