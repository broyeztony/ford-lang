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

    for let k = 0 to 10 {}
}

def what (_x: u8, _y: u8, _addr: address): u8 {
    return _x * _y;
}
```

You do
```shell
npm run compile
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

    function what(uint8 _x, uint8 _y, address _addr) public returns (uint8) {}
}

[{"inputs":[],"name":"addr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"b","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lambda","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"s","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_x","type":"uint8"},{"internalType":"uint8","name":"_y","type":"uint8"},{"internalType":"address","name":"_addr","type":"address"}],"name":"what","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"x","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"x0","outputs":[{"internalType":"int8","name":"","type":"int8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"x1","outputs":[{"internalType":"int16","name":"","type":"int16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"x2","outputs":[{"internalType":"int32","name":"","type":"int32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"x3","outputs":[{"internalType":"int8","name":"","type":"int8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"x4","outputs":[{"internalType":"int64","name":"","type":"int64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"y","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"y0","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"y1","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"y2","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"y3","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"y4","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"y5","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

60806040526040518060400160405280600b81526020017f68656c6c6f20466f7264210000000000000000000000000000000000000000008152506001908161004891906104c9565b505f60025f6101000a81548160ff021916908315150217905550655af3107a400060035560c860045f6101000a81548160ff021916908360ff1602179055506107d0600460016101000a81548161ffff021916908361ffff160217905550614e20600460036101000a81548163ffffffff021916908363ffffffff16021790555062030d40600460076101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550621e84806004600f6101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff1602179055506301312d00600555600a600655600a60075f6101000a81548160ff02191690835f0b60ff1602179055506064600760016101000a81548161ffff021916908360010b61ffff1602179055506103e8600760036101000a81548163ffffffff
```

That's it!
