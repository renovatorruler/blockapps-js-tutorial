import React from 'react'
import AceEditor from 'react-ace'
import Hightlight from 'react-highlight'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

import 'highlight.js/styles/default.css'

export class IncludeLibraryView extends React.Component {
    static defaultProps = {
      userCode: `<script type="text/javascript" src="libs/blockapps-min.js"></script>`,
      code: `<html>
  <head>
    [ADD THE SCRIPT TAG HERE]
  </head>
  <body>
  </body>
</html>`
    }

    static propTypes = {
      step: React.PropTypes.number.isRequired,
      userCode: React.PropTypes.string,
      code: React.PropTypes.string
    }
    onChange (newValue) {
      console.log('changed', newValue)
    }
    onLoad (editor) {
      editor.renderer.setScrollMargin(10, 10, 10, 10)
      editor.getSession().setUseWorker(false)
      editor.moveCursorTo(2, 0)
    }
    render () {
      return (
          <div>
            <div>Blockapps relies on a library that you include in your app. This library provides you easy access to Firebase's authentication and database features.</div>
            <div>To get you started we've created an HTML page below. Install Blockapps JavaScript library by adding the following line into the &lt;head&gt; section below: </div>
            <Hightlight className='html'>{this.props.userCode}</Hightlight>
            <AceEditor
                mode='html'
                theme='monokai'
                onChange={this.onChange}
                onLoad={this.onLoad}
                name='editor'
                width='80em'
                height='25em'
                editorProps={{$blockScrolling: true}}
                value={this.props.code}
            />
          </div>
      )
    }
}

export default IncludeLibraryView
