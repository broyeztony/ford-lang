const {Sol_StateVariableDeclaration} = require("./sol_StateVariableDeclaration");
const {Sol_VariableDeclarationStatement} = require("./sol_VariableDeclarationStatement");

/***
VariableStatement {
  "type": "VariableStatement",
  "stateVariable": true|false,
  "declarations": [
    {
      "type": "VariableDeclaration",
      "id": {
        "type": "Identifier",
        "name": "owner"
      },
      "initializer": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "address"
        },
        "arguments": []
      }
    }
  ]
}
*/
function VariableStatement(node, metadata) {
  return node.stateVariable ? Sol_StateVariableDeclaration(node, metadata) : Sol_VariableDeclarationStatement(node, metadata)
}

module.exports = {
  VariableStatement
}
