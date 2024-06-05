const {Sol_StateVariableDeclaration} = require("./sol_StateVariableDeclaration");
const {Sol_VariableDeclarationStatement} = require("./sol_VariableDeclarationStatement");

function VariableStatement(node, metadata) {

  // console.log('VariableStatement', JSON.stringify(node, null, 2), node.stateVariable);

  if (node.stateVariable) {
    return Sol_StateVariableDeclaration(node, metadata)
  } else {
    return Sol_VariableDeclarationStatement(node, metadata)
  }

}

module.exports = {
  VariableStatement
}

/***
VariableStatement {
  "type": "VariableStatement",
  "stateVariable": true,
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
--------------------------------------------------------------------------------------
VariableStatement {
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
            "value": "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c"
          }
        ]
      }
    }
  ]
}
--------------------------------------------------------------------------------------
 VariableStatement {
  "type": "VariableStatement",
  "stateVariable": true,
  "declarations": [
    {
      "type": "VariableDeclaration",
      "id": {
        "type": "Identifier",
        "name": "a"
      },
      "initializer": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "i8"
        },
        "arguments": [
          {
            "type": "UnaryExpression",
            "operator": "-",
            "argument": {
              "type": "NumericLiteral",
              "value": 2
            }
          }
        ]
      }
    }
  ]
}
--------------------------------------------------------------------------------------
 VariableStatement {
  "type": "VariableStatement",
  "stateVariable": false,
  "declarations": [
    {
      "type": "VariableDeclaration",
      "id": {
        "type": "Identifier",
        "name": "st"
      },
      "initializer": {
        "type": "StringLiteral",
        "value": "hey!"
      }
    }
  ]
}
--------------------------------------------------------------------------------------
 VariableStatement {
  "type": "VariableStatement",
  "stateVariable": false,
  "declarations": [
    {
      "type": "VariableDeclaration",
      "id": {
        "type": "Identifier",
        "name": "w"
      },
      "initializer": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "u8"
        },
        "arguments": []
      }
    }
  ]
}
--------------------------------------------------------------------------------------
VariableStatement {
  "type": "VariableStatement",
  "stateVariable": false,
  "declarations": [
    {
      "type": "VariableDeclaration",
      "id": {
        "type": "Identifier",
        "name": "z"
      },
      "initializer": {
        "type": "CallExpression",
        "callee": {
          "type": "Identifier",
          "name": "i16"
        },
        "arguments": [
          {
            "type": "UnaryExpression",
            "operator": "-",
            "argument": {
              "type": "NumericLiteral",
              "value": 100
            }
          }
        ]
      }
    }
  ]
}
--------------------------------------------------------------------------------------
VariableStatement {
  "type": "VariableStatement",
  "stateVariable": false,
  "declarations": [
    {
      "type": "VariableDeclaration",
      "id": {
        "type": "Identifier",
        "name": "y"
      },
      "initializer": {
        "type": "UnaryExpression",
        "operator": "-",
        "argument": {
          "type": "NumericLiteral",
          "value": 1
        }
      }
    }
  ]
}
*/
