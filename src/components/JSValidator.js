import Structured from 'structured'

export class JSValidator {
  static validate (code, template) {
    let result = Structured.match(code, template)
    return result
  }
}

export default JSValidator
