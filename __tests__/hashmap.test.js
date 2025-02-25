const { Parser } = require('./../src/parser/Parser')

test('Variables: hashmap', () => {

  const input = `
    contract Playground;
    let hashmap : address->u256;
  `

  const parser = new Parser()
  const output = parser.parse(input)

  const expected = "{\"type\":\"Contract\",\"name\":\"Playground\",\"nodes\":[{\"type\":\"VariableStatement\",\"stateVariable\":true,\"declarations\":[{\"type\":\"VariableDeclaration\",\"varName\":\"hashmap\",\"varType\":\"address->u256\",\"genericType\":\"HASHMAP\",\"initializer\":null}]}]}"
  expect(JSON.stringify(output)).toBe(expected)
})
