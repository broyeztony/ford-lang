const { Parser } = require('./../src/parser/Parser')

test('Variables: integer', () => {

  const input = `
    contract Playground;
    let x: i8 = 255;
  `

  const parser = new Parser()
  const output = parser.parse(input)
  const expected = "{\"type\":\"Contract\",\"name\":\"Playground\",\"nodes\":[{\"type\":\"VariableStatement\",\"stateVariable\":true,\"declarations\":[{\"type\":\"VariableDeclaration\",\"varName\":\"x\",\"varType\":\"i8\",\"genericType\":\"IDENTIFIER\",\"initializer\":{\"type\":\"NumericLiteral\",\"value\":255}}]}]}"

  expect(JSON.stringify(output)).toBe(expected)
})
