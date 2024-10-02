// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Debug {

    function lambda() public returns (uint8) {
        return simpleInteger();
    }

    function simpleInteger() internal returns (uint8) {
        return 42;
    }
}
