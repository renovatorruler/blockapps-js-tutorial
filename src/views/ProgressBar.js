import React from 'react'
import './ProgressBar.scss'
import ClassNames from 'classnames'
import { Link } from 'react-router'

export class ProgressBar extends React.Component {
    static defaultProps = {
      totalSteps: 4,
      currentStep: 1
    }

    static propTypes = {
      totalSteps: React.PropTypes.number,
      currentStep: React.PropTypes.number
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
      return (
        <div className='progressBar btn-group btn-group-lg'>
          {steps.map((step) =>
            <Link to={step.url} className={ClassNames('step btn', {active: step.active}, {'btn-warning': step.completed}, {'btn-default disabled': !step.completed})}>
            {step.index}
            </Link>
          )}
        </div>
      )
    }
}

export default ProgressBar
