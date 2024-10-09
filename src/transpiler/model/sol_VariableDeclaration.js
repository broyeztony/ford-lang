const { GetId} = require("./../utils");
const {StringLiteralTypings} = require("./StringLiteral");
const {BooleanLiteralTypings} = require("./BooleanLiteral");
const {NumericLiteralTypings} = require("./NumericLiteral");
const {AddressLiteralTypings} = require("./AddressLiteral");
const {makeMapping} = require("./HashMaps");

function Sol_VariableDeclaration(node, metadata, isStateVar) {

  const {varName, varType, genericType, initializer} = node

  let solVarDeclaration = {
    constant: false,
    id: GetId(),
    mutability: 'mutable',
    name: varName,
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
      NumericLiteralTypings(solVarDeclaration, varType);
      break
    case 'string'  :
      StringLiteralTypings(solVarDeclaration);
      break
    case 'bool' :
      BooleanLiteralTypings(solVarDeclaration);
      break
    case 'address':
      AddressLiteralTypings(solVarDeclaration)
      break;
    case 'ObjectLiteral'  : console.error('ERROR: Not Implemented');  break
    // case 'CallExpression' : CallExpressionTypings(solVarDeclaration, initializer.callee); break
  }

  switch (genericType) {
    case 'HASHMAP':
      makeMapping(solVarDeclaration, varType)
      break
    case 'LIST':

      break
  }

  return solVarDeclaration
}

module.exports = {
  Sol_VariableDeclaration,
}
