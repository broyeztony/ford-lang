const { Parser } = require('./parser/Parser')
const { Transpiler } = require('./transpiler/Transpiler')
const fs = require('fs')


const Controller = (programFile) => {
  const f = fs.readFileSync(programFile).toString()
  const parser = new Parser()
  const ast = parser.parse(f);
  console.log(JSON.stringify(ast, null, 2))

  const transpiler = new Transpiler(ast)
  const output = transpiler.transpile()
  console.log(JSON.stringify(output, null, 2))
}

Controller(process.argv[2])
