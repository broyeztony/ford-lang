const { Parser } = require('./../src/parser/Parser')

test('If', () => {

  const input = `
    contract Playground;
    def lambda {
      if (2 > 1) {
      } 
  }
  `

  const parser = new Parser()
  const output = parser.parse(input)
  const expected = "{\"type\":\"Contract\",\"name\":\"Playground\",\"nodes\":[{\"type\":\"FunctionDeclaration\",\"visibility\":\"public\",\"stateMutability\":\"nonpayable\",\"name\":{\"type\":\"Identifier\",\"name\":\"lambda\"},\"body\":{\"type\":\"BlockStatement\",\"body\":[{\"type\":\"IfStatement\",\"test\":{\"type\":\"BinaryExpression\",\"operator\":\">\",\"left\":{\"type\":\"NumericLiteral\",\"value\":2},\"right\":{\"type\":\"NumericLiteral\",\"value\":1}},\"consequent\":{\"type\":\"BlockStatement\",\"body\":[]},\"alternate\":null}]}}]}"
  expect(JSON.stringify(output)).toBe(expected)
})
