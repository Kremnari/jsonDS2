var basicTypes = {
  Boolean:{ $name: "Boolean", },
  String: { $name: "String", },
  Number: { $name: "Number", 
    $subTypes: {
      tenRange: { $name: "tenRange" }
    }},
  BigInt: { $name: "BigInt" },
  Array:  { $name: "Array" },
  Object: { $name: "Object" },
}
var demoContents = {
  $tables: {
    test: {
      $name: "test",
      $contents: {
        testa: {id: "testa", name: "testc"}
      },
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
        {$name: 'id', $type: 'number',},
        {$name: 'name', $type: 'string'}
      ],
      $key: "name"
    },
    test2: {
       $name: 'test2'
      ,$fields: [
        {$name: 'id', $type: 'number',},
        {$name: 'name', $type: 'string'},
        {$name: 'test', $type: 'boolean'}
      ]
      ,$key: "name"
    }
  },
  $types: basicTypes,
}

export {basicTypes, demoContents}
