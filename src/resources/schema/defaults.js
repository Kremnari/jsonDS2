var basicTypes = {
  Boolean:{
    $name: "Boolean",
    $validator: "return typeof value === 'boolean' || value=='true' || value=='false';"
  },
  String: {
    $name: "String",
    $validator: "return typeof value === 'string';"
  },
  Number: { $name: "Number", 
    $subTypes: {
      inRange: {
        $name: "inRange"
        ,$params: {
          minimum: {
             $name: "minimum"
            ,$type: "Number"
            ,$required: true
          },
          maximum: {
             $name: "maximum"
            ,$type: "Number"
            ,$required: true
          }
        }
        ,$validator: "return parseFloat(value) && params.minimum < parseFloat(value) && parseFloat(value) < params.maximum"
      }
    }
    ,$validator: "return !isNaN(parseFloat(value)) && isFinite(value);"
  },
  BigInt: { $name: "BigInt" },
  Array:  { $name: "Array" },
}
var demoContents = {
  $tables: {
    test: {
      $name: "test",
      $contents: {
        testa: {
          $name: 'testa'
          ,$props: {
            id: 1234
            ,name: "testc"
          }
        }
      },
      $schema: 'test1'
    }, 
    test2: {
      $name: "test2",
      $contents: {},
      $schema: 'test2'
    },
  },
  $schemas: {
    test1: {
      $name: 'test1'
      ,$fields: [
        {
          $name: 'id'
          ,$type: 'String'
        },
        {
          $name: 'name'
          ,$type: 'String'
        }
      ]
    },
    test2: {
       $name: 'test2'
      ,$fields: [
         { $name: 'id', $type: 'Number',}
        ,{ $name: 'name', $type: 'String'}
        ,{ $name: 'test', $type: 'Boolean'}
        ,{ $name: 'dec', $type: "Number"
           ,$subType: "inRange"
           ,$params: {
             minimum:  0
            ,maximum: 10

           }
           ,$desc: "tests in range of 0 and 10"
         }
      ]
    }
  },
  $definitions: {
    address: {
      
    }
  },
  $types: basicTypes,
}

export {basicTypes, demoContents}
