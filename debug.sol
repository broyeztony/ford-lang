// playground.sol
/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Playground {
    address public owner;
    address public addr = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
    string public s = "hello Ford!";
    bool public b = false;
    uint8 public y0 = 200;
    uint16 public y1 = 2000;
    uint32 public y2 = 20000;
    uint64 public y3 = 200000;
    uint128 public y4 = 2000000;
    uint256 public y5 = 20000000;

    function lambda() external {
        for (uint256 k = 0; k < 10; k++) {}
    }

    function symbols(string calldata x, mapping(address => uint) calldata m, int16 y) external returns (uint8 ) {
        return simpleInteger();
    }

    function simpleInteger() private returns (uint8 ) {
        return 42;
    }

    function payableDef(int16 amount) public payable returns (uint8 ) {
        return 10;
    }
}
