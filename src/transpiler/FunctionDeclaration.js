const {VariableDeclaration} = require("./VariableDeclaration");

function FunctionDeclaration(node) {

  const blockStatements = node.body.body
  const lnStatements  = blockStatements.length
  const outputNodes = []
  let outputNode
  for (let i = 0 ; i < lnStatements; i++) {
    const stmtNode = blockStatements[i]
    switch (stmtNode.type) {
      case 'VariableStatement':
        outputNode = VariableDeclaration(stmtNode, false)
        outputNodes.push(outputNode)
        break
    }
  }

  const fd = {
    body: {
      "id": currentId++,
      nodeType: 'Block',
      src: '0:0:0',
      statements: outputNodes
    },
    /* TODO: functionSelector: "dad0be61", */
    id: currentId++,
    implemented: true,
    kind: "function",
    modifiers: [],
    name: node.name.name,
    nameLocation: '0:0:0',
    nodeType: 'FunctionDefinition',
    parameters: {
      id: currentId++,
      nodeType: 'ParameterList',
      parameters: [],
      src: '0:0:0'
    },
    returnParameters: {
      id: currentId++,
      nodeType: 'ParameterList',
      parameters: [],
      src: '0:0:0'
    },
    scope: currentScope++,
    src: '0:0:0',
    stateMutability: 'nonpayable', /* TODO: handle stateMutability */
    virtual: false,
    visibility: "public" /* TODO: handle visibility */
  }

  return fd;
}

module.exports = {
  FunctionDeclaration
}
