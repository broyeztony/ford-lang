const { Parser } = require('./../src/parser/Parser')

test('Function calls', () => {

  const input = `
    contract Playground;
    def lambda: u16 {
      -> simpleInt();
    }
    
    def simpleInt: u16 {
      -> 2048;
    }
  `

  const parser = new Parser()
  const output = parser.parse(input)
  const expected = "{\"type\":\"Contract\",\"name\":\"Playground\",\"nodes\":[{\"type\":\"FunctionDeclaration\",\"visibility\":\"public\",\"stateMutability\":\"nonpayable\",\"name\":{\"type\":\"Identifier\",\"name\":\"lambda\"},\"body\":{\"type\":\"BlockStatement\",\"body\":[{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"CallExpression\",\"callee\":{\"type\":\"Identifier\",\"name\":\"simpleInt\"},\"arguments\":[]}}]},\"returnType\":{\"name\":\"res\",\"type\":\"u16\",\"genericType\":\"IDENTIFIER\"}},{\"type\":\"FunctionDeclaration\",\"visibility\":\"public\",\"stateMutability\":\"nonpayable\",\"name\":{\"type\":\"Identifier\",\"name\":\"simpleInt\"},\"body\":{\"type\":\"BlockStatement\",\"body\":[{\"type\":\"ReturnStatement\",\"argument\":{\"type\":\"NumericLiteral\",\"value\":2048}}]},\"returnType\":{\"name\":\"res\",\"type\":\"u16\",\"genericType\":\"IDENTIFIER\"}}]}"
  expect(JSON.stringify(output)).toBe(expected)
})
