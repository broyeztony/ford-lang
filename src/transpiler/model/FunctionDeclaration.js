const {ForStatement} = require("./ForStatement");
const {GetId} = require("./../utils");
const {VariableStatement} = require("./VariableStatement");
const {Sol_VariableDeclarationStatement} = require("./sol_VariableDeclarationStatement");
const {Sol_FunctionParameterList} = require("./sol_FunctionParameterList");

function FunctionDeclaration(node, metadata) {

  const blockStatements = node.body.body
  const lnStatements  = blockStatements.length
  const outputNodes = []
  let outputNode
  for (let i = 0 ; i < lnStatements; i++) {
    const stmtNode = blockStatements[i]
    switch (stmtNode.type) {
      case 'VariableStatement':
        outputNode = Sol_VariableDeclarationStatement(stmtNode, metadata)
        outputNodes.push(outputNode)
        break
      case 'ForStatement':
        outputNode = ForStatement(stmtNode, metadata)
        outputNodes.push(outputNode)
        break
    }
  }

  const fd = {
    body: {
      id: GetId(),
      nodeType: 'Block',
      src: '0:0:0',
      statements: outputNodes
    },
    /* TODO: functionSelector: "dad0be61", */
    id: GetId(),
    implemented: true,
    kind: "function",
    modifiers: [],
    name: node.name.name,
    nameLocation: '0:0:0',
    nodeType: 'FunctionDefinition',
    parameters: {
      id: GetId(),
      nodeType: 'ParameterList',
      parameters: [],
      src: '0:0:0'
    },
    returnParameters: {
      id: GetId(),
      nodeType: 'ParameterList',
      parameters: [],
      src: '0:0:0'
    },
    scope: currentScope++,
    src: '0:0:0',
    stateMutability: node.stateMutability,
    virtual: false,
    visibility: node.visibility
  }

  // handle function parameters list
  if (node.params) {
      const solFuncParams = Sol_FunctionParameterList(node.params, metadata)
    fd.parameters = solFuncParams
  }

  // handle return parameters
  if (node.returnType) {
    const returnTypeInput = {
      name: { name: '', type: 'Identifier' },
      type: node.returnType
    }
    const solFuncReturnParams = Sol_FunctionParameterList([returnTypeInput], metadata)
    fd.returnParameters = solFuncReturnParams
  }

  return fd;
}

module.exports = {
  FunctionDeclaration
}
