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
        this.baseJSON.$tables[data.to].$contents[data.name] = {
           $name: data.name
          ,$props: data.fields
        }
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
        return this.baseJSON.$definitions[defName] || (this.new("def", defName ) || this.baseJSON.$definitions[defName])
        break;
      case "schema":
        let schema = this.baseJSON.$schemas[this.baseJSON.$tables[data].$schema]
        if(!schema) throw new ReferenceError("Cannot locate schema to edit....")
        return JSON.parse(JSON.stringify(schema))
        break
      default:
        console.log("%cdefine edit behaviour", "color: orange; background: lightgrey")
        debugger;
     }
  }
  get(pathArray) {
    let at = this.baseJSON
    pathArray.forEach((e) => at = at[e])
    return at
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
      case "def":
        this.baseJSON.$definitions[data.$name] = data
        break;
      case "schema":
        this.baseJSON.$schemas[data.$name] = data
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
  /*TODO: Clean this up....
    I should've just used a single get/put scheme,
    and validated contents based on a defining schema....
    Once this project is initially complete, I can use this
    to create a definition schema instead of the default.js/demo 
  */
  tables_new(name) {
    // 28-NOV-20
    console.log("depreciated.. trace and update")
    debugger
    this.new("table", name)
  }
  tables_content(which) {
    return this.baseJSON.$tables[which].$contents
  }
  tables_schema(which) {
    return this.schema_def(this.baseJSON.$tables[which].$schema)
  }
  tables_saveContent(which, data) {
    this.baseJSON.$tables[which].$contents = data
  }
  tables_saveContentItem(table, name, data) {
    this.baseJSON.$tables[table].$contents[name] = data
  }

  schemas_edit(table) {
    let schemaName = this.baseJSON.$tables[table].$schema
    if(!this.baseJSON.$schemas[schemaName])
        this.schemas_new(schemaName)
    return this.baseJSON.$schemas[schemaName]
  }
  schema_def(which) {
    return this.baseJSON.$schemas[which]
  }
  schemas_save(table, schema) {
    let edit = this.baseJSON.$schemas[table]
    edit.properties = schema.properties
  }
  schemas_expand(table, contentLine) {
    let obj = {
       $name: contentLine.name
      ,$type: contentLine.type
    }
    if(this.types.get[contentLine.type]) {
      //add to obj
    } else {
      this.types.new(contentLine.type)
    }
    this.baseJSON.$schemas[table].push(obj)
  }
  schemas_prepItem(table) {
    let base = {}
    Object.values(this.baseJSON.$schemas[name]).forEach( prop => {
      base[prop.name] = this.types.prep(prop.type)
    })
    return base
  }

  types_new(name, defaults) {
    this.baseJSON.$types[name] = {
      $name: name
      ,$isPrimitive: false
      ,$subTypes: {}
    }
    if(!defaults) {
      //mark dirty?
    }
  }
  types_sub_new(type, subT) {
    console.warn('type_sub_new_called')
    debugger
    if(!this.baseJSON.$types[type].$subTypes)
      this.new("subType", subT, {to: type})
    return this.baseJSON.$types[type].$subTypes[subT.$name]
  }
  types_edit(name, subType) {
    if(subType) {
      if(!this.baseJSON.$types[name].$subTypes[subType])
        this.new("subType", subType, {to: name})
      return this.baseJSON.$types[name].$subTypes[subType]
    } else {
      if(!this.baseJSON.$types[name])
        this.types_new(name)
      return this.baseJSON.$types[name]
    }
  }
  types_get(type, subT) {
    let at = this.baseJSON.$types[type]
    if(!subT) return at
    return at.$subTypes[subT]
  }
}

function Convert(j) {
  console.log("Beginning conversion")
  let out = new jDS2Handler()

  Object.entries(j).forEach( ([k, ts]) => {
      console.log("adding key: "+k)
      out.new("table", k)
      let fieldCache = {}
      let defCache = {}
      Object.entries(ts).forEach( ([item, fields], idx) => {
        //TODO need to keep track of potentially changing fields
        //TODO need to create def for 
        Object.entries(fields).forEach(([field, value]) => {
          if(!fieldCache[field]) fieldCache[field] = []
          let type = TypeOf(value)
          if(type=="Object") {
            defCache[t+"."+field] = CreateDefinition(value)
          } else {
            if(fieldCache[field].indexOf(type)===-1) fieldCache[field].push(type)
          }
        })
        out.add("content", {to: k, name: item, fields})
      })
      Object.entries(fieldCache).forEach(([field, types]) => {
        let type = "String"
        if(types.length>1) debugger
        else type = types[0]
        out.add("schema_field", {where: k, name: field, type: type})
      })
  })
  console.log("Done")
  return out
}
function CreateDefinition(obj) {
  let def = []
  Object.entries(obj).forEach(([key, value]) => {
    
  })
  return def
}

//TODO need to be able to determine what's in arrays
function TypeOf(value) {
  let type = ({}).toString.call(value).match(/\s([a-zA-Z]+)/)[1]
  if(type=="Array") {}
  return type
}
