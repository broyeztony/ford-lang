const {FordTypes2SolidityTypes, GetId} = require("../utils");
const {NumericLiteralValue} = require("./NumericLiteral");


function CallExpressionTypings(solVarDeclaration, callee) {

  const fnName = callee.name
  const { typeIdentifier, typeString, kind } = FordTypes2SolidityTypes[fnName]

  solVarDeclaration.typeDescriptions.typeIdentifier = typeIdentifier
  solVarDeclaration.typeDescriptions.typeString = typeString
  solVarDeclaration.typeName.name = typeString
  solVarDeclaration.typeName.typeDescriptions.typeIdentifier = typeIdentifier
  solVarDeclaration.typeName.typeDescriptions.typeString = typeString
}

function CallExpressionValue(initializer) {

  const fnName = initializer.callee.name
  const { typeIdentifier, typeString, kind } = FordTypes2SolidityTypes[fnName]

  let buffer = { typeDescriptions: {} }
  buffer.id = GetId()
  buffer.hexValue = ''
  buffer.isConstant = false
  buffer.isLValue = false
  buffer.isPure = true
  buffer.lValueRequested = false
  buffer.nodeType = 'Literal'
  buffer.src = source
  buffer.kind = kind

  switch (fnName) {
    case 'u8'   :
    case 'i8'   :
    case 'u16'  :
    case 'i16'  :
    case 'u32'  :
    case 'i32'  :
    case 'u64'  :
    case 'i64'  :
    case 'u128' :
    case 'i128' :
    case 'u256' :
    case 'i256' :

      const numericVal = initializer.arguments[0].value
      buffer.typeDescriptions.typeIdentifier = `t_rational_${numericVal}_by_1`
      buffer.typeDescriptions.typeString = `int_const ${numericVal}`
      buffer.value = `${numericVal}`
      break
    case 'address':
      const addressVal = initializer.arguments[0].value
      buffer.typeDescriptions.typeIdentifier = `t_address`
      buffer.typeDescriptions.typeString = `address`
      buffer.value = `${addressVal}`
      break
  }

  return buffer
}

module.exports = {
  CallExpressionTypings,
  CallExpressionValue
}
