const {GetId, fordTypes2SolidityTypes} = require("./utils");

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
function VariableDeclaration(node) {

  const inputDeclaration = node.declarations[0]
  const initializer = inputDeclaration.initializer

  const variableAttributes = {
    constant: false,
    id: GetId(),
    mutability: 'mutable',
    name: inputDeclaration.id.name,
    nameLocation: source,
    nodeType: 'VariableDeclaration',
    scope: currentScope++,
    src: source,
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
      src: source,
      typeDescriptions: {
        typeIdentifier: undefined, // resolved below
        typeString: undefined // resolved below
      }
    },
    visibility: 'internal'
  }

  const variableBase = { // inside a function
    nodeType: 'VariableDeclarationStatement',
    src: source,
    id: GetId(),
  }

  let variable = {}

  variable = {...variableBase}
  variable.assignments = [], // TODO: understand this
  variable.declarations = [variableAttributes]

  if (initializer) {

    let variableValue = {
      hexValue: '',
      id: GetId(),
      isConstant: false,
      isLValue: false,
      isPure: true,
      kind: undefined, // resolved below
      lValueRequested: false,
      nodeType: undefined,
      src: source,
      typeDescriptions: {
        typeIdentifier: undefined, // resolved below
        typeString: undefined, // resolved below
      },
      value: undefined // resolved below
    }

    variable.initialValue = variableValue

    if (initializer.type === 'UnaryExpression') {
      if (!(initializer.operator === '-' && initializer.argument.type === 'NumericLiteral')) {
        throw new Error('Invalid initializer: UnaryExpression')
      }

      // no explicit type so we default to uint256
      let declaration = variable.declarations[0]
      declaration.typeDescriptions.typeIdentifier = 't_uint256'
      declaration.typeDescriptions.typeString = 'uint256'
      declaration.typeName.name = 'uint256'
      declaration.typeName.typeDescriptions.typeIdentifier = 't_uint256'
      declaration.typeName.typeDescriptions.typeString = 'uint256'

      delete variable.initialValue.kind
      delete variable.initialValue.value

      variable.initialValue.nodeType = 'UnaryOperation'
      variable.initialValue.operator = '-'
      variable.initialValue.prefix = true

      variable.initialValue.typeDescriptions.typeIdentifier = `t_rational_minus_${initializer.argument.value}_by_1`
      variable.initialValue.typeDescriptions.typeString = `int_const -${initializer.argument.value}`

      // handle value within subExpression
      variable.initialValue.subExpression = {
        hexValue: '',
        id: GetId(),
        isConstant: false,
        isLValue: false,
        isPure: true,
        kind: 'number',
        lValueRequested: false,
        nodeType: 'Literal',
        src: source,
        typeDescriptions: {
          typeIdentifier: undefined, // resolved below
          typeString: undefined, // resolved below
        },
        value: undefined // resolved below
      }

      variable.initialValue.subExpression.typeDescriptions.typeIdentifier = `t_rational_${initializer.argument.value}_by_1`
      variable.initialValue.subExpression.typeDescriptions.typeString = `int_const ${initializer.argument.value}`
      variable.initialValue.subExpression.value = `${initializer.argument.value}`
    }
    else if (initializer.type === 'CallExpression') {

      const calleeName = initializer.callee.name
      const {typeIdentifier, typeString, kind} = fordTypes2SolidityTypes[calleeName]

      let declaration = variable.declarations[0]

      declaration.typeDescriptions.typeIdentifier = typeIdentifier
      declaration.typeDescriptions.typeString = typeString
      declaration.typeName.name = typeString
      declaration.typeName.typeDescriptions.typeIdentifier = typeIdentifier
      declaration.typeName.typeDescriptions.typeString = typeString

      const argument = initializer.arguments[0]

      if (argument.type === 'UnaryExpression') {

        if (!['i8', 'i16', 'i32', 'i64', 'i128', 'i256'].includes(calleeName)) { // TODO: handle negative integers
          throw new Error('Invalid initializer: UnaryExpression')
        }

        //
        delete variable.initialValue.kind
        delete variable.initialValue.value

        variable.initialValue.nodeType = 'UnaryOperation'
        variable.initialValue.operator = '-'
        variable.initialValue.prefix = true

        variable.initialValue.typeDescriptions.typeIdentifier = `t_rational_minus_${argument.argument.value}_by_1`
        variable.initialValue.typeDescriptions.typeString = `int_const -${argument.argument.value}`

        // handle value within subExpression
        variable.initialValue.subExpression = {
          hexValue: '',
          id: GetId(),
          isConstant: false,
          isLValue: false,
          isPure: true,
          kind: 'number',
          lValueRequested: false,
          nodeType: 'Literal',
          src: source,
          typeDescriptions: {
            typeIdentifier: undefined, // resolved below
            typeString: undefined, // resolved below
          },
          value: undefined // resolved below
        }

        variable.initialValue.subExpression.typeDescriptions.typeIdentifier = `t_rational_${argument.argument.value}_by_1`
        variable.initialValue.subExpression.typeDescriptions.typeString = `int_const ${argument.argument.value}`
        variable.initialValue.subExpression.value = `${argument.argument.value}`
        //

      } else {
        variable.initialValue.kind = kind
        variable.initialValue.nodeType = 'Literal'

        if (['u8', 'u16', 'u32', 'u64', 'u128', 'u256'].includes(calleeName)) {
          variable.initialValue.typeDescriptions.typeIdentifier = `t_rational_${argument.value}_by_1`
          variable.initialValue.typeDescriptions.typeString = `int_const ${argument.value}`
          variable.initialValue.value = `${argument.value}`
        } else if (['i8', 'i16', 'i32', 'i64', 'i128', 'i256'].includes(calleeName)) { // TODO: handle negative integers
          variable.initialValue.typeDescriptions.typeIdentifier = `t_rational_${argument.value}_by_1`
          variable.initialValue.typeDescriptions.typeString = `int_const ${argument.value}`
          variable.initialValue.value = `${argument.value}`
        } else if (calleeName === 'address') { // type address
          variable.initialValue.typeDescriptions.typeIdentifier = `t_address`
          variable.initialValue.typeDescriptions.typeString = `address`
          variable.initialValue.value = `${argument.value}`
        }
      }


    } else if (initializer.type === 'ObjectLiteral') {
    } else if (initializer.type === 'NumericLiteral') {
      let declaration = variable.declarations[0]

      declaration.typeDescriptions.typeIdentifier = 't_uint256'
      declaration.typeDescriptions.typeString = 'uint256'
      declaration.typeName.name = 'uint256'
      declaration.typeName.typeDescriptions.typeIdentifier = 't_uint256'
      declaration.typeName.typeDescriptions.typeString = 'uint256'

      variable.initialValue.kind = 'number'
      variable.initialValue.nodeType = 'Literal'

      variable.initialValue.typeDescriptions.typeIdentifier = `t_rational_${initializer.value}_by_1`
      variable.initialValue.typeDescriptions.typeString = `int_const ${initializer.value}`
      variable.initialValue.value = `${initializer.value}`
    } else if (initializer.type === 'StringLiteral') {
      let declaration = variable.declarations[0]

      declaration.typeDescriptions.typeIdentifier = 't_string_storage'
      declaration.typeDescriptions.typeString = 'string'
      declaration.typeName.name = 'string'
      declaration.typeName.typeDescriptions.typeIdentifier = 't_string_storage_ptr'
      declaration.typeName.typeDescriptions.typeString = 'string'

      variable.initialValue.kind = 'string'
      variable.initialValue.nodeType = 'Literal'

      variable.initialValue.typeDescriptions.typeIdentifier = `t_stringliteral`
      variable.initialValue.typeDescriptions.typeString = `literal_string "${initializer.value}"`
      variable.initialValue.value = `${initializer.value}`
    } else if (initializer.type === 'BooleanLiteral') {
      let declaration = variable.declarations[0]

      declaration.typeDescriptions.typeIdentifier = 't_bool'
      declaration.typeDescriptions.typeString = 'bool'
      declaration.typeName.name = 'bool'
      declaration.typeName.typeDescriptions.typeIdentifier = 't_bool'
      declaration.typeName.typeDescriptions.typeString = 'bool'

      variable.initialValue.kind = 'bool'
      variable.initialValue.nodeType = 'Literal'

      variable.initialValue.typeDescriptions.typeIdentifier = `t_bool`
      variable.initialValue.typeDescriptions.typeString = 'bool'
      variable.initialValue.value = `${initializer.value}`
    } else {
    } // NullLiteral

  }

  return variable
}

module.exports = {
  VariableDeclaration,
}


