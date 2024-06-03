const {FunctionDeclaration} = require("./FunctionDeclaration");
const {VariableDeclaration} = require("./VariableDeclaration");
const {GetId} = require("./utils");
const {StateVariableDeclaration} = require("./StateVariableDeclaration");
const {Contract} = require("./inputs/Contract");

global.currentId = 0
global.currentScope = 0
global.source = '0:0:0'
global.metadata = null

class Transpiler {
  constructor (inputAst, metadata) {
    this.inputAst = inputAst;
    global.metadata = metadata;
    this.outputAst = { data: { sources: { 'playground.sol': { ast: { nodes: [] }, id: currentId++ } } } }
  }
  transpile() {
    this.fillHeader()
    this.fillPragma()
    this.transpileContract()

    this.outputAst.data.sources['playground.sol'].ast.exportedSymbols[this.inputAst['name']].push(currentId)

    return this.outputAst
  }

  transpileContract(){

    const contract = Contract(this.inputAst)
    this.outputAst.data.sources['playground.sol'].ast.nodes.push(contract)
  }

  fillHeader() {
    /* TODO:
    "exportedSymbols": {
      "Function": [
        6
      ]
    },
    "id": 7,
     */
    this.outputAst.data.sources['playground.sol'].ast.absolutePath = 'playground.sol'
    this.outputAst.data.sources['playground.sol'].ast.license = 'MIT'
    this.outputAst.data.sources['playground.sol'].ast.nodeType = 'SourceUnit'
    this.outputAst.data.sources['playground.sol'].ast.src = '0:0:0'
    this.outputAst.data.sources['playground.sol'].ast.exportedSymbols = {}
    this.outputAst.data.sources['playground.sol'].ast.exportedSymbols[this.inputAst['name']] = []
  }

  fillPragma() {
    const pragma = {
      id: GetId(),
      literals: ["solidity", "^", "0.8", ".24"],
      nodeType: 'PragmaDirective',
      src: '0:0:0'
    }
    this.outputAst.data.sources['playground.sol'].ast.nodes.push(pragma)
  }
}

module.exports = {
  Transpiler, currentScope, currentId
}
