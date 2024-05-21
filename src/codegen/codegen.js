const { ASTReader, ASTWriter, DefaultASTWriterMapping, LatestCompilerVersion, PrettyFormatter } = require('solc-typed-ast');


class Codegen {

  constructor() {}

  generate(input){
    // Assuming the AST data is sent in the request body
    const reader = new ASTReader();
    const sourceUnits = reader.read(input.data);
    const formatter = new PrettyFormatter(4, 0);
    const writer = new ASTWriter(
      DefaultASTWriterMapping,
      formatter,
      LatestCompilerVersion
    );

    let output = '';
    for (const sourceUnit of sourceUnits) {
      output += "// " + sourceUnit.absolutePath + "\n";
      output += writer.write(sourceUnit) + "\n";
    }

    return output
  }
}

module.exports = {
  Codegen
}
