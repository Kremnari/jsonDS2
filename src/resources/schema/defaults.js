var basicTypes = {
  Boolean:{ name: "Boolean",isPrimitive: true, },
  String: { name: "String", isPrimitive: true, },
  Number: { name: "Number", isPrimitive: true, },
  BigInt: { name: "BigInt", isPrimitive: true, },
  Array:  { name: "Array",  isPrimitive: true, },
  Object: { name: "Object", isPrimitive: true, },
}
var demoContents = {
  tables: {
    test: {
      name: "test",
      contents: [],
      $schema: [
        {name: 'id', type: 'number'},
        {name: 'name', type: 'string'}
      ]
    }, 
    test2: {
      name: "test2",
      contents: [],
      $schema: [
        {name: 'id', type: 'number'},
        {name: 'name', type: 'string'},
        {name: 'test', type: 'boolean'}
      ]
    },
  },
  types: basicTypes,
}

export {basicTypes, demoContents}
