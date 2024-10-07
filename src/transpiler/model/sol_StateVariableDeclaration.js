const {Sol_VariableDeclaration} = require("./sol_VariableDeclaration");
const {StringLiteralTypings, StringLiteralValue} = require("./StringLiteral");
const {BooleanLiteralTypings, BooleanLiteralValue} = require("./BooleanLiteral");
const {NumericLiteralTypings, NumericLiteralValue} = require("./NumericLiteral");
const {CallExpressionTypings, CallExpressionValue} = require("./CallExpression");

function Sol_StateVariableDeclaration (node, metadata) {

  const {type, id, initializer} = node.declarations[0]

  let solVarDeclaration = Sol_VariableDeclaration(node.declarations[0], metadata, true)

  // TODO: handle solVarDeclaration.typeName.stateMutability from metadata spec file
  solVarDeclaration.typeName.stateMutability = 'nonpayable'

  // handle the `value` field if initializer.value is defined or initializer.arguments is not empty
  let isMapping = false
  const initializerHasArgs = initializer.arguments && initializer.arguments.length >= 0
  if (initializer.hasOwnProperty('value') || initializerHasArgs) {
    let solVarValue;
    switch (initializer.type) {
      case 'StringLiteral'  :
        solVarValue = StringLiteralValue(initializer.value);
        break
      case 'BooleanLiteral' :
        solVarValue = BooleanLiteralValue(initializer.value);
        break
      case 'NumericLiteral' :
        solVarValue = NumericLiteralValue(initializer.value);
        break
      case 'ObjectLiteral'  :
        console.error('ERROR: Not Implemented');
        break
      case 'CallExpression' :
        solVarValue = CallExpressionValue(initializer);

        if (initializer.callee.type === 'mapping') {
          isMapping = true
        }

        break
    }

    if (isMapping) {
      solVarDeclaration.typeDescriptions = solVarValue.typeDescriptions
      solVarDeclaration.typeName = solVarValue.typeName
    } else {
      solVarDeclaration.value = solVarValue
    }

  }

  return solVarDeclaration
}

module.exports = {
  Sol_StateVariableDeclaration,
}
