const {GetId} = require("../utils");


function BooleanLiteralTypings(solVarDecl) {

  solVarDecl.typeDescriptions.typeIdentifier = 't_bool'
  solVarDecl.typeDescriptions.typeString = 'bool'
  solVarDecl.typeName.name = 'bool'
  solVarDecl.typeName.typeDescriptions.typeIdentifier = 't_bool'
  solVarDecl.typeName.typeDescriptions.typeString = 'bool'
}

function BooleanLiteralValue(value) {

  console.log('@BooleanLiteralValue value:', value)

  let buffer = { typeDescriptions: {} }

  buffer.id = GetId()
  buffer.hexValue = ''
  buffer.isConstant = false
  buffer.isLValue = false
  buffer.isPure = true
  buffer.lValueRequested = false
  buffer.nodeType = 'Literal'
  buffer.src = source
  buffer.kind = 'bool'
  buffer.typeDescriptions.typeIdentifier = 't_bool'
  buffer.typeDescriptions.typeString = 'bool'
  buffer.value = `${value}`

  return buffer
}

module.exports = {
  BooleanLiteralTypings,
  BooleanLiteralValue
};
