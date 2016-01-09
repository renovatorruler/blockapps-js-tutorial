import React from 'react'
import AceEditor from 'react-ace'
import Hightlight from 'react-highlight'
import Ace from 'brace'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/github'

import 'highlight.js/styles/default.css'

const Anchor = Ace.acequire('ace/anchor').Anchor
const Range = Ace.acequire('ace/range').Range

export class GetBalanceView extends React.Component {
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
      this.state = {
        editor: {},
        editableRanges: [],
        userCode: this.props.template
      }
      this.handleProceed = this.handleProceed.bind(this)
      this.handleKeyboard = this.handleKeyboard.bind(this)
      this.onEditorLoad = this.onEditorLoad.bind(this)
      this.onEditorChange = this.onEditorChange.bind(this)
    }

    static state = {
      userCode: 'usercode'
    }

    static propTypes = {
      step: React.PropTypes.number,
      history: React.PropTypes.object,
      codeBlock: React.PropTypes.string,
      editableArea: React.PropTypes.array,
      template: React.PropTypes.string
    }

    onEditorChange (newValue) {
      this.state.userCode = newValue
    }

    onEditorLoad (editor) {
      this.state.editor = editor
      this.state.doc = editor.getSession().getDocument()

      editor.renderer.setScrollMargin(10, 10, 10, 10)
      editor.getSession().setUseWorker(false)
      editor.moveCursorTo(11, 0)

      let startAnchor, endAnchor, editableRange
      for (let area of this.props.editableArea) {
        startAnchor = new Anchor(this.state.doc, area[0], area[1])
        endAnchor = new Anchor(this.state.doc, area[2], area[3])
        editableRange = Range.fromPoints(startAnchor.getPosition(), endAnchor.getPosition())
        editor.getSession().addMarker(editableRange, 'ace_active-line', 'fullline')
        this.state.editableRanges.push(editableRange)
      }

      editor.keyBinding.addKeyboardHandler({
        handleKeyboard: this.handleKeyboard
      })
    }

    handleKeyboard (data, hash, keyString, keyCode, event) {
      if (hash === -1 || (keyCode <= 40 && keyCode >= 37)) return false

      const cursorPosition = this.state.editor.getCursorPosition()
      let insideReadOnly = false
      for (let editableRange of this.state.editableRanges) {
        insideReadOnly = !editableRange.contains(cursorPosition.row, cursorPosition.column)
      }
      if (insideReadOnly) {
        return {command: 'null', passEvent: false}
      }
    }

    handleProceed () {
      let userInput = this.state.userCode.split('\n')[11].trim()
      if (userInput === this.props.codeBlock) {
        this.props.history.push('/tutorial/step/3')
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
                    name='includeLibraryEditor'
                    value={this.props.template}
                />
            </div>
          </div>
        </div>
      )
    }
}

export default GetBalanceView
