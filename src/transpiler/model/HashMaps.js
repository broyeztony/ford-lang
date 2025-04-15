const {GetId, solidityTypeIdentifier, solidityTypeString} = require("../utils");

function buildMappingAST(mappingTypes, level = 0) {

  if (level >= mappingTypes.length - 1) {
    return {
      id: GetId(),
      name: solidityTypeString(mappingTypes[level]),
      nodeType: "ElementaryTypeName",
      src: "0:0:0",
      typeDescriptions: {
        typeIdentifier: solidityTypeIdentifier(mappingTypes[level]),
        typeString: solidityTypeString(mappingTypes[level])
      }
    }
  }

  return {
    id: GetId(),
    keyName: "",
    keyNameLocation: "-1:-1:-1",
    keyType: {
      id: GetId(),
      name: solidityTypeString(mappingTypes[level]),
      nodeType: "ElementaryTypeName",
      src: "0:0:0",
      typeDescriptions: {
        typeIdentifier: solidityTypeIdentifier(mappingTypes[level]),
        typeString: solidityTypeString(mappingTypes[level])
      }
    },
    nodeType: "Mapping",
    src: "0:0:0",
    typeDescriptions: {
      typeIdentifier: `t_mapping$_${ solidityTypeIdentifier(mappingTypes[level]) }$_${ mappingTypes.map(_ => solidityTypeIdentifier(_)).slice(level + 1).join('_$_t_') }_$`,
      typeString: `mapping(${ solidityTypeString(mappingTypes[level]) } => ${mappingTypes.map(_ => solidityTypeString(_)).slice(level + 1).join(' => ')})`
    },
    valueName: "",
    valueNameLocation: "-1:-1:-1",
    valueType: buildMappingAST(mappingTypes, level + 1)
  }
}

function makeMapping(solVarDeclaration, varType) {

  // `address->u8` => ['address', 'u8']
  const types = varType.split('->');

  solVarDeclaration.typeDescriptions.typeIdentifier = `t_mapping$_${types.map(_ => solidityTypeIdentifier(_)).join('_$_')}_$`
  solVarDeclaration.typeDescriptions.typeString = `mapping(${types.map(_ => solidityTypeString(_)).join(' => ')})`
  solVarDeclaration.typeName = buildMappingAST(types)
}

module.exports = {
  buildMappingAST,
  makeMapping
}
