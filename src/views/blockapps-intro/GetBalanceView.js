import React from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

export class GetBalanceView extends React.Component {
    static defaultProps = {
      step: 2,
      code: `<html>
  <head>
    <script type="text/javascript" src="libs/blockapps-min.js"></script>
    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script type="text/javascript">
      //This example showcases simple address fetching
      var blockapps = require('blockapps-js');
      var Account = blockapps.ethbase.Account;

      var address = '0x16ae8aaf39a18a3035c7bf71f14c507eda83d3e3'

      Account(address).balance.then(function (balance) {
        $('balance').innerHTML = balance.toString();
      });
    </script>
  </head>
  <body>
    Balance:
    <span id="balance"></span>
  </body>
</html>`
    }

    static propTypes = {
      step: React.PropTypes.number,
      code: React.PropTypes.string
    }
    onChange (newValue) {
      console.log('changed', newValue)
    }
    onLoad (editor) {
      editor.renderer.setScrollMargin(10, 10, 10, 10)
    }
    render () {
      return (
          <div>
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

export default GetBalanceView
