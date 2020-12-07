import {basicTypes} from "resources/schema/defaults.js"

const required = (message) => {
  throw new Error(message)
}
export class jDS2Handler {
  static build(json) {
    if(!(json.$tables || json.$version)) {
      console.log('converting')
      return Convert(json)
    } else {
      console.log('valid')
      return new jDS2Handler(json)
    }
  }
  baseJSON
  constructor(json) {
    json = json || {
      $tables: {}
     ,$schemas: {}
     ,$types: basicTypes
     ,$definitions: {}
   }
   this.baseJSON = json
  }
  //Adds a blank template
  new(what, name, params = {}) {
    switch(what) {
      case "table":
        this.baseJSON.$tables[name] = {
           $name: name
          ,$schema: name
          ,$contents: {}
        }
        this.baseJSON.$schemas[name] = { $name: name, $fields: {}}
        break;
      case "type":
        return (this.baseJSON.$types[name] = {$name: name, $subTypes: {}, $validator: "true"})
      case "subType":
        this.baseJSON.$types[params.to].$subTypes[name] = {
           $name: name
          ,$params: {}
          ,$validator: "return true"
        }
      case "def":
        this.baseJSON.$definitions[name] = {
           $name: name
          ,$fields: params.$fields || {}
          ,$description: params.$description || ""
        }
    }
  }
  //Adds an item with user-filled data
  add(what, data) {
    //TODO add default "base" version of each based on what's inbound from data
    // in other words, don't just assume data.param is a correct data structure??
    // too much shorthand above
    let base;
    switch(what) {
      case "subType_param":
        this.baseJSON.$types[data.subOf].$subTypes[data.to].$params[data.param.$name] = data.param
        break;
      case "subtype":
        this.baseJSON.$types[data.to].$subTypes[data.param.$name] = data.param
        break;
      case "def":
        base = data.$name ? data : {
          $name: data.name || data || required("Name Required")
        }
        this.baseJSON.$definitions[base.$name] = base
        break;
      case "content": 
      case "contentItem":
        this.baseJSON.$tables[data.to].$contents[data.item.$name] = data.item
        break;
      case "schema_field":
        base = {
           $name: data.name || required("Name required")
          ,$type: data.type || ""
          ,$order: data.order || 0
        }
        this.baseJSON.$schemas[data.where].$fields[data.name] = base
        break;
      default:
        console.log("%cdefine add behaviour", "color: orange; background: lightgrey")
        debugger;
    }
  }
  edit(what, data) {  // get for write... potentially could be a point of checkout/lock
    switch(what) {
      case "def":
        let defName = data.$name || data.name || data //Uggggly...
        let def = this.baseJSON.$definitions[defName] || (this.new("def", defName ) || this.baseJSON.$definitions[defName])
        return JSON.parse(JSON.stringify(def))
      case "schema":
        let schema = this.baseJSON.$schemas[this.baseJSON.$tables[data].$schema]
        if(!schema) throw new ReferenceError("Cannot locate schema to edit....")
        return JSON.parse(JSON.stringify(schema))
      case "type":
        let typing = this.baseJSON.$types[data.type]
        typing ||= this.new("type", data.type)
        if(data.subT) {
          typing = typing.$subTypes[data.subT]
          typing ||= this.new("subType", data.subT, {to: data.type})
        }
        return JSON.parse(JSON.stringify(typing))
      default:
        console.log("%cdefine edit behaviour", "color: orange; background: lightgrey")
        debugger;
     }
  }
  list(pathArray, kve = "keys") {
    //@kve enum = ["keys", "values", "entries", "object"]
    let at = this.baseJSON
    if(typeof pathArray == "string") pathArray = pathArray.split("/")
    pathArray.forEach((e) => at = at[e])
    return Object[kve](at)
  }
  get(pathArray, ref = false) {
    //@ref if false, returns a clone ("read only")
    let at = this.baseJSON
    if(typeof pathArray == "string") pathArray = pathArray.split("/")
    pathArray.forEach((e) => at = at[e])
    return ref ? at : JSON.parse(JSON.stringify(at))
  }
  delete(what, who, where) {
    switch(what) {
      case "table":
        //TODO Protect this from multiple tables sharing a schema...
        //TODO ...NYI, as there's no way to Multiple In Single Out this right now...
        //!   I.E.  there's no built in copy function
        delete this.baseJSON.$schemas[this.baseJSON.$tables[who].$schema]
        delete this.baseJSON.$tables[who]
        break;
      case "contentItem":
        delete this.baseJSON.$tables[where].$contents[who]
        break;
      case "def":
        delete this.baseJSON.$definitions[who.$name || who]
        break;
      case "schema":
        //Umm.... no... schemas should be edited only
        //these deletes should be handled at the table level
        break;
    }
  }
  save(what, data) {
    switch(what) {
      case "contents":
        this.baseJSON.$tables[data.where].$contents = data.contents
      case "def":
        this.baseJSON.$definitions[data.$name] = data
        break;
      case "schema":
        this.baseJSON.$schemas[data.$name] = data
        break;
      case "type":
        data.subOf
          ? this.baseJSON.$types[data.subOf].$subTypes[data.schema.$name]
          : this.baseJSON.$types[data.schema.$name] = data.schema
        break;
      default:
        console.log("%cdefine save behaviour", "color: orange; background: lightgrey")
        debugger;
    }
  }
  get tables_list() {
    return Object.values(this.baseJSON.$tables)
  }
  get tables_list_base() {
    return this.baseJSON.$tables
  }
  get tables_list_keys() {
    return Object.keys(this.baseJSON.$tables)
  }
  get types_list() {
    return Object.values(this.baseJSON.$types)
  }
  get types_list_base() {
    return this.baseJSON.$types
  }
  get defs_list_keys() {
    return Object.keys(this.baseJSON.$definitions)
  }
}

