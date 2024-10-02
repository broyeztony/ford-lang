// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Debug {

    /**
    "typeDescriptions": {
        "typeIdentifier": "t_string_storage",
        "typeString": "string"
    },
    "typeName": {
        "name": "string",
        "nodeType": "ElementaryTypeName",
        "typeDescriptions": {
            "typeIdentifier": "t_string_storage_ptr",
            "typeString": "string"
        }
    },
    "value": {
        "hexValue": "...",
        "kind": "string",
        "nodeType": "Literal",
        "typeDescriptions": {
            "typeIdentifier": "t_stringliteral_57caa176af1ac0433c5df30e8dabcd2ec1af1e92a26eced5f719b88458777cd6",
            "typeString": "literal_string \"hello world!\""
        },
        "value": "hello world!"
    },
    */

    function balances(string memory userId, mapping(uint => address) storage foo) internal returns (uint256) {
        string memory a = "my string";
        return 1;
    }

}
