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
    storageLocation: 'memory',
    typeDescriptions: {},
    typeName: {
      id: GetId(),
      nodeType: 'ElementaryTypeName',
      src: source,
      typeDescriptions: {}
    },
    visibility: 'internal'
  }

  const solTypes = FordTypes2SolidityTypes[node.type.name]
  solParamDeclaration.typeDescriptions.typeIdentifier = solTypes.typeIdentifier
  solParamDeclaration.typeDescriptions.typeString = solTypes.typeString
  solParamDeclaration.typeName.name = solTypes.typeString

  return solParamDeclaration
}

module.exports = {
  Sol_FunctionParameterDeclaration,
}
