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

function lookupMetadata(varName, metadata) {
  return metadata?.state.filter(_ => _.name === varName)
}

function VariableDeclaration(node, isStateVariable, metadata) {

  const declaration = node.declarations[0]
  const initializer = declaration.initializer

  const varName = declaration.id.name
  const varMeta = lookupMetadata(varName, metadata)
  // console.log('@VariableDeclaration name', varName, 'varMeta', varMeta)

  const variableAttributes = {
    constant: false,
    id: GetId(),
    mutability: 'mutable',
    name: varName,
    nameLocation: '0:0:0',
    nodeType: 'VariableDeclaration',
    scope: currentScope++,
    src: '0:0:0',
    stateVariable: node.stateVariable,
    storageLocation: 'default',
    typeDescriptions: {
      typeIdentifier: undefined, // resolved below
      typeString: undefined // resolved below
    },
    typeName: {
      id: GetId(),
      name: undefined, // resolved below
      nodeType: 'ElementaryTypeName',
      src: '0:0:0',
      typeDescriptions: {
        typeIdentifier: undefined, // resolved below
        typeString: undefined // resolved below
      }
    },
    visibility: isStateVariable ? 'public' : 'internal'
  }

  const variableBase = {
    nodeType: isStateVariable ? 'VariableDeclaration' : 'VariableDeclarationStatement',
    src: '0:0:0',
    id: GetId(),
  }

  const variableValue = {
    hexValue: '',
    id: GetId(),
    isConstant: false,
    isLValue: false,
    isPure: true,
    kind: undefined, // resolved below
    lValueRequested: false,
    nodeType: 'Literal',
    src: '0:0:0',
    typeDescriptions: {
      typeIdentifier: undefined, // resolved below
      typeString: undefined, // resolved below
    },
    value: undefined // resolved below
  }

  let variable = {}
  if (isStateVariable) {
    variable = {...variableBase, ...variableAttributes}
    variable.value = variableValue
  }
  else { // variable declaration within functions
    variable = {...variableBase }
    variable.assignments = [], // TODO: understand this
    variable.declarations = [variableAttributes]
    variable.initialValue = variableValue
  }

  if (initializer.type === 'CallExpression') {

    const calleeName = initializer.callee.name
    const {typeIdentifier, typeString, kind} = fordTypes2SolidityTypes[calleeName]

    let target = isStateVariable ? variable : variable.declarations[0]

    target.typeDescriptions.typeIdentifier = typeIdentifier
    target.typeDescriptions.typeString = typeString
    target.typeName.name = typeString
    target.typeName.typeDescriptions.typeIdentifier = typeIdentifier
    target.typeName.typeDescriptions.typeString = typeString

    const argument = initializer.arguments[0]

    target = isStateVariable ? variable.value : variable.initialValue
    target.kind = kind

    if (['u8', 'u16', 'u32', 'u64', 'u128', 'u256'].includes(calleeName)) {
      target.typeDescriptions.typeIdentifier = `t_rational_${argument.value}_by_1`
      target.typeDescriptions.typeString = `int_const ${argument.value}`
      target.value = `${argument.value}`
    } else if (['i8', 'i16', 'i32', 'i64', 'i128', 'i256'].includes(calleeName)) { // TODO: handle negative integers
      target.typeDescriptions.typeIdentifier = `t_rational_${argument.value}_by_1`
      target.typeDescriptions.typeString = `int_const ${argument.value}`
      target.value = `${argument.value}`
    } else if (calleeName === 'address') { // type address

      console.log('@node', JSON.stringify(node, null, 2))

      target.typeDescriptions.typeIdentifier = `t_address`
      target.typeDescriptions.typeString = `address`
      target.value = `${argument.value}`
    }
  }
  else if (initializer.type === 'ObjectLiteral') {}
  else if (initializer.type === 'NumericLiteral') {
    let target = isStateVariable ? variable : variable.declarations[0]

    target.typeDescriptions.typeIdentifier = 't_uint256'
    target.typeDescriptions.typeString = 'uint256'
    target.typeName.name = 'uint256'
    target.typeName.typeDescriptions.typeIdentifier = 't_uint256'
    target.typeName.typeDescriptions.typeString = 'uint256'

    target = isStateVariable ? variable.value : variable.initialValue

    target.kind = 'number'
    target.typeDescriptions.typeIdentifier = `t_rational_${initializer.value}_by_1`
    target.typeDescriptions.typeString = `int_const ${initializer.value}`
    target.value = `${initializer.value}`
  }
  else if (initializer.type === 'StringLiteral') {
    let target = isStateVariable ? variable : variable.declarations[0]

    target.typeDescriptions.typeIdentifier = 't_string_storage'
    target.typeDescriptions.typeString = 'string'
    target.typeName.name = 'string'
    target.typeName.typeDescriptions.typeIdentifier = 't_string_storage_ptr'
    target.typeName.typeDescriptions.typeString = 'string'

    target = isStateVariable ? variable.value : variable.initialValue

    target.kind = 'string'
    target.typeDescriptions.typeIdentifier = `t_stringliteral`
    target.typeDescriptions.typeString = `literal_string "${initializer.value}"`
    target.value = `${initializer.value}`
  }
  else if (initializer.type === 'BooleanLiteral') {
    let target = isStateVariable ? variable : variable.declarations[0]

    target.typeDescriptions.typeIdentifier = 't_bool'
    target.typeDescriptions.typeString = 'bool'
    target.typeName.name = 'bool'
    target.typeName.typeDescriptions.typeIdentifier = 't_bool'
    target.typeName.typeDescriptions.typeString = 'bool'

    target = isStateVariable ? variable.value : variable.initialValue

    target.kind = 'bool'
    target.typeDescriptions.typeIdentifier = `t_bool`
    target.typeDescriptions.typeString = 'bool'
    target.value = `${initializer.value}`
  } else {} // NullLiteral

  return variable
}

module.exports = {
  VariableDeclaration,
}


