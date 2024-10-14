

const   GetId = () => {
  global.currentId++
  return global.currentId
}

const FordTypes2SolidityTypes = {
  // unsigned integers
  'u8'      : { typeClassification: 'primitive', typeIdentifier: 't_uint8', typeString: 'uint8', kind: 'number' },
  'u16'     : { typeClassification: 'primitive', typeIdentifier: 't_uint16', typeString: 'uint16', kind: 'number' },
  'u32'     : { typeClassification: 'primitive', typeIdentifier: 't_uint32', typeString: 'uint32', kind: 'number' },
  'u64'     : { typeClassification: 'primitive', typeIdentifier: 't_uint64', typeString: 'uint64', kind: 'number' },
  'u128'    : { typeClassification: 'primitive', typeIdentifier: 't_uint128', typeString: 'uint128', kind: 'number' },
  'u256'    : { typeClassification: 'primitive', typeIdentifier: 't_uint256', typeString: 'uint256', kind: 'number' },

  // signed integers
  'i8'      : { typeClassification: 'primitive', typeIdentifier: 't_int8', typeString: 'int8', kind: 'number' },
  'i16'     : { typeClassification: 'primitive', typeIdentifier: 't_int16', typeString: 'int16', kind: 'number' },
  'i32'     : { typeClassification: 'primitive', typeIdentifier: 't_int32', typeString: 'int32', kind: 'number' },
  'i64'     : { typeClassification: 'primitive', typeIdentifier: 't_int64', typeString: 'int64', kind: 'number' },
  'i128'    : { typeClassification: 'primitive', typeIdentifier: 't_int128', typeString: 'int128', kind: 'number' },
  'i256'    : { typeClassification: 'primitive', typeIdentifier: 't_int256', typeString: 'int256', kind: 'number' },

  // 'listU8'  : { typeIdentifier: 't_array$_t_uint8_$dyn_storage', typeString: 'uint256[] storage ref', kind: 'int32' },
  'bool'    : { typeClassification: 'primitive', typeIdentifier: 't_bool', typeString: 'bool', kind: 'bool' },

  'address->u256': {
    typeClassification: 'composite',
    typeDescriptions: {
      typeIdentifier: 't_mapping$_t_address_$_t_uint256_$',
      typeString: 'mapping(address => uint256)'
    },
    typeName: {
      keyName: '',
      keyNameLocation: '-1:-1:-1',
      keyType: {
        name: "address",
        stateMutability: "nonpayable",
        nodeType: "ElementaryTypeName",
        typeDescriptions: {
          typeIdentifier: "t_address",
          typeString: "address"
        }
      },
      nodeType: "Mapping",
      src: '0:0:0',
      typeDescriptions: {
        typeIdentifier: "t_mapping$_t_address_$_t_uint256_$",
        typeString: "mapping(address => uint256)"
      },
      valueName: '',
      valueNameLocation: '-1:-1:-1',
      valueType: {
        name: "uint",
        nodeType: "ElementaryTypeName",
        typeDescriptions: {
          typeIdentifier: "t_uint256",
          typeString: "uint256"
        }
      }
    }
  },

  'string'  : [
    {
      typeClassification: 'primitive',
      typeDescriptions: {
        typeIdentifier: 't_string_memory_ptr',
        typeString: 'string'
      },
      typeName: {
        name: 'string',
        typeDescriptions: {
          typeIdentifier: 't_string_storage_ptr',
          typeString: 'string'
        }
      },
      kind: 'string',
      storageLocation: 'memory'
    },
    {
      typeClassification: 'primitive',
      typeDescriptions: {
        typeIdentifier: 't_string_storage',
        typeString: 'string'
      },
      typeName: {
        name: 'string',
        typeDescriptions: {
          typeIdentifier: 't_string_storage_ptr',
          typeString: 'string'
        }
      },
      value: {
        kind: 'string',
        typeDescriptions: {
          typeIdentifier: 't_stringliteral',
          typeString: 'literal_string'
        }
      },
      storageLocation: 'memory'
    },
  ],

  // solidity intrinsic types
  'address' : { typeClassification: 'primitive', typeIdentifier: 't_address', typeString: 'address', kind: 'number' },
}

module.exports = {
  GetId, FordTypes2SolidityTypes
}

