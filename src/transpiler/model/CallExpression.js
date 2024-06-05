const {FordTypes2SolidityTypes, GetId} = require("../utils");
const {NumericLiteralValue} = require("./NumericLiteral");
const {SolUnaryOperation} = require("./sol_UnaryOperation");


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
    case 'u16'  :
    case 'u32'  :
    case 'u64'  :
    case 'u128' :
    case 'u256' :
    case 'i8'   :
    case 'i16'  :
    case 'i32'  :
    case 'i64'  :
    case 'i128' :
    case 'i256' :

      const type = initializer.arguments[0].type
      switch (type) {
        case 'NumericLiteral':
          const numericVal = initializer.arguments[0].value
          buffer.typeDescriptions.typeIdentifier = `t_rational_${numericVal}_by_1`
          buffer.typeDescriptions.typeString = `int_const ${numericVal}`
          buffer.value = `${numericVal}`
          break

        case 'UnaryExpression':
          buffer.nodeType = 'UnaryOperation'
          buffer.operator = '-'
          buffer.prefix = true

          buffer.subExpression = SolUnaryOperation(initializer.arguments[0])
          buffer.typeDescriptions = {
            typeIdentifier: `t_rational_minus_${buffer.subExpression.value}_by_1`,
            typeString: `int_const -${buffer.subExpression.value}`
          }
          break
      }
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
