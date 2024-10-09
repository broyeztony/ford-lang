function parseTypeString(typeString) {
  const types = typeString.split('->');
  return types;
}

function buildMappingAST(types, index = 0) {
  if (index >= types.length - 1) {
    return {
      id: Math.random(),
      name: types[index],
      nodeType: "ElementaryTypeName",
      src: "0:0:0",
      typeDescriptions: {
        typeIdentifier: `t_${types[index]}`,
        typeString: types[index]
      }
    };
  }

  return {
    id: Math.random(),
    keyName: "",
    keyNameLocation: "-1:-1:-1",
    keyType: {
      id: Math.random(),
      name: types[index],
      nodeType: "ElementaryTypeName",
      src: "0:0:0",
      typeDescriptions: {
        typeIdentifier: `t_${types[index]}`,
        typeString: types[index]
      }
    },
    nodeType: "Mapping",
    src: "0:0:0",
    typeDescriptions: {
      typeIdentifier: `t_mapping$_t_${types[index]}$_t_${types.slice(index + 1).join('_$_t_')}_$`,
      typeString: `mapping(${types[index]} => ${types.slice(index + 1).join(' => ')})`
    },
    valueName: "",
    valueNameLocation: "-1:-1:-1",
    valueType: buildMappingAST(types, index + 1)
  };
}

function convertFordASTToSolidityAST(fordAST) {
  const declaration = fordAST.declarations[0];
  const types = parseTypeString(declaration.varType);

  return {
    constant: false,
    functionSelector: "", // This would be generated based on the function signature
    id: Math.random(),
    mutability: "mutable",
    name: declaration.varName,
    nameLocation: "0:0:0",
    nodeType: "VariableDeclaration",
    scope: 1,
    src: "0:0:0",
    stateVariable: true,
    storageLocation: "default",
    typeDescriptions: {
      typeIdentifier: `t_mapping$_t_${types.join('_$_t_')}_$`,
      typeString: `mapping(${types.join(' => ')})`
    },
    typeName: buildMappingAST(types),
    visibility: "public"
  };
}

// Example usage
const fordAST1 = {
  type: "VariableStatement",
  stateVariable: true,
  declarations: [
    {
      type: "VariableDeclaration",
      varName: "H",
      varType: "address->u256",
      genericType: "HASHMAP",
      initializer: null
    }
  ]
};

const fordAST2 = {
  type: "VariableStatement",
  stateVariable: true,
  declarations: [
    {
      type: "VariableDeclaration",
      varName: "G",
      varType: "address->address->u256->bool",
      genericType: "HASHMAP",
      initializer: null
    }
  ]
};

console.log(JSON.stringify(convertFordASTToSolidityAST(fordAST1), null, 2));
// console.log(JSON.stringify(convertFordASTToSolidityAST(fordAST2), null, 2));
