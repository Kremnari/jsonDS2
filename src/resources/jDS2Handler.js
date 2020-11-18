export class jDS2Handler {
  constructor(json) {
    this.baseJSON = json || {
       $tables: {}
      ,$schemas: {}
      ,$types: {}
    }
  }

  tables_new(name) {
    this.baseJSON.$tables[name] = {
       $id: name
      ,$schema: name
      ,$contents: {}
    }
    this.schemas.new(name)
  }
  get tables_list() {
    return Object.values(this.baseJSON.$tables)
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

  contentItem_add(table, name, item) {
    this.baseJSON.$tables[table].$contents[name] = item
  }

  schemas_new(table) {
    this.baseJSON.$schemas[table] = { $id: table, $fields: []}
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
    }
    if(!defaults) {
      //mark dirty
    }
  }
  types_edit(name) {
    if(!this.baseJSON.$types[name])
      this.types_new(name)
    return this.baseJSON.$types[name]
  }
  types_prep(type) {
    let base = {}
    //INC Object.values(this.baseJSON.$types[name]).forEach()
    //INC this.baseJSON.$types[type]
    return base
  }
  get types_list() {
    return Object.values(this.baseJSON.$types)
  }
}
