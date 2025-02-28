const {GetId, solidityTypeIdentifier, solidityTypeString, solidityKind} = require("../utils")

function ForStatement(node, metadata) {

  // console.log('@ ForStatement', JSON.stringify(node, null, 2))

  const declaration = node.init.declarations[0]
  const initializer = declaration.initializer

  if (declaration.type !== 'VariableDeclaration' && initializer.type !== 'NumericLiteral') {
    throw new SyntaxError('The node is not a valid ForStatement.')
  }

  const loopIdentifier = declaration.varName
  const initializerValue = initializer.value

  if (!(node.test.type === 'NumericLiteral' || node.test.type === 'Identifier')) {
    throw new SyntaxError('The node is not a valid ForStatement.')
  }
  const testValue = node.test.value
  const body = node.body

  const forStmt = {
    id: GetId(),
    body: LoopBody(node),
    condition: Condition(node), // i < expression
    initializationExpression: InitializationExpression(node), // let i = 0
    loopExpression: LoopExpression(node), // i++
    isSimpleCounterLoop : true,
    nodeType : 'ForStatement',
    src: source,
  }

  return forStmt
}

function InitializationExpression(node) {

  const declaration = node.init.declarations[0]
  const loopIdentifier = declaration.varName

  const typeIdentifier = solidityTypeIdentifier(declaration.varType)
  const typeString = solidityTypeString(declaration.varType)

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
        typeIdentifier,
        typeString
      },
      typeName: {
        id: GetId(),
        name: typeString,
        nodeType: 'ElementaryTypeName',
        src : '0:0:0',
        typeDescriptions: {
          typeIdentifier,
          typeName: typeString,
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

  const declaration = node.init.declarations[0]
  const loopIdentifier = declaration.varName
  const kind = solidityKind(declaration.varType).kind

  return {
    hexValue: '',
    id: GetId(),
    isConstant : false,
    isLValue : false,
    isPure : true,
    kind,
    lValueRequested: false,
    nodeType : "Literal",
    src : '0:0:0',
    typeDescriptions: {
      typeIdentifier : `t_rational_${declaration.initializer.value}_by_1`,
      typeString : `int_const ${declaration.initializer.value}`
    },
    value: `${declaration.initializer.value}`
  }
}

function Condition(node) {

  const declaration = node.init.declarations[0]
  const loopIdentifier = declaration.varName

  const typeIdentifier = solidityTypeIdentifier(declaration.varType)
  const typeString = solidityTypeString(declaration.varType)

  const condition = {
    id: GetId(),
    commonType: {
      typeIdentifier,
      typeString
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

  const declaration = node.init.declarations[0]
  const loopIdentifier = declaration.varName
  const typeIdentifier = solidityTypeIdentifier(declaration.varType)
  const typeString = solidityTypeString(declaration.varType)

  return {
    id: GetId(),
    name: loopIdentifier,
    nodeType : 'Identifier',
    src : source,
    overloadedDeclarations: [],
    referencedDeclaration: 0,
    typeDescriptions: {
      typeIdentifier,
      typeString
    }
  }
}

function RightExpression(node) {

  const declaration = node.init.declarations[0]
  const loopIdentifier = declaration.varName
  const typeIdentifier = solidityTypeIdentifier(declaration.varType)
  const typeString = solidityTypeString(declaration.varType)
  const kind = solidityKind(declaration.varType)

  const rhs = {
    id : GetId(),
    src : source,
  }

  switch (node.test.type) {
    case 'NumericLiteral':
      rhs.hexValue = ''
      rhs.isConstant = false
      rhs.isLValue = false
      rhs.isPure = true
      rhs.kind = kind
      rhs.lValueRequested = false
      rhs.nodeType = 'Literal'
      rhs.typeDescriptions = {
        typeIdentifier: `t_rational_${node.test.value}_by_1`,
        typeString: `int_const ${node.test.value}`
      }
      rhs.value = `${node.test.value}`
      break
    case 'Identifier':
        rhs.name = node.test.name
        rhs.nodeType = 'Identifier'
        rhs.overloadedDeclarations = []
        rhs.referencedDeclaration = 0
        rhs.typeDescriptions = {
          typeIdentifier,
          typeString
        }
      break
    default:
      throw new Error(`Invalid Right-Hand Side for For statement. Expected 'NumericLiteral' or 'Identifer'. Found: '${node.test.type}'`)
  }

  return rhs
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

  const declaration = node.init.declarations[0]
  const loopIdentifier = declaration.varName
  const typeIdentifier = solidityTypeIdentifier(declaration.varType)
  const typeString = solidityTypeString(declaration.varType)

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
        typeIdentifier,
        typeString
      },
      referencedDeclaration: 0 // TODO: check this
    },
    typeDescriptions: {
      typeIdentifier,
      typeString
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


