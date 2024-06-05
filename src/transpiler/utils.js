

const   GetId = () => {
  global.currentId++
  return global.currentId
}

const FordTypes2SolidityTypes = {
  // unsigned integers
  'u8'      : { typeIdentifier: 't_uint8', typeString: 'uint8', kind: 'number' },
  'u16'     : { typeIdentifier: 't_uint16', typeString: 'uint16', kind: 'number' },
  'u32'     : { typeIdentifier: 't_uint32', typeString: 'uint32', kind: 'number' },
  'u64'     : { typeIdentifier: 't_uint64', typeString: 'uint64', kind: 'number' },
  'u128'    : { typeIdentifier: 't_uint128', typeString: 'uint128', kind: 'number' },
  'u256'    : { typeIdentifier: 't_uint256', typeString: 'uint256', kind: 'number' },

  // signed integers
  'i8'      : { typeIdentifier: 't_int8', typeString: 'int8', kind: 'number' },
  'i16'     : { typeIdentifier: 't_int16', typeString: 'int16', kind: 'number' },
  'i32'     : { typeIdentifier: 't_int32', typeString: 'int32', kind: 'number' },
  'i64'     : { typeIdentifier: 't_int64', typeString: 'int64', kind: 'number' },
  'i128'    : { typeIdentifier: 't_int128', typeString: 'int128', kind: 'number' },
  'i256'    : { typeIdentifier: 't_int256', typeString: 'int256', kind: 'number' },

  // solidity intrinsic types
  'address' : { typeIdentifier: 't_address', typeString: 'address', kind: 'number' },
}

module.exports = {
  GetId, FordTypes2SolidityTypes
}
