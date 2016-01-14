import React from 'react'
import styles from './ProgressBar.scss'
import ClassNames from 'classnames'

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
          step = {index: i}
          if (i === this.props.currentStep) {
            step.active = true
          }
        steps.push(step)
      }
      return (
        <ul className='progressBar btn-group btn-group-lg'>
          {steps.map((step) => 
            <li key={step.index} className={ClassNames('step btn btn-primary', {active: step.active})}>{step.index}</li>
          )}
        </ul>
      )
    }
}

export default ProgressBar
