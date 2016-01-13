import React from 'react'
import { Link } from 'react-router'
import styles from './ProgressBar.scss'

export class ProgressBar extends React.Component {
    static defaultProps = {
      totalSteps: 4,
      currentStep: 3
    }

    static propTypes = {
      totalSteps: React.PropTypes.number,
      currentStep: React.PropTypes.number
    }

    render () {
      let steps = []
      let className, url
      for (let i = 1; i <= this.props.totalSteps; i++) {
        className = 'btn btn-primary'
        url = '/tutorial/step/' + i
        if (i === this.props.currentStep) {
          className += ' active'
        }
        steps.push(<li key={i} style={styles['step']} className={className}><Link to={url}>{i}</Link></li>)
      }
      return (
        <ul className='progressBar btn-group btn-group-lg'>
          {steps}
        </ul>
      )
    }
}

export default ProgressBar
