const { Token } = require('./Token')

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

  // ------------------------ IDENTIFIER
  [/^[a-zA-Z_]\w*(?:->[\w]+)*/, 'IDENTIFIER'],

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

class Tokenizer {
  init (string) {
    this._string = string
    this._cursor = 0
  }

  hasMoreTokens () {
    return this._cursor < this._string.length
  }

  getNextToken () {
    if (this.hasMoreTokens() === false) { return null }

    const cursorStartPos = this._cursor
    const string = this._string.slice(this._cursor)
    for (const [regexp, tokenType] of Spec) {
      const tokenValue = this._match(regexp, string)

      // could not match this regexp -> continuing to next regexp
      if (tokenValue == null) { continue }

      if (tokenType == null) { // skipping whitespace, comments
        return this.getNextToken()
      }

      return new Token(tokenType, tokenValue, cursorStartPos, this._cursor)
    }

    throw new SyntaxError(`Unexpected token at ${string[0]}`)
  }

  _match (regexp, string) {
    const matched = regexp.exec(string)
    if (matched == null) return null

    this._cursor += matched[0].length
    return matched[0]
  }
}

module.exports = {
  Tokenizer
}
