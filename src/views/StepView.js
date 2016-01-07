import React from 'react'

export class StepView extends React.Component {
    constructor (props) {
      super(props)
      const childProps = props.children.props
      this.state = {step: parseInt(childProps.step, 10)}
    }

    static propTypes = {
      children: React.PropTypes.element,
      history: React.PropTypes.object,
      step: React.PropTypes.number
    }

    componentWillReceiveProps (nextProps) {
      this.setState({step: nextProps.children.props.step})
    }

    render () {
      return (
          <div>
            {this.props.children}
            <p>This is the page { this.state.step } of the tutorial</p>
          </div>
      )
    }
}

export default StepView
