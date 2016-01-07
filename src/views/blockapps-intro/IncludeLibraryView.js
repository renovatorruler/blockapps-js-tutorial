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

export class IncludeLibraryView extends React.Component {
    static defaultProps = {
      step: 1,
      codeBlock: `<script type="text/javascript" src="libs/blockapps-min.js"></script>`,
      editableArea: [[2, 0, 3, 0]],
      template: `<html>
  <head>
    [ADD THE SCRIPT TAG HERE]
  </head>
  <body>
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
      editor.moveCursorTo(2, 0)

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
      let userInput = this.state.userCode.split('\n')[2].trim()
      if (userInput === this.props.codeBlock) {
        this.props.history.push('/tutorial/step/2')
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
                <Hightlight className='html'>{this.props.codeBlock}</Hightlight>
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
                    width='100%'
                    height='15em'
                    name='includeLibraryEditor'
                    editorProps={{$blockScrolling: true}}
                    value={this.props.template}
                />
            </div>
          </div>
        </div>
      )
    }
}

export default IncludeLibraryView
