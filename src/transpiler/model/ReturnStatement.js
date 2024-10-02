const {GetId} = require("../utils");
const {NumericLiteralValue} = require("./NumericLiteral");
const {CallExpression} = require("./CallExpression");

function ReturnStatement (node, parentNode, metadata) {

  // console.log('@ReturnStatement', node, parentNode)

  const returnStatement = {
    id: GetId(),
    nodeType: 'Return',
    src: source,
    expression: {}
  }

  switch (node.argument.type) {
    case 'NumericLiteral':
        returnStatement.expression = NumericLiteralValue(node.argument.value)
      break;
    // TODO: implement StringLiteral, BooleanLiteral, so forth, on the same model
    case 'CallExpression':
        returnStatement.expression = CallExpression(node.argument, parentNode, metadata)
      break;
  }

  return returnStatement
}

module.exports = {
  ReturnStatement
}
