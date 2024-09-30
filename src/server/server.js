// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Parser } = require('./../parser/Parser');
const { Transpiler } = require('./../transpiler/Transpiler');
const { Codegen } = require('./../codegen/codegen');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

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

    res.json({ solidity: solidityCode });
  } catch (error) {
    console.error('Transpilation error:', error);
    res.status(500).json({ error: 'Transpilation failed', details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Ford transpiler server running on port ${port}`);
});
