const {GetId} = require("../utils");
const {FunctionDeclaration} = require("./FunctionDeclaration");
const {StateVariableDeclaration} = require("./sol_StateVariableDeclaration");
const {VariableStatement} = require("./VariableStatement");


function Contract(node, metadata) {

  const contract = {
    abstract: false,
    baseContracts: [],
    canonicalName: node.name,
    contractDependencies: [],
    contractKind: 'contract',
    fullyImplemented: true,
    id: GetId(),
    linearizedBaseContracts: [ // TODO: fill me
    ],
    name: node['name'],
    nameLocation: "0:0:0",
    nodeType: 'ContractDefinition',
    nodes: Nodes(node, metadata),
    scope: currentScope++,
    src: '0:0:0',
    usedErrors: [],
    usedEvents: []
  }

  return contract
}

function Nodes (node, metadata) {
  const outputNodes = []
  const ln = node.nodes.length
  let outputNode
  for (let i = 0 ; i < ln; i++) {
    const nod = node.nodes[i]

    switch (nod.type) {
      case 'FunctionDeclaration':
        outputNode = FunctionDeclaration(nod, metadata)
        outputNodes.push(outputNode)
        break
      case 'VariableStatement':
        outputNode = VariableStatement(nod, metadata)
        outputNodes.push(outputNode)
        break
    }
  }
  return outputNodes
}

module.exports = {
  Contract
}
