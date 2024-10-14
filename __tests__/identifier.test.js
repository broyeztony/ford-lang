const {Token} = require("../src/parser/Token");

const Spec = [

  [/^\s+/, null], // whitespace
  [/^\/\/.*/, null], // comments
  [/^\/\*[\s\S]*?\*\//, null], // comments

  [/^;/, ';'], // delimiters
  [/^:/, ':'], // colon
  [/^\{/, '{'],
  [/^\}/, '}'],
  [/^\(/, '('],
  [/^\)/, ')'],
  [/^,/, ','], // comma
  [/^\./, '.'], // dot
  [/^\[/, '['], // opening square bracket
  [/^\]/, ']'], // closing square bracket

  // ------------------------ KEYWORDS
  [/^\blet\b/, 'let'],
  [/^\bif\b/, 'if'],
  [/^\belse\b/, 'else'],
  [/^\btrue\b/, 'true'],
  [/^\bfalse\b/, 'false'],
  [/^\bnull\b/, 'null'],
  [/^\bfor\b/, 'for'],
  [/^\bto\b/, 'to'],

  [/^\bdef\$(?!\w)/, 'DEF_PAYABLE'],
  [/^\bdef\/(?!\w)/, 'DEF_EXTERNAL'],
  [/^\bdef\-(?!\w)/, 'DEF_PRIVATE'],
  [/^\bdef\b/, 'DEF'],

  [/^\bcontract\b/, 'contract'],

  // ------------------------ NUMBERS
  [/^\d+/, 'NUMBER'],

  // ------------------------ RETURN SYMBOL
  [/^->/, 'ARROW'],

  // ------------------------ IDENTIFIER and TYPES
  // [/^list\[(?:i32|string|u8|u16|u32|u64|address)\]/, 'LIST'],
  [/^list\[(?:i8|i16|i24|i32|i40|i48|i56|i64|i72|i80|i88|i96|i104|i112|i120|i128|i136|i144|i152|i160|i168|i176|i184|i192|i200|i208|i216|i224|i232|i240|i248|i256|u8|u16|u24|u32|u40|u48|u56|u64|u72|u80|u88|u96|u104|u112|u120|u128|u136|u144|u152|u160|u168|u176|u184|u192|u200|u208|u216|u224|u232|u240|u248|u256|bool|string|address)\]/, 'LIST'],
  [/^[a-zA-Z_]\w*(?:->\w+)+/, 'HASHMAP'],
  [/^[a-zA-Z_]\w*/, 'IDENTIFIER'],

  // ------------------------ DATA LOCATION MODIFIERS
  [/^\^/, 'CALLDATA'],
  [/^∞/, 'STORAGE'],

  // ------------------------ Equality
  [/^[=!]=/, 'EQUALITY_OPERATOR'],

  // ------------------------ Error Handler
  [/^->/, 'ERROR_HANDLER_OPERATOR'],

  // ------------------------ Assignments
  [/^=/, 'SIMPLE_ASSIGN'],
  [/^[\*\/\+\-]=/, 'COMPLEX_ASSIGN'],

  [/^[+\-]/, 'ADDITIVE_OPERATOR'],
  [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],
  [/^[><]=?/, 'RELATIONAL_OPERATOR'],

  // ------------------------ logical operators: &&, ||, !
  [/^&&/, 'LOGICAL_AND'],
  [/^\|\|/, 'LOGICAL_OR'],
  [/^!/, 'LOGICAL_NOT'],

  [/^"[^"]*"/, 'STRING'],
  [/^'[^']*'/, 'STRING']
]

let _string = `
let mm: address->u256;
let ss: string = "hello";
let li: list[address];
`
let _cursor = 0

const hasMoreTokens = () => {
  return _cursor < _string.length
}

const getNextToken = () => {
  if (hasMoreTokens() === false) { return null }

  const cursorStartPos = _cursor
  const string = _string.slice(_cursor)
  for (const [regexp, tokenType] of Spec) {
    const tokenValue = _match(regexp, string)

    // could not match this regexp -> continuing to next regexp
    if (tokenValue == null) { continue }

    if (tokenType == null) { // skipping whitespace, comments
      return getNextToken()
    }

    return new Token(tokenType, tokenValue, cursorStartPos, _cursor)
  }

  throw new SyntaxError(`Unexpected token at ${string[0]}`)
}

const _match = (regexp, string) => {
  const matched = regexp.exec(string)
  if (matched == null) return null

  _cursor += matched[0].length
  return matched[0]
}

let token
do {
  token = getNextToken()
  console.log(token);
} while(token !== null)



