var basicTypes = {
  Boolean:{ $name: "Boolean",$isPrimitive: true, },
  String: { $name: "String", $isPrimitive: true, },
  Number: { $name: "Number", $isPrimitive: true, 
    $subTypes: {
      tenRange: { $name: "tenRange", $isPrimitive: false}
    }},
  BigInt: { $name: "BigInt", $isPrimitive: true, },
  Array:  { $name: "Array",  $isPrimitive: true, },
  Object: { $name: "Object", $isPrimitive: true, },
}
var demoContents = {
  $tables: {
    test: {
      $name: "test",
      $contents: [
        {id: "testa", name: "testc"}
      ],
      $schema: 'test1'
    }, 
    test2: {
      $name: "test2",
      $contents: [],
      $schema: 'test2'
    },
  },
  $schemas: {
    test1: {
      $name: 'test1'
      ,$fields: [
        {name: 'id', type: 'number'},
        {name: 'name', type: 'string'}
      ]
    },
    test2: {
       $name: 'test2'
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
