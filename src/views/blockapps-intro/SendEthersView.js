import React from 'react'
import AceEditor from 'react-ace'
import Hightlight from 'react-highlight'
import BaseView from './BaseView'
import JSValidator from '../../components/JSValidator'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/github'

import 'highlight.js/styles/default.css'

export class SendEthersView extends BaseView {
    static defaultProps = {
      step: 4,
      validationCode: function () {
      },
      codeBlock: `var tx = Transaction({
  "value": ethValue(10000).in("ether")
});

tx.send(privkeyFrom, addressTo).then(function (result) {
  updateBalance();
});`,
      editableArea: [[17, 0, 18, 0]],
      template: `<html>
  <head>
    <script type="text/javascript" src="libs/blockapps.js"></script>
    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script type="text/javascript">
      //In this step we will try to send some ethers from one account to another
      var blockapps = require('blockapps-js');
      var faucet = blockapps.routes.faucet;
      var Account = blockapps.ethbase.Account;
      var Transaction = blockapps.ethbase.Transaction;
      var ethValue = blockapps.ethbase.Units.ethValue

      var addressTo = "0x16ae8aaf39a18a3035c7bf71f14c507eda83d3e3";
      var addressFrom = "0xe1fd0d4a52b75a694de8b55528ad48e2e2cf7859";
      var privkeyFrom = "1dd885a423f4e212740f116afa66d40aafdbb3a381079150371801871d9ea281"

      function sendEthers() {
        [Add Send ethers code here]
      }

      function updateBalance() {
        Account(addressTo).balance.then(function (balance) {
          $("#balanceA").html(balance.toString());
        });
        Account(addressFrom).balance.then(function (balance) {
          $("#balanceB").html(balance.toString());
        });
      }

      function getEthers(address) {
        faucet(address).then(function () {
          updateBalance();
        });
      }
    </script>
  </head>
  <body onload="updateBalance()">
    <div>
      Balance Account A: <span id="balanceA"></span>
    </div>
    <div>
      Balance Account B: <span id="balanceB"></span>
      <button onclick="getEthers(privkeyFrom)">Get Ethers</button>
    </div>
    <button onclick="sendEthers()">Send Ethers</button>
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
                    height='32em'
                    name='tutorialEditor'
                    value={this.props.template}
                />
            </div>
          </div>
        </div>
      )
    }
}

export default SendEthersView
