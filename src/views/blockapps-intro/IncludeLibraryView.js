import React from 'react'
import AceEditor from 'react-ace'
import Hightlight from 'react-highlight'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

import 'highlight.js/styles/default.css'

export class IncludeLibraryView extends React.Component {
    static defaultProps = {
      codeBlock: `<script type="text/javascript" src="libs/blockapps-min.js"></script>`,
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
        userCode: this.props.template
      }
      this.handleProceed = this.handleProceed.bind(this)
      this.onEditorLoad = this.onEditorLoad.bind(this)
      this.onEditorChange = this.onEditorChange.bind(this)
    }

    static state = {
      userCode: 'usercode'
    }

    static propTypes = {
      step: React.PropTypes.number.isRequired,
      codeBlock: React.PropTypes.string,
      template: React.PropTypes.string
    }

    onEditorChange (newValue) {
      this.state.userCode = newValue
    }

    onEditorLoad (editor) {
      editor.renderer.setScrollMargin(10, 10, 10, 10)
      editor.getSession().setUseWorker(false)
      editor.moveCursorTo(2, 0)
    }

    handleProceed () {
      console.log(this.state.userCode)
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
                    theme='monokai'
                    onChange={this.onEditorChange}
                    onEditorLoad={this.onEditorLoad}
                    width='100%'
                    height='15em'
                    name='editor'
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
