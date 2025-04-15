// playground.sol
/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Playground {
    function symbols(string calldata x, mapping(address => uint) storage m, int16 y) private returns (uint8 ) {
        return greetings("hello");
    }

    function greetings(string memory x) private returns (uint8 ) {
        return 1;
    }
}
