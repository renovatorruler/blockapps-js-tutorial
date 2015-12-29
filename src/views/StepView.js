import React from 'react'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/github'

export class StepView extends React.Component {
    static propTypes = {
      params: React.PropTypes.object.isRequired
    }
    onChange (newValue) {
      console.log('changed', newValue)
    }
    render () {
      return (
          <div>
            <AceEditor
                mode='javascript'
                theme='github'
                height='400'
                onChange={this.onChange}
                name='Step{this.props.params.step}'
            />
            <p>This is the page { this.props.params.step } of the tutorial</p>
          </div>
      )
    }
}

export default StepView
