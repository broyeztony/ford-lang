const {ForStatement} = require("./ForStatement");
const {GetId} = require("./../utils");
const {VariableStatement} = require("./VariableStatement");
const {Sol_VariableDeclarationStatement} = require("./sol_VariableDeclarationStatement");
const {Sol_FunctionParameterDeclaration} = require("./sol_FunctionParameterDeclaration");
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

  // handle def metadata
  const meta = lookupMetadata(metadata, node.name.name)
  let name, stateMutability, visibility
  if (meta.length > 0) {
    const [{ n,  s, v }] = meta
    name = n
    stateMutability = s
    visibility = v
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
    stateMutability: stateMutability || 'nonpayable',
    virtual: false,
    visibility: visibility || 'public'
  }

  // handle parameters list
  const solFuncParams = Sol_FunctionParameterList(node.params, metadata)
  fd.parameters = solFuncParams
  //

  return fd;
}

function lookupMetadata(metadata, defName) {
  return metadata?.defs.filter(_ => _.name === defName)
}

module.exports = {
  FunctionDeclaration
}
