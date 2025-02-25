const { Parser } = require('./../src/parser/Parser')

test('Functions', () => {

  const input = `
    contract Playground;
    def lambda {}
  `

  const parser = new Parser()
  const output = parser.parse(input)
  const expected = "{\"type\":\"Contract\",\"name\":\"Playground\",\"nodes\":[{\"type\":\"FunctionDeclaration\",\"visibility\":\"public\",\"stateMutability\":\"nonpayable\",\"name\":{\"type\":\"Identifier\",\"name\":\"lambda\"},\"body\":{\"type\":\"BlockStatement\",\"body\":[]}}]}"

  expect(JSON.stringify(output)).toBe(expected)
})
