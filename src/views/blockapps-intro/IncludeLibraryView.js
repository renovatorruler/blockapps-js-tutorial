import React from 'react'
import AceEditor from 'react-ace'
import Hightlight from 'react-highlight'
import BaseView from './BaseView'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/github'

import 'highlight.js/styles/default.css'

export class IncludeLibraryView extends BaseView {
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
    }

    handleProceed () {
      let userInput = this.state.userCode.split('\n')[2].trim()
      if (userInput === this.props.codeBlock) {
        this.proceedToNextStep()
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
