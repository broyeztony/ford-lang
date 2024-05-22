
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

function VariableStatement(node) {

  const declaration = node.declarations[0]
  const initializer = declaration.initializer

  const vs = {
    /* TODO: functionSelector: 'dad0be61', */
    id: currentId++,
    constant: false,
    mutability: 'mutable',
    name: declaration.id.name,
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
      id: currentId++,
      name: undefined, // resolved below
      nodeType: 'ElementaryTypeName',
      src: '0:0:0',
      typeDescriptions: {
        typeIdentifier: undefined, // resolved below
        typeString: undefined // resolved below
      }
    },
    value: {
      hexValue: '',
      id: currentId++,
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
    },
    visibility: 'public' // TODO: handle me
  }

  switch (initializer.type) {
    case 'CallExpression':

      const calleeName = initializer.callee.name
      const { typeIdentifier, typeString, kind } = fordTypes2SolidityTypes[calleeName]
      vs.typeDescriptions.typeIdentifier = typeIdentifier
      vs.typeDescriptions.typeString = typeString
      vs.typeName.name = typeString
      vs.typeName.typeDescriptions.typeIdentifier = typeIdentifier
      vs.typeName.typeDescriptions.typeString = typeString
      vs.value.kind = kind

      const argument = initializer.arguments[0]

      if (['u8', 'u16', 'u32', 'u64', 'u128', 'u256'].includes(calleeName)) {
          vs.value.typeDescriptions.typeIdentifier = `t_rational_${argument.value}_by_1`
          vs.value.typeDescriptions.typeString = `int_const ${argument.value}`
          vs.value.value = `${argument.value}`
          break
      }
      else if (['i8', 'i16', 'i32', 'i64', 'i128', 'i256'].includes(calleeName)) { // TODO: handle negative integers
        vs.value.typeDescriptions.typeIdentifier = `t_rational_${argument.value}_by_1`
        vs.value.typeDescriptions.typeString = `int_const ${argument.value}`
        vs.value.value = `${argument.value}`
      }
      else if (calleeName === 'address') { // type address
        vs.value.typeDescriptions.typeIdentifier = `t_address`
        vs.value.typeDescriptions.typeString = `address`
        vs.value.value = `${argument.value}`
      }

     break
    case 'ObjectLiteral':
      break
    case 'NumericLiteral':
      vs.typeDescriptions.typeIdentifier = 't_uint256'
      vs.typeDescriptions.typeString = 'uint256'
      vs.typeName.name = 'uint256'
      vs.typeName.typeDescriptions.typeIdentifier = 't_uint256'
      vs.typeName.typeDescriptions.typeString = 'uint256'
      vs.value.kind = 'number'
      vs.value.typeDescriptions.typeIdentifier = `t_rational_${initializer.value}_by_1`
      vs.value.typeDescriptions.typeString = `int_const ${initializer.value}`
      vs.value.value = `${initializer.value}`
      break
    case 'StringLiteral':
      vs.typeDescriptions.typeIdentifier = 't_string_storage'
      vs.typeDescriptions.typeString = 'string'
      vs.typeName.name = 'string'
      vs.typeName.typeDescriptions.typeIdentifier = 't_string_storage_ptr'
      vs.typeName.typeDescriptions.typeString = 'string'
      vs.value.kind = 'string'
      vs.value.typeDescriptions.typeIdentifier = `t_stringliteral`
      vs.value.typeDescriptions.typeString = `literal_string "${initializer.value}"`
      vs.value.value = `${initializer.value}`
      break
    case 'BooleanLiteral':
      vs.typeDescriptions.typeIdentifier = 't_bool'
      vs.typeDescriptions.typeString = 'bool'
      vs.typeName.name = 'bool'
      vs.typeName.typeDescriptions.typeIdentifier = 't_bool'
      vs.typeName.typeDescriptions.typeString = 'bool'
      vs.value.kind = 'bool'
      vs.value.typeDescriptions.typeIdentifier = `t_bool`
      vs.value.typeDescriptions.typeString = 'bool'
      vs.value.value = `${initializer.value}`
      break
    case 'NullLiteral':
      break
  }

  return vs;
}

module.exports = {
  VariableStatement
}
