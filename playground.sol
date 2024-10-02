// playground.sol
/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Playground {
    address public owner;
//    string public s = "hello Ford!";
//    bool public b = false;
//    uint8 public y0 = 200;
//    uint16 public y1 = 2000;
//    uint32 public y2 = 20000;
//    uint64 public y3 = 200000;
//    uint128 public y4 = 2000000;
//    uint256 public y5 = 20000000;
    mapping(address => int16) public mm;

    function lambda() public {
        for (uint256 k = 0; k < 10; k++) {}
    }

    function symbols(string calldata x, mapping(address => uint) storage m, int16 y) private returns (uint8) {
        return simpleInteger(200);
    }

    function simpleInteger(uint8 value) private returns (uint8){
        return value;
    }

    function payableDef(int16 amount) public payable {
        mm[owner] += amount;
    }
}
