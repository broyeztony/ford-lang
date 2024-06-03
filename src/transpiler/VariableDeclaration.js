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
function VariableDeclaration(node) {

  const inputDeclaration = node.declarations[0]
  const initializer = inputDeclaration.initializer

  const variableAttributes = VariableBase(inputDeclaration.id.name, node.stateVariable, 'internal')
  const variableBase = { // inside a function
    nodeType: 'VariableDeclarationStatement',
    src: source,
    id: GetId(),
  }

  let variable = {}

  variable = { ...variableBase }
  variable.assignments = [], // TODO: understand this
  variable.declarations = [ variableAttributes ]

  if (initializer) {

    let variableValue = VariableValue()

    variable.initialValue = variableValue

    if (initializer.type === 'UnaryExpression') {
      if (!(initializer.operator === '-' && initializer.argument.type === 'NumericLiteral')) {
        throw new Error('Invalid initializer: UnaryExpression')
      }

      // no explicit type so we default to uint256
      let declaration = variable.declarations[0]
      declaration.typeDescriptions.typeIdentifier = 't_int256'
      declaration.typeDescriptions.typeString = 'int256'
      declaration.typeName.name = 'int256'
      declaration.typeName.typeDescriptions.typeIdentifier = 't_int256'
      declaration.typeName.typeDescriptions.typeString = 'int256'

      delete variable.initialValue.kind
      delete variable.initialValue.value

      variable.initialValue.nodeType = 'UnaryOperation'
      variable.initialValue.operator = '-'
      variable.initialValue.prefix = true

      variable.initialValue.typeDescriptions.typeIdentifier = `t_rational_minus_${initializer.argument.value}_by_1`
      variable.initialValue.typeDescriptions.typeString = `int_const -${initializer.argument.value}`

      // handle value within subExpression
      variable.initialValue.subExpression = SubExpression(
        'Literal',
        'number',
        {
          typeIdentifier: `t_rational_${initializer.argument.value}_by_1`,
          typeString: `int_const ${initializer.argument.value}`
        },
  `${initializer.argument.value}`
      )
    }
    else if (initializer.type === 'CallExpression') {

      const calleeName = initializer.callee.name
      const {typeIdentifier, typeString, kind} = FordTypes2SolidityTypes[calleeName]

      let declaration = variable.declarations[0]

      declaration.typeDescriptions.typeIdentifier = typeIdentifier
      declaration.typeDescriptions.typeString = typeString
      declaration.typeName.name = typeString
      declaration.typeName.typeDescriptions.typeIdentifier = typeIdentifier
      declaration.typeName.typeDescriptions.typeString = typeString

      const argument = initializer.arguments[0]

      if (initializer.arguments.length > 0 &&
        initializer.arguments[0].type === 'UnaryExpression') {

        if (!['i8', 'i16', 'i32', 'i64', 'i128', 'i256'].includes(calleeName)) { // TODO: handle negative integers
          throw new Error('Invalid initializer: UnaryExpression')
        }

        const argument = initializer.arguments[0]

        delete variable.initialValue.kind
        delete variable.initialValue.value

        variable.initialValue.nodeType = 'UnaryOperation'
        variable.initialValue.operator = '-'
        variable.initialValue.prefix = true

        variable.initialValue.typeDescriptions.typeIdentifier = `t_rational_minus_${argument.argument.value}_by_1`
        variable.initialValue.typeDescriptions.typeString = `int_const -${argument.argument.value}`

        // handle value within subExpression
        variable.initialValue.subExpression = SubExpression(
          'Literal',
          'number',
          {
            typeIdentifier: `t_rational_${argument.argument.value}_by_1`,
            typeString: `int_const ${argument.argument.value}`
          },
          `${argument.argument.value}`
        )

      } else if (initializer.arguments[0]) {

        variable.initialValue.kind = kind
        variable.initialValue.nodeType = 'Literal'

        if (['u8', 'u16', 'u32', 'u64', 'u128', 'u256'].includes(calleeName)) {
          variable.initialValue.typeDescriptions.typeIdentifier = `t_rational_${initializer.arguments[0].value}_by_1`
          variable.initialValue.typeDescriptions.typeString = `int_const ${initializer.arguments[0].value}`
          variable.initialValue.value = `${initializer.arguments[0].value}`
        } else if (['i8', 'i16', 'i32', 'i64', 'i128', 'i256'].includes(calleeName)) { // TODO: handle negative integers
          variable.initialValue.typeDescriptions.typeIdentifier = `t_rational_${initializer.arguments[0].value}_by_1`
          variable.initialValue.typeDescriptions.typeString = `int_const ${initializer.arguments[0].value}`
          variable.initialValue.value = `${initializer.arguments[0].value}`
        } else if (calleeName === 'address') { // type address
          variable.initialValue.typeDescriptions.typeIdentifier = `t_address`
          variable.initialValue.typeDescriptions.typeString = `address`

          if (initializer.arguments[0]) {
            variable.initialValue.value = `${initializer.arguments[0].value}`
          }
        }
      } else {
        delete variable.initialValue
      }
    } else if (initializer.type === 'ObjectLiteral') {
    } else if (initializer.type === 'NumericLiteral') {
      NumericLiteral(variable.declarations[0], variable, initializer)
    } else if (initializer.type === 'StringLiteral') {
      variable.declarations[0].storageLocation = 'memory'
      StringLiteral(variable.declarations[0], variable, initializer)
    } else if (initializer.type === 'BooleanLiteral') {
      BooleanLiteral(variable.declarations[0], variable, initializer)
    } else {
    } // NullLiteral
  }

  return variable
}

function NumericLiteral(declaration, variable, initializer) {

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
}

function StringLiteral(declaration, variable, initializer) {

  declaration.typeDescriptions.typeIdentifier = 't_string_memory_ptr'
  declaration.typeDescriptions.typeString = 'string'
  declaration.typeName.name = 'string'
  declaration.typeName.typeDescriptions.typeIdentifier = 't_string_storage_ptr'
  declaration.typeName.typeDescriptions.typeString = 'string'

  variable.initialValue.kind = 'string'
  variable.initialValue.nodeType = 'Literal'

  variable.initialValue.typeDescriptions.typeIdentifier = `t_stringliteral`
  variable.initialValue.typeDescriptions.typeString = `literal_string "${initializer.value}"`
  variable.initialValue.value = `${initializer.value}`
}

function BooleanLiteral(declaration, variable, initializer) {
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
}

module.exports = {
  VariableDeclaration,
}
