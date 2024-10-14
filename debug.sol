/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Playground {
    address public A = 0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF;

    function lambda() public {
        for (uint24 k = 0; k < 10; k++) {}
    }

    function fun(string storage x) private returns (bool  res) {
        return true;
    }

    function LLLL() private {
        return true;
    }

    function p() public payable {}
}
