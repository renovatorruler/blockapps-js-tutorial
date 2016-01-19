import React from 'react'
import AceEditor from 'react-ace'
import Hightlight from 'react-highlight'
import BaseView from './BaseView'
import JSValidator from '../../components/JSValidator'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/github'

import 'highlight.js/styles/default.css'

export class DeployContractView extends BaseView {
    static defaultProps = {
      step: 5,
      validationCode: function () {
        /*eslint-disable */
        Solidity(code).then(function (_) {
          _.newContract(privkey).then(function (_) {
            $("#deploymentAddress").html(r.account.address.toString());
          });
        });
        /*eslint-enable */
      },
      codeBlock: `Solidity(code).then(function (v) {
  v.newContract(privkey).then(function (r) {
      $("#deploymentAddress").html(r.account.address.toString());
  });
});`,
      editableArea: [[24, 0, 25, 0]],
      template: `<html>
  <head>
    <script type="text/javascript" src="libs/blockapps.js"></script>
    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script type="text/javascript">
      //In this step we will deploy a contract
      var blockapps = require('blockapps-js');
      blockapps.query.serverURI = "http://strato-dev2.blockapps.net"
      var Solidity = blockapps.Solidity;

      var code = 'contract SimpleStorage {' +
        'uint storedData;' +
        'function set(uint x) {' +
          'storedData = x;' +
        '}' +
        'function get() constant returns (uint retVal) {' +
          'return storedData;' +
        '}' +
      '}';

      var privkey = "1dd885a423f4e212740f116afa66d40aafdbb3a381079150371801871d9ea281";
      //This needs to be generated for the user using API

      function deployContract(key) {
          [ADD DEPLOY CONTRACT CODE HERE]
      }
      </script>
  </head>
  <body>
    <div>
      Deploy Contract:
      <button onclick="deployContract(privkey)">Deploy</button>
    </div>
    <div id="deploymentAddress"></div>
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
                    height='37em'
                    name='tutorialEditor'
                    value={this.props.template}
                />
            </div>
          </div>
        </div>
      )
    }
}

export default DeployContractView
