import React from 'react'
import { Link } from 'react-router'

export class TutorialView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>Blockapps Tutorial</h1>
        {this.props.children}
        <hr />
        <Link to='/'>Back To Home</Link>
      </div>
    )
  }
}

export default TutorialView
