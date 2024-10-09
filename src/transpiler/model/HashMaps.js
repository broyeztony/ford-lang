const {GetId, solitidityTypeIdentifier, solitidityTypeString} = require("../utils");

function buildMappingAST(mappingTypes, level = 0) {

  if (level >= mappingTypes.length - 1) {
    return {
      id: GetId(),
      name: solitidityTypeString(mappingTypes[level]),
      nodeType: "ElementaryTypeName",
      src: "0:0:0",
      typeDescriptions: {
        typeIdentifier: solitidityTypeIdentifier(mappingTypes[level]),
        typeString: solitidityTypeString(mappingTypes[level])
      }
    };
  }

  return {
    id: GetId(),
    keyName: "",
    keyNameLocation: "-1:-1:-1",
    keyType: {
      id: GetId(),
      name: solitidityTypeString(mappingTypes[level]),
      nodeType: "ElementaryTypeName",
      src: "0:0:0",
      typeDescriptions: {
        typeIdentifier: solitidityTypeIdentifier(mappingTypes[level]),
        typeString: solitidityTypeString(mappingTypes[level])
      }
    },
    nodeType: "Mapping",
    src: "0:0:0",
    typeDescriptions: {
      typeIdentifier: `t_mapping$_${ solitidityTypeIdentifier(mappingTypes[level]) }$_${ mappingTypes.map(_ => solitidityTypeIdentifier(_)).slice(level + 1).join('_$_t_') }_$`,
      typeString: `mapping(${ solitidityTypeString(mappingTypes[level]) } => ${mappingTypes.map(_ => solitidityTypeString(_)).slice(level + 1).join(' => ')})`
    },
    valueName: "",
    valueNameLocation: "-1:-1:-1",
    valueType: buildMappingAST(mappingTypes, level + 1)
  }
}

function makeMapping(solVarDeclaration, varType) {

  // `address->u8` => ['address', 'u8']
  const types = varType.split('->');

  solVarDeclaration.typeDescriptions.typeIdentifier = `t_mapping$_${types.map(_ => solitidityTypeIdentifier(_)).join('_$_')}_$`
  solVarDeclaration.typeDescriptions.typeString = `mapping(${types.map(_ => solitidityTypeString(_)).join(' => ')})`
  solVarDeclaration.typeName = buildMappingAST(types)
  console.log('@solVarDeclaration', solVarDeclaration)
}

module.exports = {
  buildMappingAST,
  makeMapping
}
