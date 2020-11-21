var basicTypes = {
  Boolean:{
    $name: "Boolean",
    $validator: "return typeof value === 'boolean';"
  },
  String: {
    $name: "String",
    $validator: "return typeof value === 'string';"
  },
  Number: { $name: "Number", 
    $subTypes: {
      tenRange: { $name: "tenRange" }
    }
    ,$validator: "return !isNaN(parseFloat(value)) && isFinite(value);"
  },
  BigInt: { $name: "BigInt" },
  Array:  { $name: "Array" },
  Object: { $name: "Object" },
}
var demoContents = {
  $tables: {
    test: {
      $name: "test",
      $contents: {
        testa: {id: 1234, name: "testc"}
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
        {$name: 'id', $type: 'String',},
        {$name: 'name', $type: 'String'}
      ],
      $key: "name"
    },
    test2: {
       $name: 'test2'
      ,$fields: [
        {$name: 'id', $type: 'Number',},
        {$name: 'name', $type: 'String'},
        {$name: 'test', $type: 'Boolean'}
      ]
      ,$key: "name"
    }
  },
  $types: basicTypes,
}

export {basicTypes, demoContents}
