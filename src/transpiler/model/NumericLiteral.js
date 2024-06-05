const {GetId} = require("../utils");

function NumericLiteralTypings(solVarDecl) {

  solVarDecl.typeDescriptions.typeIdentifier = 't_uint256'
  solVarDecl.typeDescriptions.typeString = 'uint256'
  solVarDecl.typeName.name = 'uint256'
  solVarDecl.typeName.typeDescriptions.typeIdentifier = 't_uint256'
  solVarDecl.typeName.typeDescriptions.typeString = 'uint256'
}

function NumericLiteralValue(value) {

 const buffer = { typeDescriptions: {} }

  buffer.id = GetId()
  buffer.hexValue = ''
  buffer.isConstant = false
  buffer.isLValue = false
  buffer.isPure = true
  buffer.lValueRequested = false
  buffer.nodeType = 'Literal'
  buffer.src = source
  buffer.kind = 'number'
  buffer.typeDescriptions.typeIdentifier = `t_rational_${value}_by_1`
  buffer.typeDescriptions.typeString = `int_const ${value}`
  buffer.value = `${value}`

  return buffer
}


module.exports = {
  NumericLiteralTypings,
  NumericLiteralValue
}
