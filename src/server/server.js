// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Parser } = require('./../parser/Parser');
const { Transpiler } = require('./../transpiler/Transpiler');
const { Codegen } = require('./../codegen/codegen');
const solc = require('solc');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Transpile endpoint
app.post('/transpile', (req, res) => {
  try {
    const fordCode = req.body.code;
    if (!fordCode) {
      return res.status(400).json({ error: 'No Ford code provided' });
    }

    const parser = new Parser();
    const inputAst = parser.parse(fordCode);

    const transpiler = new Transpiler(inputAst, {});
    const outputAst = transpiler.transpile();

    const codegen = new Codegen();
    const solidityCode = codegen.generate(outputAst);
    console.log(solidityCode)

    // binary
    const input = {
      language: 'Solidity',
      sources: {
        'playground.sol': {
          content: solidityCode
        }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['*']
          }
        }
      }
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    // `output` here contains the JSON output as specified in the documentation
    let binary = ''
    for (var contractName in output.contracts['playground.sol']) {
      // console.log(
      //   contractName +
      //   ': ' +
      //   output.contracts['playground.sol'][contractName].evm.bytecode.object
      // );
      binary = output.contracts['playground.sol'][contractName].evm.bytecode.object
    }
    //
    // console.log(solidityCode)

    res.json({ solidity: solidityCode, binary });
  } catch (error) {
    console.error('Transpilation error:', error);
    res.status(500).json({ error: 'Transpilation failed', details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Ford transpiler server running on port ${port}`);
});
