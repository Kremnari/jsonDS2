var basicTypes = {
  Boolean:{ name: "Boolean",isPrimitive: true, },
  String: { name: "String", isPrimitive: true, },
  Number: { name: "Number", isPrimitive: true, },
  BigInt: { name: "BigInt", isPrimitive: true, },
  Array:  { name: "Array",  isPrimitive: true, },
  Object: { name: "Object", isPrimitive: true, },
}
var demoContents = {
  $tables: {
    test: {
      $id: "test",
      $contents: [],
      $schema: 'test1'
    }, 
    test2: {
      $i: "test2",
      $contents: [],
      $schema: 'test2'
    },
  },
  $schemas: {
    test1: {
      $id: 'test1'
      ,$fields: [
        {name: 'id', type: 'number'},
        {name: 'name', type: 'string'}
      ]
    },
    test2: {
       $id: 'test2'
      ,$fields: [
        {name: 'id', type: 'number'},
        {name: 'name', type: 'string'},
        {name: 'test', type: 'boolean'}
      ]
    }
  },
  $types: basicTypes,
}

export {basicTypes, demoContents}
