const {Sol_VariableDeclaration} = require("./sol_VariableDeclaration");
const {StringLiteralValue} = require("./StringLiteral");
const {BooleanLiteralValue} = require("./BooleanLiteral");
const {NumericLiteralValue} = require("./NumericLiteral");
const {AddressLiteralValue} = require("./AddressLiteral");

function Sol_StateVariableDeclaration (node, metadata) {

  const {varName, varType, initializer} = node.declarations[0]
  // console.log('@varName', varName, 'varType', varType)

  let solVarDeclaration = Sol_VariableDeclaration(node.declarations[0], metadata, true)
  // console.log('@initializer', initializer)

  // TODO: handle solVarDeclaration.typeName.stateMutability from metadata spec file
  solVarDeclaration.typeName.stateMutability = 'nonpayable'

  if (initializer && initializer.hasOwnProperty('value')) {
    let solVarValue;
    switch (varType) {
      case 'u8'   :
      case 'u16'  :
      case 'u24'  :
      case 'u32'  :
      case 'u40'  :
      case 'u48'  :
      case 'u56'  :
      case 'u64'  :
      case 'u72'  :
      case 'u80'  :
      case 'u88'  :
      case 'u96'  :
      case 'u104' :
      case 'u112' :
      case 'u120' :
      case 'u128' :
      case 'u136' :
      case 'u144' :
      case 'u152' :
      case 'u160' :
      case 'u168' :
      case 'u176' :
      case 'u184' :
      case 'u192' :
      case 'u200' :
      case 'u208' :
      case 'u216' :
      case 'u224' :
      case 'u232' :
      case 'u240' :
      case 'u248' :
      case 'u256' :
      case 'i8'   :
      case 'i16'  :
      case 'i24'  :
      case 'i32'  :
      case 'i40'  :
      case 'i48'  :
      case 'i56'  :
      case 'i64'  :
      case 'i72'  :
      case 'i80'  :
      case 'i88'  :
      case 'i96'  :
      case 'i104' :
      case 'i112' :
      case 'i120' :
      case 'i128' :
      case 'i136' :
      case 'i144' :
      case 'i152' :
      case 'i160' :
      case 'i168' :
      case 'i176' :
      case 'i184' :
      case 'i192' :
      case 'i200' :
      case 'i208' :
      case 'i216' :
      case 'i224' :
      case 'i232' :
      case 'i240' :
      case 'i248' :
      case 'i256' :
        solVarValue = NumericLiteralValue(initializer.value);
        break
      case 'string'  :
        solVarValue = StringLiteralValue(initializer.value);
        break
      case 'bool' :
        solVarValue = BooleanLiteralValue(initializer.value);
        break
      case 'address':
        solVarValue = AddressLiteralValue(initializer.value);
        break;
      case 'ObjectLiteral'  : console.error('ERROR: Not Implemented');  break
    }

    /*
    switch (varType) {
      case 'CallExpression' :
        solVarValue = CallExpressionValue(initializer);

        if (initializer.callee.type === 'mapping') {
          isMapping = true
        }

        break
    }
    */

    // if (isMapping) {
    //   solVarDeclaration.typeDescriptions = solVarValue.typeDescriptions
    //   solVarDeclaration.typeName = solVarValue.typeName
    // } else {
    //   solVarDeclaration.value = solVarValue
    // }

    solVarDeclaration.value = solVarValue
  }

  return solVarDeclaration
}

module.exports = {
  Sol_StateVariableDeclaration,
}
