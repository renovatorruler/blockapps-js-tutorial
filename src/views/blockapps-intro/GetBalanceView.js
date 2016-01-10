import React from 'react'
import AceEditor from 'react-ace'
import Hightlight from 'react-highlight'
import BaseView from './BaseView'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/github'

import 'highlight.js/styles/default.css'

export class GetBalanceView extends BaseView {
    static defaultProps = {
      step: 2,
      codeBlock: `Account(address).balance.then(function (balance) {
  $('balance').innerHTML = balance.toString();
});`,
      editableArea: [[11, 0, 12, 0]],
      template: `<html>
  <head>
    <script type="text/javascript" src="libs/blockapps-min.js"></script>
    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script type="text/javascript">
      //This example showcases simple address fetching
      var blockapps = require('blockapps-js');
      var Account = blockapps.ethbase.Account;

      var address = '0x16ae8aaf39a18a3035c7bf71f14c507eda83d3e3'

      [ADD balance() HERE]

    </script>
  </head>
  <body>
    Balance:
    <span id="balance"></span>
  </body>
</html>`
    }

    constructor (props) {
      super(props)
    }

    handleProceed () {
      let userInput = this.state.userCode.split('\n')[11].trim()
      if (userInput === this.props.codeBlock) {
        this.props.history.push('/tutorial/step/' + (this.props.step + 1))
      } else {
        this.state.invalidInput = true
      }
    }

    render () {
      return (
        <div>
          <div className='row'>
            <div className='col-md-12'>Blockapps relies on a library that you include in your app. This library provides you easy access to Firebase's authentication and database features.</div>
            <div className='col-md-12'>To get you started we've created an HTML page below. Install Blockapps JavaScript library by adding the following line into the &lt;head&gt; section below: </div>
          </div>
          <div className='row'>
              <div className='col-md-8'>
                <Hightlight className='javascript'>{this.props.codeBlock}</Hightlight>
              </div>
              <div className='col-md-4'>
                <button className='btn btn-success' onClick={this.handleProceed}>I installed the Blockapps Library &raquo;</button>
              </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
                <AceEditor
                    mode='html'
                    theme='github'
                    onChange={this.onEditorChange}
                    onLoad={this.onEditorLoad}
                    highlightActiveLine={false}
                    width='85%'
                    height='30em'
                    name='tutorialEditor'
                    value={this.props.template}
                />
            </div>
          </div>
        </div>
      )
    }
}

export default GetBalanceView
