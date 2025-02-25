const { Parser } = require('./../src/parser/Parser')

test('Iteration', () => {

  const input = `
    contract Playground;
    def lambda {
    for let k: u8 = 0 to 10 {}
  }
  `

  const parser = new Parser()
  const output = parser.parse(input)
  const expected = "{\"type\":\"Contract\",\"name\":\"Playground\",\"nodes\":[{\"type\":\"FunctionDeclaration\",\"visibility\":\"public\",\"stateMutability\":\"nonpayable\",\"name\":{\"type\":\"Identifier\",\"name\":\"lambda\"},\"body\":{\"type\":\"BlockStatement\",\"body\":[{\"type\":\"ForStatement\",\"init\":{\"type\":\"VariableStatement\",\"stateVariable\":false,\"declarations\":[{\"type\":\"VariableDeclaration\",\"varName\":\"k\",\"varType\":\"u8\",\"genericType\":\"IDENTIFIER\",\"initializer\":{\"type\":\"NumericLiteral\",\"value\":0}}]},\"test\":{\"type\":\"NumericLiteral\",\"value\":10},\"body\":{\"type\":\"BlockStatement\",\"body\":[]}}]}}]}"
  expect(JSON.stringify(output)).toBe(expected)
})
