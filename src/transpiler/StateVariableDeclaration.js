const {GetId, FordTypes2SolidityTypes} = require("./utils");
const {VariableBase, VariableValue, SubExpression} = require("./VariableCommons");

/*
{
  "type": "VariableStatement",
  "stateVariable": true,
  "declarations": [
    {
      "type": "VariableDeclaration",
      "id": {
        "type": "Identifier",
        "name": "addr"
      },
      "initializer": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "address"
        },
        "arguments": [
          {
            "type": "StringLiteral",
            "value": "0x0"
          }
        ]
      }
    }
  ]
},
 */
function StateVariableDeclaration (node, metadata) {

  const declaration = node.declarations[0]
  const initializer = declaration.initializer

  let variable = {}

  let baseVariable = VariableBase(declaration.id.name, node.stateVariable, 'public')
  baseVariable.typeName.stateMutability = 'nonpayable' // TODO: handle me!

  // resolving type
  if (!initializer) {
    throw new Error("Invalid state variable declaration: missing initializer.")
  }

  if (initializer.type === 'UnaryExpression') {
    SetTypeDescription(baseVariable, 't_int256', 'int256', 'int256', 't_int256', 'int256')
  }
  else if (initializer.type === 'CallExpression') {
    const calleeName = initializer.callee.name
    const {typeIdentifier, typeString, kind} = FordTypes2SolidityTypes[calleeName]
    SetTypeDescription(baseVariable, typeIdentifier, typeString, typeString, typeIdentifier, typeString)
  } else if (initializer.type === 'ObjectLiteral') {
    throw new Error('ERROR: Not Implemented')
  } else if (initializer.type === 'NumericLiteral') {
    SetTypeDescription(baseVariable, 't_uint256', 'uint256', 'uint256', 't_uint256', 'uint256')
  } else if (initializer.type === 'StringLiteral') {
    SetTypeDescription(baseVariable, 't_string_storage', 'string', 'string', 't_string_storage_ptr', 'string')
  } else if (initializer.type === 'BooleanLiteral') {
    SetTypeDescription(baseVariable, 't_bool', 'bool', 'bool', 't_bool', 'bool')
  } else {
    throw new Error('ERROR: Not Implemented')
  }

  variable = {...baseVariable }

  // state variable with initial value
  if (initializer) {

    const variableValue = VariableValue()
    variableValue.nodeType = 'Literal'

    if (initializer.type === 'UnaryExpression') {

      if (!(initializer.operator === '-' && initializer.argument.type === 'NumericLiteral')) {
        throw new Error('Invalid initializer: UnaryExpression')
      }

      variableValue.nodeType = 'UnaryOperation'
      variableValue.prefix = true
      variableValue.operator = '-'

      variableValue.typeDescriptions.typeIdentifier = `t_rational_minus_${initializer.argument.value}_by_1`
      variableValue.typeDescriptions.typeString = `int_const -${initializer.argument.value}`

      variableValue.subExpression = SubExpression(
        'Literal',
        'number',
        { typeIdentifier: `t_rational_${initializer.argument.value}_by_1`, typeString: `int_const ${initializer.argument.value}` },
        `${initializer.argument.value}`
      )

      variable.value = variableValue

    } else if (initializer.type === 'CallExpression') {

      const calleeName = initializer.callee.name
      const {typeIdentifier, typeString, kind} = FordTypes2SolidityTypes[calleeName]

      if (initializer.arguments.length > 0 && initializer.arguments[0].type === 'UnaryExpression') {

        if (!['i8', 'i16', 'i32', 'i64', 'i128', 'i256'].includes(calleeName)) { // TODO: handle negative integers
          throw new Error(`Invalid initializer: UnaryExpression. Expected: one of 'i8', 'i16', 'i32', 'i64', 'i128' or 'i256' but got: ${calleeName}`)
        }

        const argument = initializer.arguments[0]
        variableValue.nodeType = 'UnaryOperation'
        variableValue.prefix = true
        variableValue.operator = '-'

        variableValue.typeDescriptions.typeIdentifier = `t_rational_minus_${argument.argument.value}_by_1`
        variableValue.typeDescriptions.typeString = `int_const -${argument.argument.value}`

        variableValue.subExpression = SubExpression(
          'Literal',
          'number',
          { typeIdentifier: `t_rational_${argument.argument.value}_by_1`, typeString: `int_const ${argument.argument.value}` },
          argument.argument.value
        )

      } else if (initializer.arguments[0]) {

        variableValue.kind = kind

        if (['u8', 'u16', 'u32', 'u64', 'u128', 'u256'].includes(calleeName)) {
          variableValue.typeDescriptions.typeIdentifier = `t_rational_${initializer.arguments[0].value}_by_1`
          variableValue.typeDescriptions.typeString = `int_const ${initializer.arguments[0].value}`
          variableValue.value = `${initializer.arguments[0].value}`
        } else if (['i8', 'i16', 'i32', 'i64', 'i128', 'i256'].includes(calleeName)) { // TODO: handle negative integers
          variableValue.typeDescriptions.typeIdentifier = `t_rational_${initializer.arguments[0].value}_by_1`
          variableValue.typeDescriptions.typeString = `int_const ${initializer.arguments[0].value}`
          variableValue.value = `${initializer.arguments[0].value}`
        } else if (calleeName === 'address') { // type address
          variableValue.typeDescriptions.typeIdentifier = `t_address`
          variableValue.typeDescriptions.typeString = `address`
          if (initializer.arguments[0]) {
            variableValue.value = `${initializer.arguments[0].value}`
          }
        }
      }

      if (variableValue.value) { // the rational is that a variableValue MUST have a `value`
        variable.value = variableValue
      }

    } else if (initializer.type === 'ObjectLiteral') {
      throw new Error('ERROR: Not Implemented')
    } else if (initializer.type === 'NumericLiteral') {
      variable.value = NumericLiteral(variableValue, initializer)
    } else if (initializer.type === 'StringLiteral') {
      variable.value = StringLiteral(variableValue, initializer)
    } else if (initializer.type === 'BooleanLiteral') {
      variable.value = BooleanLiteral(variableValue, initializer)
    } else {
      throw new Error('ERROR: Not Implemented')
    }
  }

  // console.log('@StateVariableDeclaration, variable', JSON.stringify(variable, null, 2))

  return variable
}

