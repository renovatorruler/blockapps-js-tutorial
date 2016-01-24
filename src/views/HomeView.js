import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

export class HomeView extends React.Component {

  render () {
    return (
      <div className='container text-center'>
        <h1>Welcome to Blockapps.js Tutorial</h1>
        <hr />
        <Link to='/tutorial/step/1'>Go To the Tutorial</Link>
      </div>
    )
  }
}

export default HomeView
