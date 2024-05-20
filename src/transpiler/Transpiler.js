const {FunctionDeclaration} = require("./FunctionDeclaration");

global.currentId = 0
global.currentScope = 0

class Transpiler {
  constructor (inputAst) {
    this.inputAst = inputAst;
    this.outputAst = { data: { sources: { 'contract.sol': { ast: { nodes: [] }, id: currentId++ } } } }
  }
  transpile() {
    this.fillHeader()
    this.fillPragma()
    this.transpileContract()

    this.outputAst.data.sources['contract.sol'].ast.exportedSymbols[this.inputAst['name']].push(currentId)

    return this.outputAst
  }

  transpileContract(){

    const contract = {
      abstract: false,
      baseContracts: [],
      canonicalName: this.inputAst['name'],
      contractDependencies: [],
      contractKind: 'contract',
      fullyImplemented: true,
      id: currentId++,
      linearizedBaseContracts: [
        // TODO: fill me
      ],
      name: this.inputAst['name'],
      nameLocation: "0:0:0",
      nodeType: 'ContractDefinition',
      nodes: this.transpileContractNodes(),
      scope: currentScope++,
      src: '0:0:0',
      usedErrors: [],
      usedEvents: []
    }

    this.outputAst.data.sources['contract.sol'].ast.nodes.push(contract)
  }

  transpileContractNodes(){
    const outputNodes = []
    const ln = this.inputAst.nodes.length
    let outputNode
    for (let i = 0 ; i < ln; i++) {
      const node = this.inputAst.nodes[i]

      switch (node.type) {
        case 'FunctionDeclaration':
          outputNode = FunctionDeclaration(node)
          outputNodes.push(outputNode)
      }
    }
    return outputNodes
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
    this.outputAst.data.sources['contract.sol'].ast.absolutePath = 'contract.sol'
    this.outputAst.data.sources['contract.sol'].ast.license = 'MIT'
    this.outputAst.data.sources['contract.sol'].ast.nodeType = 'SourceUnit'
    this.outputAst.data.sources['contract.sol'].ast.src = '0:0:0'
    this.outputAst.data.sources['contract.sol'].ast.exportedSymbols = {}
    this.outputAst.data.sources['contract.sol'].ast.exportedSymbols[this.inputAst['name']] = []
  }

  fillPragma() {
    const pragma = {
      id: currentId++,
      literals: ["solidity", "^", "0.8", ".24"],
      nodeType: 'PragmaDirective',
      src: '0:0:0'
    }
    this.outputAst.data.sources['contract.sol'].ast.nodes.push(pragma)
  }
}

module.exports = {
  Transpiler, currentScope, currentId
}
