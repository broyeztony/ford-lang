

const   GetId = () => {
  global.currentId++
  return global.currentId
}

function solidityType(fordType) {
  switch (fordType) {
    case 'bool':
      return { typeClassification: 'primitive', typeIdentifier: 't_bool', typeString: 'bool', kind: 'bool' }
    case 'address':
      return { typeClassification: 'primitive', typeIdentifier: 't_address', typeString: 'address', kind: 'number' }
    case 'u8'   :
    case 'u16'  :
    case 'u24'  :
    case 'u32'  :
    case 'u40'  :
    case 'u48'  :
    case 'u56'  :
    case 'u64'  :
    case 'u72'  :
    case 'u80'  :
    case 'u88'  :
    case 'u96'  :
    case 'u104' :
    case 'u112' :
    case 'u120' :
    case 'u128' :
    case 'u136' :
    case 'u144' :
    case 'u152' :
    case 'u160' :
    case 'u168' :
    case 'u176' :
    case 'u184' :
    case 'u192' :
    case 'u200' :
    case 'u208' :
    case 'u216' :
    case 'u224' :
    case 'u232' :
    case 'u240' :
    case 'u248' :
    case 'u256' :
    case 'i8'   :
    case 'i16'  :
    case 'i24'  :
    case 'i32'  :
    case 'i40'  :
    case 'i48'  :
    case 'i56'  :
    case 'i64'  :
    case 'i72'  :
    case 'i80'  :
    case 'i88'  :
    case 'i96'  :
    case 'i104' :
    case 'i112' :
    case 'i120' :
    case 'i128' :
    case 'i136' :
    case 'i144' :
    case 'i152' :
    case 'i160' :
    case 'i168' :
    case 'i176' :
    case 'i184' :
    case 'i192' :
    case 'i200' :
    case 'i208' :
    case 'i216' :
    case 'i224' :
    case 'i232' :
    case 'i240' :
    case 'i248' :
    case 'i256' :

      const prefix = fordType.charAt(0)
      const size = fordType.slice(1, 4)

      let typeIdentifier;
      let typeString;
      switch (prefix) {
        case 'i':
          typeIdentifier = `t_int${size}`
          typeString = `int${size}`
          break;
        case 'u':
          typeIdentifier = `t_uint${size}`
          typeString = `uint${size}`
          break;
      }

      return { typeClassification: 'primitive', typeIdentifier, typeString, kind: 'number' }
    // TODO: handle strings
  }
}

const solitidityTypeIdentifier = fordType => solidityType(fordType).typeIdentifier
const solitidityTypeString = fordType => solidityType(fordType).typeString
const solitidityKind = fordType => solidityType(fordType).kind

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
  /*
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
  */
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
  GetId,
  FordTypes2SolidityTypes,
  solitidityTypeIdentifier,
  solitidityTypeString,
  solitidityKind,
  solidityType
}

