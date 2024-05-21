
const fordTypes2SolidityTypes = {
  'u8': { typeIdentifier: 't_uint8', typeString: 'uint8', kind: 'number' },
  'u16': { typeIdentifier: 't_uint16', typeString: 'uint16', kind: 'number' },
  'u32': { typeIdentifier: 't_uint32', typeString: 'uint32', kind: 'number' },
  'u64': { typeIdentifier: 't_uint64', typeString: 'uint64', kind: 'number' },
  'u128': { typeIdentifier: 't_uint128', typeString: 'uint128', kind: 'number' },
  'u256': { typeIdentifier: 't_uint256', typeString: 'uint256', kind: 'number' },
}

function VariableStatement(node) {

  const declaration = node.declarations[0]
  const initializer = declaration.initializer
  const argument = initializer.arguments[0]

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
      const { typeIdentifier, typeString, kind } = fordTypes2SolidityTypes[initializer.callee.name]
      vs.typeDescriptions.typeIdentifier = typeIdentifier
      vs.typeDescriptions.typeString = typeString
      vs.typeName.name = typeString
      vs.typeName.typeDescriptions.typeIdentifier = typeIdentifier
      vs.typeName.typeDescriptions.typeString = typeString
      vs.value.kind = kind

      // for NumericLiteral
      if (argument.type === 'NumericLiteral') {
        vs.value.typeDescriptions.typeIdentifier = `t_rational_${argument.value}_by_1`
        vs.value.typeDescriptions.typeString = `int_const ${argument.value}`
        vs.value.value = `${argument.value}`
      }

     break
    case 'ObjectLiteral':
    case 'NumericLiteral':
    case 'StringLiteral':
    case 'BooleanLiteral':
    case 'NullLiteral':

      break
  }

  return vs;
}

module.exports = {
  VariableStatement
}
