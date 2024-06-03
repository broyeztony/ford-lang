const {GetId} = require("./utils");


function VariableBase (variableName, stateVariable, visibility) {
  return {
    constant: false,
    id: GetId(),
    mutability: 'mutable',
    name: variableName,
    nameLocation: source,
    nodeType: 'VariableDeclaration',
    scope: currentScope++,
    src: source,
    stateVariable,
    storageLocation: 'default',
    typeDescriptions: {
      typeIdentifier: undefined, // resolved below
      typeString: undefined // resolved below
    },
    typeName: {
      id: GetId(),
      name: undefined, // resolved below
      nodeType: 'ElementaryTypeName',
      src: source,
      typeDescriptions: {
        typeIdentifier: undefined, // resolved below
        typeString: undefined // resolved below
      }
    },
    visibility
  }
}

function VariableValue() {
  return {
    hexValue: '',
    id: GetId(),
    isConstant: false,
    isLValue: false,
    isPure: true,
    kind: undefined, // resolved below
    lValueRequested: false,
    nodeType: undefined,
    src: source,
    typeDescriptions: {
      typeIdentifier: undefined, // resolved below
      typeString: undefined, // resolved below
    },
    value: undefined // resolved below
  }
}


module.exports = {
  VariableBase,
  VariableValue
};
