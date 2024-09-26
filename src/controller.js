const { Parser } = require('./parser/Parser')
const { Transpiler } = require('./transpiler/Transpiler')
const {Codegen} = require("./codegen/codegen");
const fs = require('fs')
const YAML= require('yaml')

const Controller = (programFile, specFile) => {
  const f = fs.readFileSync(programFile).toString()
  const parser = new Parser()
  const inputAst = parser.parse(f);
  // console.log(JSON.stringify(inputAst, null, 2))

  // metadata
  const y = fs.readFileSync(specFile, 'utf8').toString()
  const metadata = YAML.parse(y)

  const transpiler = new Transpiler(inputAst, metadata)
  const outputAst = transpiler.transpile()
  // console.log(JSON.stringify(outputAst, null, 2))

  const codegen = new Codegen()
  const solidityCode = codegen.generate(outputAst)
  console.log(solidityCode)

}

Controller(process.argv[2], process.argv[3])
