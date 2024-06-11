const { GetId} = require("./../utils");
const {FordTypes2SolidityTypes} = require("../utils");
const {Sol_FunctionParameterDeclaration} = require("./sol_FunctionParameterDeclaration");

function Sol_FunctionParameterList(node, metadata) {

  let parameterList = {
    id: GetId(),
    nodeType: 'ParameterList',
    src: source,
  }

  console.log('@Sol_FunctionParameterList', node)

  parameterList.parameters = node.map(p => Sol_FunctionParameterDeclaration(p))

  return parameterList
}

module.exports = {
  Sol_FunctionParameterList,
}
