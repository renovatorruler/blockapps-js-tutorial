import Structured from 'Structured'

export class JSValidator {
  static validate (code, template) {
    let result = Structured.match(code, template)
    return result
  }
}

export default JSValidator
