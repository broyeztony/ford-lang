const { Tokenizer } = require('./Tokenizer')

const Log = console.log.bind(global)

class Parser {

  constructor () {
    this._string = ''
    this._tokenizer = new Tokenizer()
    this._isStateVariable = true
  }

  parse (string) {

    this._string = string.trim()
    if(this._string.length > 0) {
      this._tokenizer.init(string)
      this._lookahead = this._tokenizer.getNextToken() // LL(1)

      return this.Contract()
    }
    return null
  }

  Contract() {
    this._eat('contract')
    const contractIdentifier = this.Identifier();
    this._eat(";")

    let nodes;

    try {
      nodes = this.StatementList()
    } catch (error) {
      if (error instanceof RangeError) {
        console.error("Stack overflow detected!");
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }

    return {
      type: 'Contract',
      name: contractIdentifier.name,
      nodes,
    }
  }

  StatementList (stopLookahead = null) {
    const statementList = [this.Statement()]
    while (this._lookahead != null && this._lookahead.type !== stopLookahead) {
      statementList.push(this.Statement())
    }
    return statementList
  }

  FunctionStatementList (stopLookahead = null) {
    const statementList = [this.FunctionStatement()]
    while (this._lookahead != null && this._lookahead.type !== stopLookahead) {
      statementList.push(this.FunctionStatement())
    }
    return statementList
  }

  FunctionStatement () { //

    switch (this._lookahead.type) {
      case ';':
        return this.EmptyStatement()
      case 'if':
        return this.IfStatement()
      case '{':
        return this.BlockStatement()
      case 'let':
        return this.VariableStatement()
      case 'ARROW':
        return this.ReturnStatement();
      case 'for':
        return this.IterationStatement()
      default:
        return this.ExpressionStatement()
    }
  }

  /**
   *  Statement
   *  : ExpressionStatement
   *  | BlockStatement
   *  | EmptyStatement
   *  | VariableStatement
   *  | IfStatement
   *  | IterationStatement
   *  | FunctionStatement
   *  | ReturnStatement
   */
  Statement () { //
    if (this._lookahead == null) {
      throw new Error('Contract can not be empty.')
    }

    switch (this._lookahead.type) {
      case 'let':
        return this.VariableStatement()
      case 'DEF_PRIVATE':
        return this.FunctionDeclaration('private', false);
      case 'DEF_EXTERNAL':
        return this.FunctionDeclaration('external', false);
      case 'DEF_PAYABLE':
        return this.FunctionDeclaration('public', true);
      case 'DEF':
        return this.FunctionDeclaration('public', false);
      default:
        throw new Error(`Invalid token: ${this._lookahead}, expected: one of 'let', 'def'`)
    }
  }

  /**
   * ImportList:
   * StringLiteral
   * | ImportList ',' StringLiteral
   */
  ImportList() {
    const importList = []
    do {
      importList.push(this.StringLiteral())
    } while (this._lookahead.type === ',' && this._eat(','))
    return importList;
  }

  /**
   * FunctionDeclaration:
   * 'def' Identifier BlockStatement
   * ;
   */
  FunctionDeclaration (visibility, isPayable) {
    this._isStateVariable = false

    switch (visibility) {
      case 'public':
        if (isPayable) {
          this._eat('DEF_PAYABLE');
        } else {
          this._eat('DEF');
        }
        break
      case 'private':
        this._eat('DEF_PRIVATE');
        break
      case 'external':
        this._eat('DEF_EXTERNAL');
        break
    }

    const name = this.Identifier()

    let params
    if (this._lookahead.type === '(') {
      this._eat('(');
      params = this._lookahead.type !== ')' ? this.FormalParameterList() : [];
      this._eat(')');
    }

    // handle return type
    let returnType
    if (this._lookahead.type === ':') {
      this._eat(':');
      returnType = this.Identifier()
    }

    const body = this.BlockStatement();
    const buffer =  {
      type: 'FunctionDeclaration',
      visibility,
      stateMutability: isPayable ? 'payable' : 'nonpayable',
      name,
      body
    }

    if (params) {
      buffer.params = params
    }

    if (returnType) {
      buffer.returnType = returnType
    }

    this._isStateVariable = true
    return buffer;
  }

  DataLocation() {
    let dataLocation = 'default'
    if (this._lookahead.type === 'CALLDATA') {
      dataLocation = 'calldata'
      this._eat('CALLDATA');
    }
    if (this._lookahead.type === 'STORAGE') {
      dataLocation = 'storage'
      this._eat('STORAGE');
    }
    return dataLocation
  }

  /**
   * FormalParameterList:
   * Identifier
   * | FormalParameterList ',' Identifier
   */
  FormalParameterList() {
    const params = []
    do {
      // optional data location modifier (`storage`, `calldata` or `memory` as the default)
      const dataLocation = this.DataLocation()

      const paramName = this.Identifier()
      this._eat(':');
      const paramType = this.Identifier()

      params.push({
        name: paramName,
        type: paramType,
        dataLocation
      })

    } while (this._lookahead.type === ',' && this._eat(','))
    return params;
  }

  /**
   * ReturnStatement:
   * 'return' OptExpression
   */
  ReturnStatement () {
    this._eat('ARROW');
    const argument = this._lookahead.type !== ';' ? this.Expression() : null;
    this._eat(';');
    return {
      type: 'ReturnStatement',
      argument
    }
  }

  /**
   * IterationStatement
   * : WhileStatement
   * | DoWhileStatement
   * | ForStatement
   * ;
   */
  IterationStatement () {
    switch(this._lookahead.type) {
      case 'for':
        return this.ForStatement();
    }
  }

  /**
   * ForStatement
   * : 'for' OptStatementInit 'to' OptExpression Statement
   * ;
   */
  ForStatement(){
    this._eat('for')

    const init = this.ForStatementInit()
    this._eat('to')
    const test = this.Expression()
    const body = this.FunctionStatement()

    return {
      type: 'ForStatement',
      init,
      test,
      body,
    }
  }

  ForStatementInit() {
    if(this._lookahead.type === 'let') {
      return this.VariableStatementInit()
    }
    throw new SyntaxError('Invalid initializer for iteration construct.')
    // return this.Expression()
  }

  /**
   * 'if' expression Statement
   * 'if' expression Statement 'else' Statement
   */
  IfStatement () {
    this._eat('if')
    const test = this.Expression()

    const consequent = this.BlockStatement()
    const alternate = this._lookahead != null && this._lookahead.type === 'else'
      ? this._eat('else') && this.BlockStatement()
      : null

    return {
      type: 'IfStatement',
      test,
      consequent,
      alternate
    }
  }

  /**
   * VariableStatementInit
   * : 'let' VariableDeclarationList
   * ;
   */
  VariableStatementInit () {
    this._eat('let')
    const declarations = this.VariableDeclarationList();

    return {
      type: 'VariableStatement',
      stateVariable: this._isStateVariable,
      declarations
    }
  }

  VariableStatement () { // 'let' VariableDeclarationList ';'
    const variableStatement = this.VariableStatementInit()
    this._eat(';')
    return variableStatement
  }

  /**
   *  VariableDeclaration | VariableDeclarationList
   */
  VariableDeclarationList () {
    const declarations = []
    do {
      declarations.push(this.VariableDeclaration())
    } while (this._lookahead.type === ',' && this._eat(','))
    return declarations
  }

  VariableDeclaration () {
    const id = this.Identifier()
    const initializer = this._lookahead.type !== ';' && this._lookahead.type !== ','
      ? this.VariableInitializer()
      : null

    const errorHandler = this.ErrorHandler();

    const buffer = {
      type: 'VariableDeclaration',
      id,
      initializer,
    }

    if (errorHandler) {
      buffer.errorHandler = errorHandler
    }

    return buffer
  }

  VariableInitializer () { // ... = AssignmentExpression
    this._eat('SIMPLE_ASSIGN')
    return this.AssignmentExpression()
  }

  BlockStatement () { // { OptStatementList }
    this._eat('{')
    const body = this._lookahead.type === '}' ? [] : this.FunctionStatementList('}')
    this._eat('}')
    return {
      type: 'BlockStatement',
      body
    }
  }

  EmptyStatement () {
    this._eat(';')
    return {
      type: 'EmptyStatement'
    }
  }

  ExpressionStatement () {
    const expression = this.Expression()
    let errorHandler = this.ErrorHandler()
    this._eat(';')

    const buffer = {
      type: 'ExpressionStatement',
      expression,
    }

    if (errorHandler) {
      buffer.errorHandler = errorHandler
    }

    return buffer
  }

  ErrorHandler () {
    if (this._lookahead.type === 'ERROR_HANDLER_OPERATOR') {
      this._eat('ERROR_HANDLER_OPERATOR')
      const handler = this.BlockStatement()

      return handler
    }

    return null;
  }

  Expression () {
    return this.AssignmentExpression()
  }

  /**
   * AssignmentExpression
   *  : LogicalORExpression
   *  | LHS '=' AssignmentExpression
   * @returns {{type: string, operator, left, right}}
   * @constructor
   */
  AssignmentExpression () {

    const left = this.LogicalORExpression()
    if (!this._isAssignmentOperator(this._lookahead.type)) {
      return left
    }

    return {
      type: 'AssignmentExpression',
      operator: this.AssignmentOperator().value,
      left: this._checkValidAssignmentTarget(left),
      right: this.AssignmentExpression()
    }
  }

  /**
   * RELATIONAL_OPERATOR >, <, >=, <=
   */
  RelationalExpression () {
    return this._BinaryExpression('AdditiveExpression', 'RELATIONAL_OPERATOR')
  }

  /**
   * LeftHandSideExpression
   *  : MemberExpression
   *  ;
   */
  LeftHandSideExpression () {
    return this.CallMemberExpression()
  }

  /**
   * CallMemberExpression
   *  : MemberExpression
   *  | CallExpression
   *  ;
   */
  CallMemberExpression () {
    const member = this.MemberExpression();

    if (this._lookahead.type === '(') {
      return this._CallExpression(member)
    }

    return member;
  }

  /**
   * CallExpression
   *  : Callee Arguments
   *  ;
   * Callee
   *  : MemberExpression
   *  | CallExpression
   *  ;
   */
  _CallExpression (callee) {
    let callExpression = {
      type: 'CallExpression',
      callee,
      arguments: this.Arguments()
    }

    if (this._lookahead.type === '(') {
      callExpression = this._CallExpression(callExpression)
    }

    return callExpression
  }

  /**
   * Arguments
   *  : '(' OptArgumentList ')'
   *  ;
   */
  Arguments () {
    this._eat('(');

    const argumentsList = this._lookahead.type !== ')' ? this.ArgumentList() : [];
    this._eat(')');

    return argumentsList
  }

  /**
   * ArgumentList
   *  : AssignmentExpression
   *  | ArgumentList ',' AssignmentExpression
   *  ;
   */
  ArgumentList () {
    const argumentList = [];

    do {
      argumentList.push(this.AssignmentExpression())
    } while (this._lookahead.type === ',' && this._eat(','))

    return argumentList;
  }

  /**
   * MemberExpression
   *  : PrimaryExpression
   *  | MemberExpression '.' Identifier
   *  | MemberExpression '[' Expression ']'
   *  ;
   */
  MemberExpression () {
    let object = this.PrimaryExpression()

    while (this._lookahead.type === '.' || this._lookahead.type === '[') {

      if (this._lookahead.type === '.') {
        this._eat('.')
        const property = this.Identifier();
        object = {
          type: 'MemberExpression',
          computed: false,
          object,
          property
        }
      }

      if (this._lookahead.type === '[') {
        this._eat('[')
        const property = this.Expression();
        this._eat(']')
        object = {
          type: 'MemberExpression',
          computed: true,
          object,
          property
        }
      }
    }

    return object
  }

  Identifier () {
    const name = this._eat('IDENTIFIER').value
    return {
      type: 'Identifier',
      name
    }
  }

  _checkValidAssignmentTarget (node) {
    if (node.type === 'Identifier' || node.type === 'MemberExpression') {
      return node
    }
    throw new SyntaxError('Invalid left-hand side in assignment expression')
  }

  _isAssignmentOperator (tokenType) {
    return tokenType === 'SIMPLE_ASSIGN' || tokenType === 'COMPLEX_ASSIGN'
  }

  AssignmentOperator () {
    if (this._lookahead.type === 'SIMPLE_ASSIGN') {
      return this._eat('SIMPLE_ASSIGN')
    }
    return this._eat('COMPLEX_ASSIGN')
  }

  LogicalORExpression() {
    return this._logicalExpression('LogicalANDExpression', 'LOGICAL_OR')
  }

  LogicalANDExpression() {
    return this._logicalExpression('EqualityExpression', 'LOGICAL_AND')
  }

  EqualityExpression () {
    return this._BinaryExpression('RelationalExpression', 'EQUALITY_OPERATOR')
  }

  _logicalExpression (builderName, operatorToken) {
    let left = this[builderName]()
    while (this._lookahead.type === operatorToken) {
      const operator = this._eat(operatorToken).value
      const right = this[builderName]()
      left = {
        type: 'LogicalExpression',
        operator,
        left,
        right
      }
    }
    return left
  }

  _BinaryExpression (builderName, operatorToken) {
    let left = this[builderName]()
    while (this._lookahead.type === operatorToken) {
      const operator = this._eat(operatorToken).value
      const right = this[builderName]()
      left = {
        type: 'BinaryExpression',
        operator,
        left,
        right
      }
    }
    return left
  }

  /**
   * AdditiveExpression
   *  : MultiplicativeExpression
   *  | AdditiveExpression ADDITIVE_OP MultiplicativeExpression -> MultiplicativeExpression ADDITIVE_OP MultiplicativeExpression ADDITIVE_OP MultiplicativeExpression ...(expanded)
   */
  AdditiveExpression () {
    return this._BinaryExpression('MultiplicativeExpression', 'ADDITIVE_OPERATOR')
  }

  MultiplicativeExpression () {
    return this._BinaryExpression('UnaryExpression', 'MULTIPLICATIVE_OPERATOR')
  }

  /**
   * UnaryExpression
   *  : LeftHandSideExpression
   *  | ADDITIVE_OPERATOR UnaryExpression
   *  | LOGICAL_NOT UnaryExpression
   *  ;
   */
  UnaryExpression () {
    let operator;
    switch (this._lookahead.type) {
      case 'ADDITIVE_OPERATOR':
        operator = this._eat('ADDITIVE_OPERATOR').value
        break;
      case 'LOGICAL_NOT':
        operator = this._eat('LOGICAL_NOT').value
        break;
    }
    if(operator != null) {
      return {
        type: 'UnaryExpression',
        operator,
        argument: this.UnaryExpression()
      }
    }
    return this.LeftHandSideExpression()
  }

  /***
   * PrimaryExpression
   * : Literal
   * | ParenthesizedExpression
   * | Identifier
   */
  PrimaryExpression () {

    if (this._isLiteral(this._lookahead.type)) {
      return this.Literal()
    }
    switch (this._lookahead.type) {
      case '(':
        return this.ParenthesizedExpression()
      case 'IDENTIFIER':
        return this.Identifier()
      default:
        return this.LeftHandSideExpression()
    }
  }

  _isLiteral (tokenType) {
    return (
      tokenType === 'NUMBER' || tokenType === 'STRING' || tokenType === 'true' || tokenType === 'false' || tokenType === 'null' || tokenType == '{'
    )
  }

  /**
   *  ParenthesizedExpression
   *    : ( Expression )
   *    ;
   */
  ParenthesizedExpression () {
    this._eat('(')
    const expression = this.Expression()
    this._eat(')')
    return expression
  }

  Literal () { // NumericLiteral | StringLiteral | Identifier | BooleanLiteral | NullLiteral | ObjectLiteral
    switch (this._lookahead.type) {
      case 'NUMBER':
        return this.NumericLiteral()
      case 'STRING':
        return this.StringLiteral()
      // case 'IDENTIFIER':
      // return this.Identifier()
      case 'true':
        return this.BooleanLiteral(true)
      case 'false':
        return this.BooleanLiteral(false)
      case 'null':
        return this.NullLiteral(false)
      case '{':
        return this.ObjectLiteral()
    }
    throw new SyntaxError('Literal: unexpected literal production')
  }

  BooleanLiteral (value) {
    this._eat(value ? 'true' : 'false')
    return {
      type: 'BooleanLiteral',
      value
    }
  }

  NullLiteral (value) {
    this._eat('null')
    return {
      type: 'NullLiteral',
      value: null
    }
  }

  NumericLiteral () {
    const token = this._eat('NUMBER')
    return {
      type: 'NumericLiteral',
      value: Number(token.value)
    }
  }

  StringLiteral () {
    const token = this._eat('STRING')
    return {
      type: 'StringLiteral',
      value: token.value.slice(1, -1)
    }
  }

  ObjectLiteral () {
    const token = this._eat('{')
    const values = []
    while (this._lookahead != null && this._lookahead.type !== '}') {
      values.push(this.KeyValuePair())
    }
    this._eat('}')

    return {
      type: 'ObjectLiteral',
      values
    }
  }

  /**
   * IDENTIFIER (':' Literal)
   */
  KeyValuePair () {
    const name = this.Identifier().name

    if (this._lookahead.type !== ':') { // handle shorthand notation. i.e. ```let x = { a };```

      const value = {
        type: 'Identifier',
        name
      }

      if (this._lookahead.type === ',') {
        this._eat(',')
      }

      return { name, value }
    }

    this._eat(':')
    const value = this.MemberExpression()
    if (this._lookahead.type === ',') {
      this._eat(',')
    }

    return { name, value }
  }

  _eat (tokenType) {
    const token = this._lookahead
    if (token == null) {
      throw new SyntaxError(`Unexpected end of input, expected: "${tokenType}"`)
    }
    if (token.type !== tokenType) {
      throw new SyntaxError(`Unexpected token "${token.value}", expected: "${tokenType}"`)
    }

    this._lookahead = this._tokenizer.getNextToken()
    return token
  }
}

module.exports = {
  Parser
}
