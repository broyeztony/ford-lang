const {FordTypes2SolidityTypes} = require("../utils");


function CallExpressionTypings(solVarDeclaration, callee) {

  const fnName = callee.name
  const { typeIdentifier, typeString, kind } = FordTypes2SolidityTypes[fnName]

  solVarDeclaration.typeDescriptions.typeIdentifier = typeIdentifier
  solVarDeclaration.typeDescriptions.typeString = typeString
  solVarDeclaration.typeName.name = typeString
  solVarDeclaration.typeName.typeDescriptions.typeIdentifier = typeIdentifier
  solVarDeclaration.typeName.typeDescriptions.typeString = typeString
}

module.exports = {
  CallExpressionTypings
}
