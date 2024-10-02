const assert = require('assert');
const { Tokenizer } = require('./../src/parser/Tokenizer');  // Adjust the path as needed

function testTokenizer(input, expectedTokens) {
  const tokenizer = new Tokenizer();
  tokenizer.init(input);

  expectedTokens.forEach((expected, index) => {
    const token = tokenizer.getNextToken();
    assert.strictEqual(token.type, expected.type, `Token ${index} type mismatch`);
    assert.strictEqual(token.value, expected.value, `Token ${index} value mismatch`);
  });

  console.log(`Test passed for input: ${input}`);
}

// Test 1
testTokenizer('contract Playground;', [
  { type: 'contract', value: 'contract' },
  { type: 'IDENTIFIER', value: 'Playground' },
  { type: ';', value: ';' }
]);

// Test 2
testTokenizer('def- symbols (^ x: string, ∞ m: address->u256, y: i16): u8 {', [
  { type: 'DEF_PRIVATE', value: 'def-' },
  { type: 'IDENTIFIER', value: 'symbols' },
  { type: '(', value: '(' },
  { type: 'CALLDATA', value: '^' },
  { type: 'IDENTIFIER', value: 'x' },
  { type: ':', value: ':' },
  { type: 'IDENTIFIER', value: 'string' },
  { type: ',', value: ',' },
  { type: 'STORAGE', value: '∞' },
  { type: 'IDENTIFIER', value: 'm' },
  { type: ':', value: ':' },
  { type: 'IDENTIFIER', value: 'address->u256' },
  { type: ',', value: ',' },
  { type: 'IDENTIFIER', value: 'y' },
  { type: ':', value: ':' },
  { type: 'IDENTIFIER', value: 'i16' },
  { type: ')', value: ')' },
  { type: ':', value: ':' },
  { type: 'IDENTIFIER', value: 'u8' },
  { type: '{', value: '{' }
]);

// Test 3: Testing standalone ->
testTokenizer('-> 10;', [
  { type: 'ARROW', value: '->' },
  { type: 'NUMBER', value: '10' },
  { type: ';', value: ';' }
]);

// Test 4: Testing -> in a function with a mapping type
testTokenizer('def payableDef(m: address->u256) { -> 10; }', [
  { type: 'DEF', value: 'def' },
  { type: 'IDENTIFIER', value: 'payableDef' },
  { type: '(', value: '(' },
  { type: 'IDENTIFIER', value: 'm' },
  { type: ':', value: ':' },
  { type: 'IDENTIFIER', value: 'address->u256' },
  { type: ')', value: ')' },
  { type: '{', value: '{' },
  { type: 'ARROW', value: '->' },
  { type: 'NUMBER', value: '10' },
  { type: ';', value: ';' },
  { type: '}', value: '}' }
]);

console.log('All tests passed!');
