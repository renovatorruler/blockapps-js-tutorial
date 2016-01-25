import React from 'react'
import './ProgressBar.scss'
import ClassNames from 'classnames'
import { Link } from 'react-router'

export class ProgressBar extends React.Component {
    static defaultProps = {
      totalSteps: 4,
      currentStep: 1,
      finalStep: false
    }

    static propTypes = {
      totalSteps: React.PropTypes.number,
      currentStep: React.PropTypes.number,
      finalStep: React.PropTypes.boolean
    }

    render () {
      let steps = []
      let step
      for (let i = 1; i <= this.props.totalSteps; i++) {
        step = {
          index: i,
          url: '/tutorial/step/' + i
        }
        if (i === this.props.currentStep) {
          step.active = true
        }
        if (i < this.props.currentStep) {
          step.completed = true
        }
        steps.push(step)
      }

      let finalStepButton
      if (this.props.finalStep) {
        finalStepButton = <Link to='/tutorial/finished' className={ClassNames('step btn btn-default')}>>></Link>
      }
      return (
        <div className='progressBar btn-group btn-group-lg'>
          {steps.map((step) =>
            <Link key={step.index} to={step.url} className={ClassNames('step btn', {active: step.active}, {'btn-warning': step.completed}, {'btn-default disabled': !step.completed})}>
            {step.index}
            </Link>
          )}
          {finalStepButton}
        </div>
      )
    }
}

export default ProgressBar
