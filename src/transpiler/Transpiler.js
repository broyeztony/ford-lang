
class Transpiler {
  constructor (inputAst) {
    this.inputAst = inputAst;
    this.outputAst = { data: { sources: { "contract.sol": { ast: {} } } } }
  }
  transpile() {
    console.log('@ transpile', this.inputAst['type'], this.inputAst['name'])
    return this.outputAst
  }

}

module.exports = {
  Transpiler
}
