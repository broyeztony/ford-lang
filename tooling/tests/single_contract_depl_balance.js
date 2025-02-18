import axios from 'axios';

/**
 * // SPDX-License-Identifier: MIT
 * pragma solidity ^0.8.20;
 *
 * import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
 *
 * contract TonyToken is ERC20 {
 *     constructor() ERC20("TonyToken", "TNT") {
 *         _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
 *     }
 * }
 */
const contractOwnerAddr = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
const targetContractAddr = "0x7f1bd6b8d3563ab32d7e83a15f351caddb3d1f5d" // target address is based on the contract's creator address, hence predictable
const contractCreationBytecode = '0x608060405234801561000f575f80fd5b506040518060400160405280600981526020017f546f6e79546f6b656e00000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f544e540000000000000000000000000000000000000000000000000000000000815250816003908161008b91906105bd565b50806004908161009b91906105bd565b5050506100d8336100b06100dd60201b60201c565b60ff16600a6100bf91906107e8565b620f42406100cd9190610832565b6100e560201b60201c565b61095b565b5f6012905090565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610155575f6040517fec442f0500000000000000000000000000000000000000000000000000000000815260040161014c91906108b2565b60405180910390fd5b6101665f838361016a60201b60201c565b5050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036101ba578060025f8282546101ae91906108cb565b92505081905550610288565b5f805f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905081811015610243578381836040517fe450d38c00000000000000000000000000000000000000000000000000000000815260040161023a9392919061090d565b60405180910390fd5b8181035f808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036102cf578060025f8282540392505081905550610319565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516103769190610942565b60405180910390a3505050565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806103fe57607f821691505b602082108103610411576104106103ba565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026104737fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610438565b61047d8683610438565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f6104c16104bc6104b784610495565b61049e565b610495565b9050919050565b5f819050919050565b6104da836104a7565b6104ee6104e6826104c8565b848454610444565b825550505050565b5f90565b6105026104f6565b61050d8184846104d1565b505050565b5b81811015610530576105255f826104fa565b600181019050610513565b5050565b601f8211156105755761054681610417565b61054f84610429565b8101602085101561055e578190505b61057261056a85610429565b830182610512565b50505b505050565b5f82821c905092915050565b5f6105955f198460080261057a565b1980831691505092915050565b5f6105ad8383610586565b9150826002028217905092915050565b6105c682610383565b67ffffffffffffffff8111156105df576105de61038d565b5b6105e982546103e7565b6105f4828285610534565b5f60209050601f831160018114610625575f8415610613578287015190505b61061d85826105a2565b865550610684565b601f19841661063386610417565b5f5b8281101561065a57848901518255600182019150602085019450602081019050610635565b868310156106775784890151610673601f891682610586565b8355505b6001600288020188555050505b505050505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f8160011c9050919050565b5f808291508390505b600185111561070e578086048111156106ea576106e961068c565b5b60018516156106f95780820291505b8081029050610707856106b9565b94506106ce565b94509492505050565b5f8261072657600190506107e1565b81610733575f90506107e1565b8160018114610749576002811461075357610782565b60019150506107e1565b60ff8411156107655761076461068c565b5b8360020a91508482111561077c5761077b61068c565b5b506107e1565b5060208310610133831016604e8410600b84101617156107b75782820a9050838111156107b2576107b161068c565b5b6107e1565b6107c484848460016106c5565b925090508184048111156107db576107da61068c565b5b81810290505b9392505050565b5f6107f282610495565b91506107fd83610495565b925061082a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484610717565b905092915050565b5f61083c82610495565b915061084783610495565b925082820261085581610495565b9150828204841483151761086c5761086b61068c565b5b5092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61089c82610873565b9050919050565b6108ac81610892565b82525050565b5f6020820190506108c55f8301846108a3565b92915050565b5f6108d582610495565b91506108e083610495565b92508282019050808211156108f8576108f761068c565b5b92915050565b61090781610495565b82525050565b5f6060820190506109205f8301866108a3565b61092d60208301856108fe565b61093a60408301846108fe565b949350505050565b5f6020820190506109555f8301846108fe565b92915050565b610de2806109685f395ff3fe608060405234801561000f575f80fd5b5060043610610091575f3560e01c8063313ce56711610064578063313ce5671461013157806370a082311461014f57806395d89b411461017f578063a9059cbb1461019d578063dd62ed3e146101cd57610091565b806306fdde0314610095578063095ea7b3146100b357806318160ddd146100e357806323b872dd14610101575b5f80fd5b61009d6101fd565b6040516100aa9190610a5b565b60405180910390f35b6100cd60048036038101906100c89190610b0c565b61028d565b6040516100da9190610b64565b60405180910390f35b6100eb6102af565b6040516100f89190610b8c565b60405180910390f35b61011b60048036038101906101169190610ba5565b6102b8565b6040516101289190610b64565b60405180910390f35b6101396102e6565b6040516101469190610c10565b60405180910390f35b61016960048036038101906101649190610c29565b6102ee565b6040516101769190610b8c565b60405180910390f35b610187610333565b6040516101949190610a5b565b60405180910390f35b6101b760048036038101906101b29190610b0c565b6103c3565b6040516101c49190610b64565b60405180910390f35b6101e760048036038101906101e29190610c54565b6103e5565b6040516101f49190610b8c565b60405180910390f35b60606003805461020c90610cbf565b80601f016020809104026020016040519081016040528092919081815260200182805461023890610cbf565b80156102835780601f1061025a57610100808354040283529160200191610283565b820191905f5260205f20905b81548152906001019060200180831161026657829003601f168201915b5050505050905090565b5f80610297610467565b90506102a481858561046e565b600191505092915050565b5f600254905090565b5f806102c2610467565b90506102cf858285610480565b6102da858585610513565b60019150509392505050565b5f6012905090565b5f805f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b60606004805461034290610cbf565b80601f016020809104026020016040519081016040528092919081815260200182805461036e90610cbf565b80156103b95780601f10610390576101008083540402835291602001916103b9565b820191905f5260205f20905b81548152906001019060200180831161039c57829003601f168201915b5050505050905090565b5f806103cd610467565b90506103da818585610513565b600191505092915050565b5f60015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905092915050565b5f33905090565b61047b8383836001610603565b505050565b5f61048b84846103e5565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81101561050d57818110156104fe578281836040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526004016104f593929190610cfe565b60405180910390fd5b61050c84848484035f610603565b5b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610583575f6040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260040161057a9190610d33565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036105f3575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016105ea9190610d33565b60405180910390fd5b6105fe8383836107d2565b505050565b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610673575f6040517fe602df0500000000000000000000000000000000000000000000000000000000815260040161066a9190610d33565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036106e3575f6040517f94280d620000000000000000000000000000000000000000000000000000000081526004016106da9190610d33565b60405180910390fd5b8160015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f208190555080156107cc578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516107c39190610b8c565b60405180910390a35b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610822578060025f8282546108169190610d79565b925050819055506108f0565b5f805f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050818110156108ab578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016108a293929190610cfe565b60405180910390fd5b8181035f808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610937578060025f8282540392505081905550610981565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516109de9190610b8c565b60405180910390a3505050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f610a2d826109eb565b610a3781856109f5565b9350610a47818560208601610a05565b610a5081610a13565b840191505092915050565b5f6020820190508181035f830152610a738184610a23565b905092915050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610aa882610a7f565b9050919050565b610ab881610a9e565b8114610ac2575f80fd5b50565b5f81359050610ad381610aaf565b92915050565b5f819050919050565b610aeb81610ad9565b8114610af5575f80fd5b50565b5f81359050610b0681610ae2565b92915050565b5f8060408385031215610b2257610b21610a7b565b5b5f610b2f85828601610ac5565b9250506020610b4085828601610af8565b9150509250929050565b5f8115159050919050565b610b5e81610b4a565b82525050565b5f602082019050610b775f830184610b55565b92915050565b610b8681610ad9565b82525050565b5f602082019050610b9f5f830184610b7d565b92915050565b5f805f60608486031215610bbc57610bbb610a7b565b5b5f610bc986828701610ac5565b9350506020610bda86828701610ac5565b9250506040610beb86828701610af8565b9150509250925092565b5f60ff82169050919050565b610c0a81610bf5565b82525050565b5f602082019050610c235f830184610c01565b92915050565b5f60208284031215610c3e57610c3d610a7b565b5b5f610c4b84828501610ac5565b91505092915050565b5f8060408385031215610c6a57610c69610a7b565b5b5f610c7785828601610ac5565b9250506020610c8885828601610ac5565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680610cd657607f821691505b602082108103610ce957610ce8610c92565b5b50919050565b610cf881610a9e565b82525050565b5f606082019050610d115f830186610cef565b610d1e6020830185610b7d565b610d2b6040830184610b7d565b949350505050565b5f602082019050610d465f830184610cef565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610d8382610ad9565b9150610d8e83610ad9565b9250828201905080821115610da657610da5610d4c565b5b9291505056fea2646970667358221220a73ca2c1584f901b34ae589e3af1d5e32c6eb102b75d8bf1108aa16ad909c67664736f6c634300081a0033'
const abi = [{"inputs":[ ],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[  { "internalType":"address", "name":"spender", "type":"address"  },  {  "internalType":"uint256", "name":"allowance",             "type":"uint256"          },          {             "internalType":"uint256",             "name":"needed",             "type":"uint256"          }       ],       "name":"ERC20InsufficientAllowance",       "type":"error"    },    {       "inputs":[          {             "internalType":"address",             "name":"sender",             "type":"address"          },          {             "internalType":"uint256",             "name":"balance",             "type":"uint256"          },          {             "internalType":"uint256",             "name":"needed",             "type":"uint256"          }       ],       "name":"ERC20InsufficientBalance",       "type":"error"    },    {       "inputs":[          {             "internalType":"address",             "name":"approver",             "type":"address"          }       ],       "name":"ERC20InvalidApprover",       "type":"error"    },    {       "inputs":[          {             "internalType":"address",             "name":"receiver",             "type":"address"          }       ],       "name":"ERC20InvalidReceiver",       "type":"error"    },    {       "inputs":[          {             "internalType":"address",             "name":"sender",             "type":"address"          }       ],       "name":"ERC20InvalidSender",       "type":"error"    },    {       "inputs":[          {             "internalType":"address",             "name":"spender",             "type":"address"          }       ],       "name":"ERC20InvalidSpender",       "type":"error"    },    {       "anonymous":false,       "inputs":[          {             "indexed":true,             "internalType":"address",             "name":"owner",             "type":"address"          },          {             "indexed":true,             "internalType":"address",             "name":"spender",             "type":"address"          },          {             "indexed":false,             "internalType":"uint256",             "name":"value",             "type":"uint256"          }       ],       "name":"Approval",       "type":"event"    },    {       "anonymous":false,       "inputs":[          {             "indexed":true,             "internalType":"address",             "name":"from",             "type":"address"          },          {             "indexed":true,             "internalType":"address",             "name":"to",             "type":"address"          },          {             "indexed":false,             "internalType":"uint256",             "name":"value",             "type":"uint256"          }       ],       "name":"Transfer",       "type":"event"    },    {       "inputs":[          {             "internalType":"address",             "name":"owner",             "type":"address"          },          {             "internalType":"address",             "name":"spender",             "type":"address"          }       ],       "name":"allowance",       "outputs":[          {             "internalType":"uint256",             "name":"",             "type":"uint256"          }       ],       "stateMutability":"view",       "type":"function"    },    {       "inputs":[          {             "internalType":"address",             "name":"spender",             "type":"address"          },          {             "internalType":"uint256",             "name":"value",             "type":"uint256"          }       ],       "name":"approve",       "outputs":[          {             "internalType":"bool",             "name":"",             "type":"bool"          }       ],       "stateMutability":"nonpayable",       "type":"function"    },    {       "inputs":[          {             "internalType":"address",             "name":"account",             "type":"address"          }       ],       "name":"balanceOf",       "outputs":[          {             "internalType":"uint256",             "name":"",             "type":"uint256"          }       ],       "stateMutability":"view",       "type":"function"    },    {       "inputs":[                 ],       "name":"decimals",       "outputs":[          {             "internalType":"uint8",             "name":"",             "type":"uint8"          }       ],       "stateMutability":"view",       "type":"function"    },    {       "inputs":[                 ],       "name":"name",       "outputs":[          {             "internalType":"string",             "name":"",             "type":"string"          }       ],       "stateMutability":"view",       "type":"function"    },    {       "inputs":[                 ],       "name":"symbol",       "outputs":[          {             "internalType":"string",             "name":"",             "type":"string"          }       ],       "stateMutability":"view",       "type":"function"    },    {       "inputs":[                 ],       "name":"totalSupply",       "outputs":[          {             "internalType":"uint256",             "name":"",             "type":"uint256"          }       ],       "stateMutability":"view",       "type":"function"    },    {       "inputs":[          {             "internalType":"address",             "name":"to",             "type":"address"          },          {             "internalType":"uint256",             "name":"value",             "type":"uint256"          }       ],       "name":"transfer",       "outputs":[          {             "internalType":"bool",             "name":"",             "type":"bool"          }       ],       "stateMutability":"nonpayable",       "type":"function"    },    {       "inputs":[          {             "internalType":"address",             "name":"from",             "type":"address"          },          {             "internalType":"address",             "name":"to",             "type":"address"          },          {             "internalType":"uint256",             "name":"value",             "type":"uint256"          }       ],       "name":"transferFrom",       "outputs":[          {             "internalType":"bool",             "name":"",             "type":"bool"          }       ],       "stateMutability":"nonpayable",       "type":"function"    } ]

