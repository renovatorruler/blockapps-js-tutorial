import React from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

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
            <div>To get you started we've created an HTML page below. Install Blockapps JavaScript library by adding the following line into the &lt;head&gt; section below: </div>
            <div>{this.props.userCode}</div>
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
