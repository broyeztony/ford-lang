// playground.sol
/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Playground {
    address public owner;
    string public s = "hello Ford!";
    bool public b = false;
    uint256 public y = 100000000000000;
    uint8 public y0 = 200;
    uint16 public y1 = 2000;
    uint32 public y2 = 20000;
    uint64 public y3 = 200000;
    uint128 public y4 = 2000000;
    uint256 public y5 = 20000000;
    uint256 public x = 10;
    int8 public x0 = 10;
    int16 public x1 = 100;
    int32 public x2 = 1000;
    address public addr = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
    int8 public x3 = -2;
    int64 public x4 = -1100002;

    function lambda() public {
        uint256 z = 100;
        bool b2 = false;
        string memory st = "local!";
        address localAddr = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
        int32 ab = -3478923;
        for (uint256 k = 0; k < 10; k++) {}
    }

    function symbols(string calldata x, mapping(uint => address) storage m, int16 y)
    internal returns (uint8 ) {
        return 1;
    }
}

