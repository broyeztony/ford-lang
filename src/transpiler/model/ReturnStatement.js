const {GetId} = require("../utils");
const {NumericLiteralValue} = require("./NumericLiteral");

function ReturnStatement (node, metadata) {

  console.log('@ReturnStatement', node)

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
  }

  return returnStatement
}

module.exports = {
  ReturnStatement
}