function NumericLiteral(variableValue, initializer) {

  variableValue.kind = 'number'
  variableValue.typeDescriptions.typeIdentifier = `t_rational_${initializer.value}_by_1`
  variableValue.typeDescriptions.typeString = `int_const ${initializer.value}`
  variableValue.value = `${initializer.value}`
  return variableValue
}

function StringLiteral(variableValue, initializer) {

  variableValue.kind = 'string'
  variableValue.typeDescriptions.typeIdentifier = `t_stringliteral`
  variableValue.typeDescriptions.typeString = `literal_string "${initializer.value}"`
  variableValue.value = `${initializer.value}`
  return variableValue
}

function BooleanLiteral(variableValue, initializer) {

  variableValue.kind = 'bool'
  variableValue.typeDescriptions.typeIdentifier = `t_bool`
  variableValue.typeDescriptions.typeString = 'bool'
  variableValue.value = `${initializer.value}`
  return variableValue
}

function SetTypeDescription(baseVariable, tdti, tdts, tnn, tnti, tnts) {

  baseVariable.typeDescriptions.typeIdentifier = tdti
  baseVariable.typeDescriptions.typeString = tdts
  baseVariable.typeName.name = tnn
  baseVariable.typeName.typeDescriptions.typeIdentifier = tnti
  baseVariable.typeName.typeDescriptions.typeString = tnts

}

module.exports = {
  StateVariableDeclaration,
}
