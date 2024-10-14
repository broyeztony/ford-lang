const {GetId} = require("../utils");

function NumericLiteralTypings(solVarDecl, varType) {

  const prefix = varType.charAt(0)
  const size = varType.slice(1, 4)

  let typeIdentifier;
  let typeString;
  switch (prefix) {
    case 'i':
      typeIdentifier = `t_int${size}`
      typeString = `int${size}`
      break;
    case 'u':
      typeIdentifier = `t_uint${size}`
      typeString = `uint${size}`
      break;
  }

  solVarDecl.typeDescriptions.typeIdentifier = typeIdentifier
  solVarDecl.typeDescriptions.typeString = typeString
  solVarDecl.typeName.name = typeString
  solVarDecl.typeName.typeDescriptions.typeIdentifier = typeIdentifier
  solVarDecl.typeName.typeDescriptions.typeString = typeString
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
