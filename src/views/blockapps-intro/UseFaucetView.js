import React from 'react'
import AceEditor from 'react-ace'
import Hightlight from 'react-highlight'
import BaseView from './BaseView'
import JSValidator from '../../components/JSValidator'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/github'

import 'highlight.js/styles/default.css'

export class UseFaucetView extends BaseView {
    static defaultProps = {
      step: 3,
      validationCode: function () {
        Faucet(_).then(function () { // eslint-disable-line no-undef
          updateBalance(); // eslint-disable-line no-undef, semi
        }); // eslint-disable-line semi
      },
      codeBlock: `Faucet(address).then(function () {
  updateBalance();
});`,
      editableArea: [[18, 0, 19, 0]],
      template: `<html>
  <head>
    <script type="text/javascript" src="libs/blockapps-min.js"></script>
    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script type="text/javascript">
      var blockapps = require('blockapps-js');
      var Faucet = blockapps.routes.faucet;
      var Account = blockapps.ethbase.Account;

      var address = "0x16ae8aaf39a18a3035c7bf71f14c507eda83d3e3"

      function updateBalance() {
        Account(address).balance.then(function (balance) {
          document.getElementById("balance").innerHTML = balance.toString();
        });
      }

      function getEthers() {
        [ADD get ethers CODE HERE]
      }
    </script>
  </head>
  <body onload="updateBalance()">
    Balance:
    <span id="balance"></span>
    <button onclick="getEthers()">Get Ethers</button>
  </body>
</html>`
    }

    constructor (props) {
      super(props)
    }

    handleProceed () {
      let userInput = this.extractText()
      let validationResult = JSValidator.validate(userInput[0], this.props.validationCode)
      if (validationResult) {
        this.proceedToNextStep()
      }
    }

    render () {
      return (
        <div>
          <div className='row'>
            <div className='col-md-12'>To help you get started with development, we provide a faucet (only available on our testnetwork).</div>
          </div>
          <div className='row'>
              <div className='col-md-8'>
                <Hightlight className='javascript'>{this.props.codeBlock}</Hightlight>
              </div>
              <div className='col-md-4'>
                <button className='btn btn-success' onClick={this.handleProceed}>I used the faucet</button>
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
                    height='40em'
                    name='tutorialEditor'
                    value={this.props.template}
                />
            </div>
          </div>
        </div>
      )
    }
}

export default UseFaucetView
