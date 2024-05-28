Hello! 🌞

You start with 

```ford
contract SampleContract;

let s = "hello";
let b = true;
let addr = address();

def lambda {

    let a = u8(3);
    let b = 10;

    for let k = 0 to b {

    }
}
```

You end up with 

```solidity
/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SampleContract {
    string public s = "hello";
    bool public b = true;
    address public addr;

    function lambda() public {
        uint8 a = 3;
        uint256 b = 10;
        for (uint256 k = 0; k < b; k++) {}
    }
}
```

That's it!
