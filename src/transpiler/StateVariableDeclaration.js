const {GetId} = require("./utils");

const fordTypes2SolidityTypes = {
  // unsigned integers
  'u8': { typeIdentifier: 't_uint8', typeString: 'uint8', kind: 'number' },
  'u16': { typeIdentifier: 't_uint16', typeString: 'uint16', kind: 'number' },
  'u32': { typeIdentifier: 't_uint32', typeString: 'uint32', kind: 'number' },
  'u64': { typeIdentifier: 't_uint64', typeString: 'uint64', kind: 'number' },
  'u128': { typeIdentifier: 't_uint128', typeString: 'uint128', kind: 'number' },
  'u256': { typeIdentifier: 't_uint256', typeString: 'uint256', kind: 'number' },
  // signed integers
  'i8': { typeIdentifier: 't_int8', typeString: 'int8', kind: 'number' },
  'i16': { typeIdentifier: 't_int16', typeString: 'int16', kind: 'number' },
  'i32': { typeIdentifier: 't_int32', typeString: 'int32', kind: 'number' },
  'i64': { typeIdentifier: 't_int64', typeString: 'int64', kind: 'number' },
  'i128': { typeIdentifier: 't_int128', typeString: 'int128', kind: 'number' },
  'i256': { typeIdentifier: 't_int256', typeString: 'int256', kind: 'number' },
  // solidity intrinsic types
  'address': { typeIdentifier: 't_address', typeString: 'address', kind: 'number' },
}

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
function StateVariableDeclaration (node) {

  const declaration = node.declarations[0]
  const initializer = declaration.initializer

  let variable = {}
  const baseVariable = {
    constant: false,
    id: GetId(),
    mutability: "mutable",
    name: declaration.id.name,
    nameLocation: source,
    nodeType: 'VariableDeclaration',
    scope: currentScope++,
    src: source,
    stateVariable: true,
    storageLocation: "default",
    typeDescriptions: {
      typeIdentifier: undefined,
      typeString: undefined
    },
    typeName: {
      id: GetId(),
      name: undefined,
      nodeType: 'ElementaryTypeName',
      src: source,
      stateMutability: 'nonpayable',
      typeDescriptions: {
        typeIdentifier: undefined,
        typeString: undefined
      }
    },
    visibility: 'public'
  }

  // resolving type
  if (!initializer) {
    throw new Error("Invalid state variable declaration: missing initializer.")
  }

  if (initializer.type === 'CallExpression') {
    const calleeName = initializer.callee.name
    const {typeIdentifier, typeString, kind} = fordTypes2SolidityTypes[calleeName]
    baseVariable.typeDescriptions.typeIdentifier = typeIdentifier
    baseVariable.typeDescriptions.typeString = typeString
    baseVariable.typeName.name = typeString
    baseVariable.typeName.typeDescriptions.typeIdentifier = typeIdentifier
    baseVariable.typeName.typeDescriptions.typeString = typeString

  } else if (initializer.type === 'ObjectLiteral') {
    throw new Error('ERROR: Not Implemented')
  } else if (initializer.type === 'NumericLiteral') {

    baseVariable.typeDescriptions.typeIdentifier = 't_uint256'
    baseVariable.typeDescriptions.typeString = 'uint256'
    baseVariable.typeName.name = 'uint256'
    baseVariable.typeName.typeDescriptions.typeIdentifier = 't_uint256'
    baseVariable.typeName.typeDescriptions.typeString = 'uint256'

  } else if (initializer.type === 'StringLiteral') {

    baseVariable.typeDescriptions.typeIdentifier = 't_string_storage'
    baseVariable.typeDescriptions.typeString = 'string'
    baseVariable.typeName.name = 'string'
    baseVariable.typeName.typeDescriptions.typeIdentifier = 't_string_storage_ptr'
    baseVariable.typeName.typeDescriptions.typeString = 'string'

  } else if (initializer.type === 'BooleanLiteral') {

    baseVariable.typeDescriptions.typeIdentifier = 't_bool'
    baseVariable.typeDescriptions.typeString = 'bool'
    baseVariable.typeName.name = 'bool'
    baseVariable.typeName.typeDescriptions.typeIdentifier = 't_bool'
    baseVariable.typeName.typeDescriptions.typeString = 'bool'

  } else {
    throw new Error('ERROR: Not Implemented')
  }

  variable = {...baseVariable }

  // state variable with initial value
  if (initializer) {

    const variableValue = {
      hexValue: '',
      id: GetId(),
      isConstant: false,
      isLValue: false,
      isPure: true,
      kind: undefined,
      lValueRequested: false,
      nodeType: "Literal",
      src: source,
      typeDescriptions: {
        typeIdentifier: undefined,
        typeString: undefined
      },
      value: undefined
    }

    if (initializer.type === 'CallExpression') {
      if (initializer.arguments.length > 0) {
        const arg = initializer.arguments[0]
        const calleeName = initializer.callee.name
        const {typeIdentifier, typeString, kind} = fordTypes2SolidityTypes[calleeName]
        variableValue.kind = kind

        if (['u8', 'u16', 'u32', 'u64', 'u128', 'u256'].includes(calleeName)) {
          variableValue.typeDescriptions.typeIdentifier = `t_rational_${arg.value}_by_1`
          variableValue.typeDescriptions.typeString = `int_const ${arg.value}`
          variableValue.value = `${arg.value}`
        } else if (['i8', 'i16', 'i32', 'i64', 'i128', 'i256'].includes(calleeName)) { // TODO: handle negative integers
          variableValue.typeDescriptions.typeIdentifier = `t_rational_${arg.value}_by_1`
          variableValue.typeDescriptions.typeString = `int_const ${arg.value}`
          variableValue.value = `${arg.value}`
        } else if (calleeName === 'address') { // type address
          variableValue.typeDescriptions.typeIdentifier = `t_address`
          variableValue.typeDescriptions.typeString = `address`
          variableValue.value = `${arg.value}`
        }

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

module.exports = {
  StateVariableDeclaration,
}
