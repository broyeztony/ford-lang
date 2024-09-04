const { GetId} = require("./../utils");
const {FordTypes2SolidityTypes} = require("../utils");

/**
 * @param node { name: { type: 'Identifier', name: 'x' }, type: { type: 'Identifier', name: 'u8' } }
 */
function Sol_FunctionParameterDeclaration(node, metadata) {

  const { name, type, dataLocation } = node

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
    storageLocation: dataLocation,
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

  const fordTypeName = node.type.name

  let solTypes = FordTypes2SolidityTypes[fordTypeName]

  // string case
  if (fordTypeName === 'string') {
    let stringConfig = solTypes.find(_ => _.storageLocation === 'memory') // todo: handle storageLocation === 'calldata'
    solParamDeclaration.typeDescriptions.typeIdentifier = stringConfig.typeDescriptions.typeIdentifier
    solParamDeclaration.typeDescriptions.typeString = 'string'
    solParamDeclaration.typeName.name = 'string'
    solParamDeclaration.typeName.typeDescriptions = stringConfig.typeName.typeDescriptions
  }
  else if (fordTypeName === 'address->u256') {
    solParamDeclaration.typeDescriptions = solTypes.typeDescriptions
    solParamDeclaration.typeName = solTypes.typeName
    solParamDeclaration.typeName.id = GetId()
    solParamDeclaration.typeName.keyType['id'] = GetId()
    solParamDeclaration.typeName.valueType['id'] = GetId()
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
