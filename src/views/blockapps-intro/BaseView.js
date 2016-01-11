import React from 'react'
import Ace from 'brace'

import 'brace/mode/html'
import 'brace/mode/javascript'
import 'brace/theme/github'

import 'highlight.js/styles/default.css'

const Anchor = Ace.acequire('ace/anchor').Anchor
const Range = Ace.acequire('ace/range').Range

export class BaseView extends React.Component {
    static propTypes = {
      step: React.PropTypes.number,
      history: React.PropTypes.object,
      codeBlock: React.PropTypes.string,
      editableArea: React.PropTypes.array,
      template: React.PropTypes.string
    }

    constructor (props) {
      super(props)
      this.state = {
        editor: {},
        boundaryAnchors: [],
        userCode: this.props.template
      }
      this.handleProceed = this.handleProceed.bind(this)
      this.handleKeyboard = this.handleKeyboard.bind(this)
      this.onEditorLoad = this.onEditorLoad.bind(this)
      this.onEditorChange = this.onEditorChange.bind(this)
    }

    onEditorChange (newValue) {
      this.state.userCode = newValue
    }

    onEditorLoad (editor) {
      this.state.editor = editor
      this.state.document = editor.getSession().getDocument()

      editor.renderer.setScrollMargin(10, 10, 10, 10)
      editor.getSession().setUseWorker(false)

      let startAnchor, endAnchor, editableRange
      for (let area of this.props.editableArea) {
        startAnchor = new Anchor(this.state.document, area[0], area[1])
        startAnchor.$insertRight = true
        endAnchor = new Anchor(this.state.document, area[2], area[3])
        editableRange = Range.fromPoints(startAnchor.getPosition(), endAnchor.getPosition())
        editor.getSession().addMarker(editableRange, 'ace_active-line', 'fullline')
        this.state.boundaryAnchors.push({
          start: startAnchor,
          end: endAnchor
        })
        startAnchor.on('change', this.handleKeyboard)
        endAnchor.on('change', this.handleKeyboard)
      }

      editor.keyBinding.addKeyboardHandler({
        handleKeyboard: this.handleKeyboard
      })
    }

    proceedToNextStep () {
      this.props.history.push('/tutorial/step/' + (this.props.step + 1))
    }

    extractText () {
      let extractedText = []
      let editableRange
      for (let boundaryAnchor of this.state.boundaryAnchors) {
        editableRange = Range.fromPoints(boundaryAnchor.start.getPosition(), boundaryAnchor.end.getPosition())
        extractedText.push(this.state.document.getTextRange(editableRange))
      }
      return extractedText
    }

    handleKeyboard (data, hash, keyString, keyCode, event) {
      if (hash === -1 || (keyCode >= 37 && keyCode <= 40)) return false

      const cursorPosition = this.state.editor.getCursorPosition()
      const editor = this.state.editor
      let editableRange
      let insideReadOnly = false
      for (let boundaryAnchor of this.state.boundaryAnchors) {
        editableRange = Range.fromPoints(boundaryAnchor.start.getPosition(), boundaryAnchor.end.getPosition())
        editor.getSession().addMarker(editableRange, 'ace_active-line', 'fullline')
        insideReadOnly = !editableRange.contains(cursorPosition.row, cursorPosition.column)
      }
      if (insideReadOnly) {
        return {command: 'null', passEvent: false}
      }
    }
}

export default BaseView
