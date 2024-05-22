
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

function VariableDeclarationStatement(node) {

  const declaration = node.declarations[0]
  const initializer = declaration.initializer

  const vds = {
    nodeType: 'VariableDeclarationStatement',
    src: '0:0:0',
    assignments: [], // TODO: understand this
    declarations: [
      {
        constant: false,
        id: currentId++,
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
        visibility: 'internal'
      }
    ],
    id: currentId++,
    initialValue: {
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
  }

  switch (initializer.type) {
    case 'CallExpression':

      const calleeName = initializer.callee.name
      const { typeIdentifier, typeString, kind } = fordTypes2SolidityTypes[calleeName]
      vds.declarations[0].typeDescriptions.typeIdentifier = typeIdentifier
      vds.declarations[0].typeDescriptions.typeString = typeString
      vds.declarations[0].typeName.name = typeString
      vds.declarations[0].typeName.typeDescriptions.typeIdentifier = typeIdentifier
      vds.declarations[0].typeName.typeDescriptions.typeString = typeString
      vds.initialValue.kind = kind

      const argument = initializer.arguments[0]

      if (['u8', 'u16', 'u32', 'u64', 'u128', 'u256'].includes(calleeName)) {
        vds.initialValue.typeDescriptions.typeIdentifier = `t_rational_${argument.value}_by_1`
        vds.initialValue.typeDescriptions.typeString = `int_const ${argument.value}`
        vds.initialValue.value = `${argument.value}`
        break
      }
      else if (['i8', 'i16', 'i32', 'i64', 'i128', 'i256'].includes(calleeName)) { // TODO: handle negative integers
        vds.initialValue.typeDescriptions.typeIdentifier = `t_rational_${argument.value}_by_1`
        vds.initialValue.typeDescriptions.typeString = `int_const ${argument.value}`
        vds.initialValue.value = `${argument.value}`
      }
      else if (calleeName === 'address') { // type address
        vds.initialValue.typeDescriptions.typeIdentifier = `t_address`
        vds.initialValue.typeDescriptions.typeString = `address`
        vds.initialValue.value = `${argument.value}`
      }

     break
    case 'ObjectLiteral':
      break
    case 'NumericLiteral':
      vds.declarations[0].typeDescriptions.typeIdentifier = 't_uint256'
      vds.declarations[0].typeDescriptions.typeString = 'uint256'
      vds.declarations[0].typeName.name = 'uint256'
      vds.declarations[0].typeName.typeDescriptions.typeIdentifier = 't_uint256'
      vds.declarations[0].typeName.typeDescriptions.typeString = 'uint256'
      vds.initialValue.kind = 'number'
      vds.initialValue.typeDescriptions.typeIdentifier = `t_rational_${initializer.value}_by_1`
      vds.initialValue.typeDescriptions.typeString = `int_const ${initializer.value}`
      vds.initialValue.value = `${initializer.value}`
      break
    case 'StringLiteral':
      vds.declarations[0].typeDescriptions.typeIdentifier = 't_string_storage'
      vds.declarations[0].typeDescriptions.typeString = 'string'
      vds.declarations[0].typeName.name = 'string'
      vds.declarations[0].typeName.typeDescriptions.typeIdentifier = 't_string_storage_ptr'
      vds.declarations[0].typeName.typeDescriptions.typeString = 'string'
      vds.initialValue.kind = 'string'
      vds.initialValue.typeDescriptions.typeIdentifier = `t_stringliteral`
      vds.initialValue.typeDescriptions.typeString = `literal_string "${initializer.value}"`
      vds.initialValue.value = `${initializer.value}`
      break
    case 'BooleanLiteral':
      vds.declarations[0].typeDescriptions.typeIdentifier = 't_bool'
      vds.declarations[0].typeDescriptions.typeString = 'bool'
      vds.declarations[0].typeName.name = 'bool'
      vds.declarations[0].typeName.typeDescriptions.typeIdentifier = 't_bool'
      vds.declarations[0].typeName.typeDescriptions.typeString = 'bool'
      vds.initialValue.kind = 'bool'
      vds.initialValue.typeDescriptions.typeIdentifier = `t_bool`
      vds.initialValue.typeDescriptions.typeString = 'bool'
      vds.initialValue.value = `${initializer.value}`
      break
    case 'NullLiteral':
      break
  }

  return vds;
}

module.exports = {
  VariableDeclarationStatement
}
