const { GetId} = require("./../utils");
const {CallExpressionTypings} = require("./CallExpression");
const {StringLiteralTypings} = require("./StringLiteral");
const {BooleanLiteralTypings} = require("./BooleanLiteral");
const {NumericLiteralTypings} = require("./NumericLiteral");

function Sol_VariableDeclaration(node, metadata, isStateVar) {

  const { type, id, initializer } = node

  let solVarDeclaration = {
    constant: false,
    id: GetId(),
    mutability: 'mutable',
    name: id.name,
    nameLocation: source,
    nodeType: 'VariableDeclaration',
    scope: currentScope++,
    src: source,
    stateVariable: isStateVar,
    storageLocation: 'default',
    typeDescriptions: {},
    typeName: {
      id: GetId(),
      /* stateMutability */
      nodeType: 'ElementaryTypeName',
      src: source,
      typeDescriptions: {}
    },
    visibility: 'public' // TODO: handle me
  }

  // process initializer
  // type can be a `CallExpression`, a `StringLiteral`, a `BooleanLiteral`, `NumericLiteral`, or an `ObjectLiteral`
  switch (initializer.type) {
    case 'StringLiteral'  : StringLiteralTypings(solVarDeclaration);  break
    case 'BooleanLiteral' : BooleanLiteralTypings(solVarDeclaration); break
    case 'NumericLiteral' : NumericLiteralTypings(solVarDeclaration); break
    case 'ObjectLiteral'  : console.error('ERROR: Not Implemented');  break
    case 'CallExpression' : CallExpressionTypings(solVarDeclaration, initializer.callee); break
  }

  return solVarDeclaration
}

module.exports = {
  Sol_VariableDeclaration,
}
