const { GetId} = require("./../utils");
const {FordTypes2SolidityTypes, solidityKind, solidityTypeIdentifier, solidityTypeString} = require("../utils");
const {makeMapping} = require("./HashMaps");

/**
 * @param node { name: { type: 'Identifier', name: 'x' }, type: { type: 'Identifier', name: 'u8' } }
 */
function Sol_FunctionParameterDeclaration(node, metadata) {

  // console.log('@Sol_FunctionParameterDeclaration', node)
  const { name, type: fordType, genericType, dataLocation } = node

  let solParamDeclaration = {
    constant: false,
    id: GetId(),
    mutability: 'mutable',
    name,
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

  if (genericType === 'IDENTIFIER') {
    console.log('@fordTypeName', fordType)
    console.log('@solidityTypeIdentifier', solidityTypeIdentifier(fordType))
    console.log('@solitidityTypeString', solidityTypeString(fordType))
    console.log('@solitidityKind', solidityKind(fordType))
    console.log('\n')

    solParamDeclaration.typeDescriptions.typeIdentifier = solidityTypeIdentifier(fordType)
    solParamDeclaration.typeDescriptions.typeString = solidityTypeString(fordType)
    solParamDeclaration.typeName.name =  solidityTypeString(fordType)
    solParamDeclaration.typeName.typeDescriptions.typeIdentifier = solidityTypeIdentifier(fordType)
    solParamDeclaration.typeName.typeDescriptions.typeString = solidityTypeString(fordType)

  } else {
    makeMapping(solParamDeclaration, fordType)
  }

  /*
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
  */

  return solParamDeclaration
}

module.exports = {
  Sol_FunctionParameterDeclaration,
}
