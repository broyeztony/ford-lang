Hello! 🌞

You start with 

```ford
contract Playground;

let x = u8(1);
let y = i8(10);

let aNumber = 1000; // no explicit type => default to uint256
let str = "";
let addr = address("0xFE07F44f09b1EFd64aA52Aa149CDe409502F27f2");
let boole = true;

def lambda {
    let a = u16(512);
    let b = u32(751749403);

    for let k = 0 to 5 {
        // do something
    }
}
```

You end up with 

```solidity
/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Playground {
    uint8 public x = 1;
    int8 public y = 10;
    uint256 public aNumber = 1000;
    string public str = "";
    address public addr = 0xFE07F44f09b1EFd64aA52Aa149CDe409502F27f2;
    bool public boole = true;

    function lambda() public {
        uint16 a = 512;
        uint32 b = 751749403;
        for (uint256 k = 0; k < 5; k++) {}
    }
}
```

That's it!
