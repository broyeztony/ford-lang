const {StringLiteralValue} = require("./StringLiteral");
const {BooleanLiteralValue} = require("./BooleanLiteral");
const {NumericLiteralValue} = require("./NumericLiteral");
const {Sol_VariableDeclaration} = require("./sol_VariableDeclaration");
const {GetId} = require("../utils");
const {CallExpressionValue} = require("./CallExpression");


function Sol_VariableDeclarationStatement(node, metadata) {

  const { type, id, initializer } = node.declarations[0]

  let solVariableDeclarationStatement = {
    assignments: [],
    declarations: [],
    nodeType : 'VariableDeclarationStatement',
    id: GetId(),
    src: source
  }

  let solVarDeclaration = Sol_VariableDeclaration(node.declarations[0], metadata, false)
  solVariableDeclarationStatement.declarations.push(solVarDeclaration)

  // handle the `value` field if initializer.value is not null or initializer.arguments is not empty
  // console.log('@Sol_StateVariableDeclaration, initializer.value:', initializer.value, 'initializer.arguments:', initializer.arguments)

  if (initializer.hasOwnProperty('value') || (initializer.arguments && initializer.arguments.length > 0)) {
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
      case 'ObjectLiteral'  : console.error('ERROR: Not Implemented'); break
      case 'CallExpression' :
        solVarValue = CallExpressionValue(initializer);
        break
    }
    solVariableDeclarationStatement.initialValue = solVarValue
  }

  return solVariableDeclarationStatement
}

module.exports = {
  Sol_VariableDeclarationStatement
};
