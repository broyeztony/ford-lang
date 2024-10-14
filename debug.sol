// playground.sol
/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Playground {
    address public owner = 0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF;
    mapping(address => uint32) public balances;

    constructor() public {}

    function lambda() public {
        for (uint8 k = 0; k < 10; k++) {}
    }

    function symbols(mapping(address => uint32) storage m, string calldata s) private returns (uint8  res) {
        return 42;
    }

    function p() external returns (bool  res) {
        return LLLL(false);
    }

    function LLLL(bool b) private returns (bool  res) {
        return true;
    }
}
