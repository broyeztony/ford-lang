const {GetId} = require("./utils");

/**
{
  "type": "ForStatement",
  "init": {
    "type": "VariableStatement",
    "stateVariable": false,
    "declarations": [
      {
        "type": "VariableDeclaration",
        "id": {
          "type": "Identifier",
          "name": "i"
        },
        "initializer": {
          "type": "NumericLiteral",
          "value": 0
        }
      }
    ]
  },
  "test": {
    "type": "NumericLiteral",
    "value": 10
  },
  "body": {
    "type": "BlockStatement",
    "body": []
  }
}
*/
function ForStatement(node) {

  const declaration = node.init.declarations[0]
  const initializer = declaration.initializer

  if (declaration.type !== 'VariableDeclaration' && initializer.type !== 'NumericLiteral') {
    throw new SyntaxError('The node is not a valid ForStatement.')
  }

  const loopIdentifier = declaration.id.name
  const initializerValue = initializer.value

  if (node.test.type !== 'NumericLiteral') {
    throw new SyntaxError('The node is not a valid ForStatement.')
  }
  const testValue = node.test.value
  const body = node.body

  const forStmt = {
    id: GetId(),
    body: LoopBody(node),
    condition: Condition(node),
    initializationExpression: InitializationExpression(node),
    loopExpression: LoopExpression(node),
    isSimpleCounterLoop : true,
    nodeType : 'ForStatement',
    src: source,
  }

  return forStmt
}

function InitializationExpression(node) {

  const loopIdentifier = node.init.declarations[0].id.name
  const initializationExpression = {
    assignments: [],
    declarations: [{
      id: GetId(),
      constant : false,
      mutability : 'mutable',
      name : loopIdentifier,
      nameLocation : '0:0:0',
      nodeType: 'VariableDeclaration',
      scope : currentScope++,
      src : '0:0:0',
      stateVariable : false,
      storageLocation : 'default',
      typeDescriptions : {
        typeIdentifier : 't_uint256',
        typeString : 'uint256'
      },
      typeName: {
        id: GetId(),
        name: 'uint256',
        nodeType: 'ElementaryTypeName',
        src : '0:0:0',
        typeDescriptions: {
          typeIdentifier : 't_uint256',
          typeName: 'uint256',
        },
        visibility: 'internal',
      }
    }],
    initialValue: InitialValue(node),
    nodeType : 'VariableDeclarationStatement',
    src: '0:0:0',
    id: GetId(),
  }

  return initializationExpression
}

function InitialValue(node) {

  return {
    hexValue: '',
    id: GetId(),
    isConstant : false,
    isLValue : false,
    isPure : true,
    kind : "number",
    lValueRequested: false,
    nodeType : "Literal",
    src : '0:0:0',
    typeDescriptions: {
      typeIdentifier : `t_rational_${node.init.declarations[0].initializer.value}_by_1`,
      typeString : `int_const ${node.init.declarations[0].initializer.value}`
    },
    value: `${node.init.declarations[0].initializer.value}`
  }
}


function Condition(node) {

  const condition = {
    id: GetId(),
    commonType: {
      typeIdentifier : 't_uint256',
      typeString : 'uint256'
    },
    leftExpression: LeftExpression(node),
    rightExpression: RightExpression(node),
    isConstant: false,
    isLValue: false,
    isPure: false,
    lValueRequested : false,
    nodeType : 'BinaryOperation',
    operator : '<',
    src: '0:0:0',
    typeDescriptions: {
      typeIdentifier : 't_bool',
      typeString : 'bool'
    }
  }

  return condition
}

function LeftExpression(node) {

  const loopIdentifier = node.init.declarations[0].id.name
  return {
    id: GetId(),
    name: loopIdentifier,
    nodeType : 'Identifier',
    src : source,
    overloadedDeclarations: [],
    referencedDeclaration: 0,
    typeDescriptions: {
      typeIdentifier : 't_uint256',
      typeString : 'uint256'
    }
  }
}

function RightExpression(node) {

  return {
    id : GetId(),
    hexValue : '',
    isConstant : false,
    isLValue : false,
    isPure : true,
    kind : 'number',
    lValueRequested : false,
    nodeType : 'Literal',
    src : source,
    typeDescriptions: {
      typeIdentifier : `t_rational_${node.test.value}_by_1`,
      typeString : `int_const ${node.test.value}`
    },
    value : `${node.test.value}`
  }
}

function LoopExpression(node) {
  return {
    expression: Expression(node),
    id: GetId(),
    nodeType: 'ExpressionStatement',
    src: source
  }
}

function Expression(node) {

  const loopIdentifier = node.init.declarations[0].id.name
  return {
    id: GetId(),
    isConstant: false,
    isLValue: false,
    isPure: false,
    lValueRequested: false,
    nodeType: 'UnaryOperation',
    operator: '++',
    prefix: false,
    src : source,
    subExpression: {
      id: GetId(),
      name: loopIdentifier,
      nodeType: 'Identifier',
      overloadedDeclarations: [],
      src: source,
      typeDescriptions: {
        typeIdentifier : 't_uint256',
        typeString : 'uint256'
      },
      referencedDeclaration: 0 // TODO: check this
    },
    typeDescriptions: {
      typeIdentifier : 't_uint256',
      typeString : 'uint256'
    }
  }
}

function LoopBody(node) {

  return {
    id: GetId(),
    nodeType: 'Block',
    src: source,
    statements: []
  }
}

module.exports = {
  ForStatement,
}


