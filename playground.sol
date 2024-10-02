// playground.sol
/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Playground {
    function lambda() public {
        for (uint256 k = 0; k < 10; k++) {}
    }

    function symbols(string calldata x, mapping(address => uint) storage m, int16 y) private returns (uint8) {
        return 42;
    }
}