function Convert(j) {
  console.warn("This is intended to be interactive through the console")
  let out = new jDS2Handler()

  function CreateDefinition(obj, defName) {
    let def = []
    console.log('atDef')
    debugger
    Object.entries(obj).forEach(([key, value]) => {
  
    })
    defCache[defName] = def
  }
  function TypeOf(value) {
    let type = ({}).toString.call(value).match(/\s([a-zA-Z]+)/)[1]
    if(type=="Array") {
      type += ":"+TypeOf(value[0])
      console.log('atArray::'+type)
    }
    if(type=="Object") {
      console.log("object")
      console.log(value)
    }
    return type
  }
  //Lookup Dimension 1, Table Names
    Object.entries(j).forEach( ([k, ts]) => {
    console.log("adding key: "+k)
    out.new("table", k)
    let fieldCache = {}
    let defCache = {}
    //Lookup Dimension 1, Table Names
    Object.entries(ts).forEach( ([item, fields], idx) => {
      //TODO need to keep track of potentially changing fields
      //TODO need to create def for 
      //Lookup Dimension 2, Field Names
      Object.entries(fields).forEach(([field, value]) => {
        if(!fieldCache[field]) fieldCache[field] = []
        let type = TypeOf(value, out)
        if(type=="Object") {
          defCache[k+"."+field] = CreateDefinition(value, )
        } else {
          if(fieldCache[field].indexOf(type)===-1) fieldCache[field].push(type)
        }
      })
      out.add("content", {to: k, name: item, fields})
    })
    //Define Schema by detected Fields
    Object.entries(fieldCache).forEach(([field, types]) => {
      let type = "String"
      if(types.length==1) {
        if(types[0].indexOf("Array")>-1) {
          console.log('field contains array: '+field+" of "+JSON.stringify(types))
          debugger
        } else {
          out.add("schema_field", {where: k, name: field, type: types[0]})
        }
      } else {
        //multiple types for the field detected
      }
    })
  })
  console.log("Done")
  return out
}
