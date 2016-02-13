import React from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/github'

import 'highlight.js/styles/default.css'

export class InteractContractView extends React.Component {
    static propTypes = {
      template: React.PropTypes.string
    }

    static defaultProps = {
      template: `<html>
  <head>
    <script type="text/javascript" src="libs/blockapps.js"></script>
    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script type="text/javascript">
      //In this step we will interact with a deployed contract
      var blockapps = require('blockapps-js');
      blockapps.query.serverURI = "http://strato-dev2.blockapps.net"
      var Solidity = blockapps.Solidity;

      var contractObj;

      var code = 'contract SimpleStorage {' +
        'uint storedData;' +
        'function set(uint x) {' +
          'storedData = x;' +
        '}' +
        'function get() constant returns (uint retVal) {' +
          'return storedData;' +
        '}' +
      '}';

      var privkey =
        "1dd885a423f4e212740f116afa66d40aafdbb3a381079150371801871d9ea281";
      //This needs to be generated for the user using API

      function deployContract(key) {
        return Solidity(code).then(function (v) {
          return v.newContract(privkey).then(function (r) {
            $("#contractAddress").html(r.account.address.toString());
            contractObj = r;
            return r;
          });
        });
      }

      function setValue() {
        var val = $("#value").val();
        contractObj.state.set(val).callFrom(privkey);
      }

      deployContract(privkey);
      </script>
  </head>
  <body>
      <div>
          Deploy Contract: <span id="contractAddress"></span>
      </div>
      <div>
          <button onClick="setValue()">Set</button>
          <input type="text" id="value"/>
      </div>
  </body>
</html>`
    }

    render () {
      return (
        <div>
          <div className='row'>
            <div className='col-md-12'>Congratulations, you have successfully created your DAPP by deploying a contract and interacting with it.</div>
            <div className='col-md-12'>You can use blockapps-js library in your own projects. Click below to signup with Blockapps and deploy your own DApps on Ethereum network.</div>
          </div>
          <div className='row'>
              <div className='col-md-4'>
                <button className='btn btn-success' onClick={this.handleProceed}>Take me to my account</button>
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
                    height='55em'
                    name='tutorialEditor'
                    value={this.props.template}
                />
            </div>
          </div>
        </div>
      )
    }
}

export default InteractContractView
