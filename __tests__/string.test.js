const { Parser } = require('./../src/parser/Parser')

test('Variables: string', () => {

  const input = `
    contract Playground;
    let s : string = "Hello F0/rd!";
  `

  const parser = new Parser()
  const output = parser.parse(input)

  const expected = "{\"type\":\"Contract\",\"name\":\"Playground\",\"nodes\":[{\"type\":\"VariableStatement\",\"stateVariable\":true,\"declarations\":[{\"type\":\"VariableDeclaration\",\"varName\":\"s\",\"varType\":\"string\",\"genericType\":\"IDENTIFIER\",\"initializer\":{\"type\":\"StringLiteral\",\"value\":\"Hello F0/rd!\"}}]}]}"

  expect(JSON.stringify(output)).toBe(expected)
})
