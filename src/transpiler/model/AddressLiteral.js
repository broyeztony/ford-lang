const {GetId} = require("../utils");


function AddressLiteralTypings(solVarDecl) {

  solVarDecl.typeDescriptions.typeIdentifier = 't_address'
  solVarDecl.typeDescriptions.typeString = 'address'
  solVarDecl.typeName.name = 'address'
  solVarDecl.typeName.typeDescriptions.typeIdentifier = 't_address'
  solVarDecl.typeName.typeDescriptions.typeString = 'address'
}

function AddressLiteralValue(value) {

  let buffer = {}
  buffer.id = GetId()
  buffer.hexValue = ''
  buffer.isConstant = false
  buffer.isLValue = false
  buffer.isPure = true
  buffer.lValueRequested = false
  buffer.nodeType = 'Literal'
  buffer.src = source
  buffer.kind = 'number'
  buffer.typeDescriptions = {}
  buffer.typeDescriptions.typeIdentifier = `t_address`
  buffer.typeDescriptions.typeString = `address`
  buffer.value = value;
  return buffer
}

module.exports = {
  AddressLiteralTypings,
  AddressLiteralValue
}
