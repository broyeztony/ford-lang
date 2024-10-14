const {GetId} = require("../utils");


function StringLiteralTypings(solVarDecl) {

  solVarDecl.storageLocation = 'memory'
  solVarDecl.typeDescriptions.typeIdentifier = 't_string_memory_ptr'
  solVarDecl.typeDescriptions.typeString = 'string'
  solVarDecl.typeName.name = 'string'
  solVarDecl.typeName.typeDescriptions.typeIdentifier = 't_string_storage_ptr'
  solVarDecl.typeName.typeDescriptions.typeString = 'string'
}

function StringLiteralValue(value) {

  let buffer = {}

  buffer.id = GetId()
  buffer.hexValue = ''
  buffer.isConstant = false
  buffer.isLValue = false
  buffer.isPure = true
  buffer.lValueRequested = false
  buffer.nodeType = 'Literal'
  buffer.kind = 'string'
  buffer.src = source
  buffer.typeDescriptions = {}
  buffer.typeDescriptions.typeIdentifier = `t_stringliteral`
  buffer.typeDescriptions.typeString = `literal_string "${value}"`
  buffer.value = `${value}`

  return buffer
}

module.exports = {
  StringLiteralTypings,
  StringLiteralValue
};
