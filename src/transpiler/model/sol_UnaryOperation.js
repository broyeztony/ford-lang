const {GetId} = require("../utils");

function SolUnaryOperation(node) {

  return {
    hexValue: '',
    id: GetId(),
    isConstant: false,
    isLValue: false,
    isPure: true,
    kind: "number",
    lValueRequested: false,
    nodeType: "Literal",
    src: source,
    typeDescriptions: {
      typeIdentifier: `t_rational_${node.argument.value}_by_1`,
      typeString: `int_const ${node.argument.value}`,
    },
    value: `${node.argument.value}`
  }
}

module.exports = {
  SolUnaryOperation
}