// deploying the contract
const contractCreationPayload = {
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_simulateV1",
  "params": [
    {
      "blockStateCalls": [
        {
          "calls": [
            {
              "from": contractOwnerAddr,
              "input": contractCreationBytecode
            }
          ]
        }
      ]
    },
    "latest"
  ]
}

// const contractCreationResponse = await axios.post("http://localhost:8545", contractCreationPayload)
// const contractCreationResponseResult = contractCreationResponse.data.result[0]
// const contractDeplBytecode = contractCreationResponseResult.calls[0].returnData
// const contractDeplLogs = contractCreationResponseResult.calls[0].logs
// console.log('@@ contract deployment bytecode', contractDeplBytecode)
// console.log('@@ contract deployment logs', contractDeplLogs)
// console.log('@@ contract addresse', contractDeplLogs[0].address)

/**
 * Now testing the contract
 * 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4: contract owner, 1,000,000 TNT Token or 1000000000000000000000000
 * 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2: 0 TNT
 * then 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 transfer 1000 TNT to 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
 * 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2: 1000 TNT or 1000000000000000000000
 * 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db: 0 TNT
 * 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 approve 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db for spending 10000000000000000000 (10 TNT)
 * check allowance (owner: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, spender: 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db) should give 10 TNT ✓
 * 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB: 0 TNT
 * 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db transferFrom 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 to 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB 1 TNT
 * outcomes:
 *  - 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 should have 999 TNT 999 0000000000 00000000 ✅
 *  - 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB should have 1 TNT or 1 0000000000 00000000 ✅
 *  - 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db should have 0 TNT ✅
 *  - 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 should have 999000 TNT or 999000 0000000000 00000000 ✅
 */
// const stateOverrides = {}
// stateOverrides[ contractDeplLogs[0].address ] = { code: contractDeplBytecode }

/*
const contractInteractionPayload = {
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_simulateV1",
  "params": [
    {
      "blockStateCalls": [
        {
          "calls": [
            {
              "from": contractOwnerAddr,
              "to": contractDeplLogs[0].address,
              "input": "0x70a082310000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc4"
            }
          ]
        }
      ]
    },
    "latest"
  ]
}
*/
const contractInteractionPayload = {
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_simulateV1",
  "params": [
  {
    "blockStateCalls": [
      {
        "calls": [
          {
            "from": contractOwnerAddr,
            "input": contractCreationBytecode,
          },
          {
            "from": contractOwnerAddr,
            "to": targetContractAddr,
            "data": "0x70a082310000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc4"
          }
        ]
      }
    ]
  },
  "latest"
]
}

console.log('@@ contractInteractionPayload', JSON.stringify(contractInteractionPayload, null, 2))
let contractInteractionResponse = await axios.post("http://localhost:8545", contractInteractionPayload)
console.log(JSON.stringify(contractInteractionResponse.data, null, 2))

