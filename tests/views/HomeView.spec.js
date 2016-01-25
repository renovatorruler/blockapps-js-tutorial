import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { bindActionCreators } from 'redux'
import { HomeView } from 'views/HomeView'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<HomeView {...props} />)
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<HomeView {...props} />)
}

describe('(View) Home', function () {
  let _component, _rendered, _props, _spies

  beforeEach(function () {
    _spies = {}
    _props = {
      counter: 0,
      ...bindActionCreators({
      }, _spies.dispatch = sinon.spy())
    }

    _component = shallowRenderWithProps(_props)
    _rendered = renderWithProps(_props)
  })

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div')
  })

  it('Should include a Link to the Tutorial.', function () {
    const tutorialLink = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'a')

    expect(tutorialLink).to.exist
    expect(tutorialLink.href).to.match(/tutorial/)
  })
})
