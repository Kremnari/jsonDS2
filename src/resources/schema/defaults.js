var basicTypes = {
  Boolean:{
    $name: "Boolean",
    $subTypes: {},
    $validator: "typeof value === 'boolean' || value=='true' || value=='false';"
  },
  String: {
    $name: "String",
    $subTypes: {},
    $validator: "typeof value === 'string';"
  },
  Number: {
     $name: "Number"
    ,$subTypes: {
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
        ,$validator: "parseFloat(value) && params.minimum < parseFloat(value) && parseFloat(value) < params.maximum"
      }
    }
    ,$validator: "!isNaN(parseFloat(value)) && isFinite(value);"
  },
  BigInt: {
    $name: "BigInt",
    $subTypes: {
    },
    $validator: "true"
  },
  Array:  {
    $name: "Array",
    $subTypes: {
    },
    $validator: "true" 
  },
  Enumerated: {
     $name: "Enumerated"
    ,$subTypes: {
    }
    ,$validator: "true"
  }
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
      ,$fields: {
        id: {
          $name: 'id'
          ,$type: 'String'
        },
        name: {
          $name: 'name'
          ,$type: 'String'
        }
      }
    },
    test2: {
       $name: 'test2'
      ,$fields: {
         id: { $name: 'id', $type: 'Number',}
        ,name: { $name: 'name', $type: 'String'}
        ,test: { $name: 'test', $type: 'Boolean'}
        ,dec: {
            $name: 'dec'
           ,$type: "Number"
           ,$subType: "inRange"
           ,$params: {
             minimum:  0
            ,maximum: 10

           }
           ,$desc: "tests in range of 0 and 10"
         }
      }
    }
  },
  $definitions: {
    address: {
       $name: 'address'
      ,$fields: {
        line1: {
           $name: 'line1'
          ,$type: 'String'
          ,$order: 1
        },
        line2: {
           $name: 'line2'
          ,$type: 'String'
          ,$order: 2
        },
        state: {
           $name: 'state'
          ,$type: 'String'
          ,$order: 4
        },
        zipCode: {
           $name: 'zipCode'
          ,$type: 'Number'
          ,$subType: "inRange"
          ,$params: {
            minimum:  0
           ,maximum: 99999
          }
         ,$order: 5
        },
        city: {
          $name: 'city'
         ,$type: 'String'
         ,$order: 3
       },
     }
      ,$description: "A simple address form"
    }
  },
  $types: basicTypes,
}

export {basicTypes, demoContents}
