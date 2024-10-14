const {FordTypes2SolidityTypes, GetId} = require("../utils");
const {NumericLiteralValue} = require("./NumericLiteral");
const {SolUnaryOperation} = require("./sol_UnaryOperation");
const {StringLiteralValue} = require("./StringLiteral");


function CallExpression(node, parentFn, metadata) {

  console.log('@CallExpression', node, parentFn)

  let typeIdentifier, typeString;
  const fordTypeName = parentFn.returnType.name
  let solType = FordTypes2SolidityTypes[fordTypeName]

  // string case
  if (fordTypeName === 'string') {
    let stringConfig = solType.find(_ => _.storageLocation === 'memory') // todo: handle storageLocation === 'calldata'
    typeIdentifier = stringConfig.typeIdentifier
    typeString = stringConfig.typeString
  } else {
    typeIdentifier = solType.typeIdentifier
    typeString = solType.typeIdentifier
  }

  const functionCallArguments = []
  if (node.arguments && node.arguments.length > 0) {
    for (let k = 0 ; k < node.arguments.length ; k++) {
      switch (node.arguments[k].type) {
        case 'NumericLiteral':
          functionCallArguments.push(NumericLiteralValue(node.arguments[k].value))
          break;
        case 'StringLiteral':
          let s = StringLiteralValue(node.arguments[k].value);
          console.log('@s', s)
          functionCallArguments.push(s)
          break;
      }
    }
  }

  const functionCallExpression = {
    id: GetId(),
    isConstant: false,
    isLValue: false,
    isPure: false,
    kind: 'functionCall',
    nameLocations: [],
    names: [],
    lValueRequested :false,
    nodeType: 'FunctionCall',
    src: source,
    tryCall: false,
    typeDescriptions: {
      typeIdentifier,
      typeString
    },
    arguments: functionCallArguments,
    expression: {},
  }

  const expression = {
    argumentTypes: functionCallArguments.map(fca => fca.typeDescriptions),
    overloadedDeclarations: [],
    id: GetId(),
    name: node.callee.name,
    nodeType: 'Identifier',
    src: source,
    typeDescriptions: {}
  }

  expression.typeDescriptions.typeIdentifier = `t_function_${parentFn.visibility}_${parentFn.stateMutability}$__$returns$_${typeString}_$`
  console.log('@expression.typeDescriptions.typeIdentifier', expression.typeDescriptions.typeIdentifier)
  // TODO: handle function parameters
  expression.typeDescriptions.typeString = `function () returns (${typeIdentifier})`

  functionCallExpression.expression = expression

  return functionCallExpression
}

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
    case 'address->u256':

      let solTypes = FordTypes2SolidityTypes['address->u256']
      delete buffer['kind']
      buffer.typeDescriptions = solTypes.typeDescriptions
      buffer.typeName = solTypes.typeName
      buffer.typeName.id = GetId()
      buffer.typeName.keyType['id'] = GetId()
      buffer.typeName.valueType['id'] = GetId()

      break
  }

  return buffer
}

module.exports = {
  CallExpressionTypings,
  CallExpressionValue,
  CallExpression
}
