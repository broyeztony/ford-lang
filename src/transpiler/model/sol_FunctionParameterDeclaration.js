const { GetId} = require("./../utils");
const {FordTypes2SolidityTypes} = require("../utils");

/**
 * @param node { name: { type: 'Identifier', name: 'x' }, type: { type: 'Identifier', name: 'u8' } }
 */
function Sol_FunctionParameterDeclaration(node, metadata) {

  const { name, type } = node

  let solParamDeclaration = {
    constant: false,
    id: GetId(),
    mutability: 'mutable',
    name: node.name.name,
    nameLocation: source,
    nodeType: 'VariableDeclaration',
    scope: currentScope++,
    src: source,
    stateVariable: false,
    storageLocation: 'default', // TODO: handle other data-location (for structs, mappings, arrays)
    typeDescriptions: {},
    typeName: {
      /* TODO: stateMutability */
      id: GetId(),
      nodeType: 'ElementaryTypeName',
      src: source,
      typeDescriptions: {}
    },
    visibility: 'internal'
  }


  let solTypes = FordTypes2SolidityTypes[node.type.name]
  console.log('@Sol_FunctionParameterDeclaration node.type.name', node.type.name, JSON.stringify(solTypes, null, 2))

  // string case
  if (node.type.name === 'string') {
    let stringConfig = solTypes.find(_ => _.storageLocation === 'memory') // todo: handle storageLocation === 'calldata'
    solParamDeclaration.typeDescriptions.typeIdentifier = stringConfig.typeDescriptions.typeIdentifier
    solParamDeclaration.typeDescriptions.typeString = 'string'
    solParamDeclaration.typeName.name = 'string'
    solParamDeclaration.typeName.typeDescriptions = stringConfig.typeName.typeDescriptions
  }
  else {
    solParamDeclaration.typeDescriptions = solTypes.typeIdentifier
    solParamDeclaration.typeDescriptions.typeString = solTypes.typeString
    solParamDeclaration.typeName.name = solTypes.typeString
  }

  return solParamDeclaration
}

module.exports = {
  Sol_FunctionParameterDeclaration,
}
