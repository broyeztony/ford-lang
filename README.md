Hello! 🌞

You start with 

```ford
contract Playground;

let owner = address();
let s = "hello Ford!";

let b = false;
let y = 100000000000000;
let y0 = u8(200);
let y1 = u16(2000);
let y2 = u32(20000);
let y3 = u64(200000);
let y4 = u128(2000000);
let y5 = u256(20000000);

let x = 10;
let x0 = i8(10);
let x1 = i16(100);
let x2 = i32(1000);
let addr = address("0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c");
let x3 = i8(-2);
let x4 = i64(-1100002);

def lambda {
    let z = 100;
    let b2 = false;
    let st = "hey!";
    let localAddr = address("0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c");
    let ab = i32(-3478923);

    for let k = 0 to 10 {

    }
}

def what (x: u8, y: u8, addr: address): u8 {

}
```

You end up with 

```solidity
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
        string memory st = "hey!";
        address localAddr = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
        int32 ab = -3478923;
        for (uint256 k = 0; k < 10; k++) {}
    }

    function what(uint8 memory x, uint8 memory y, address memory addr) public returns (uint8 memory) {}
}
```

That's it!
