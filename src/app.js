import {demoContents} from "./resources/schema/defaults"
import {jDS2Handler} from './resources/jDS2Handler'
import {Store, keys as keysIdb, get as getIdb} from 'idb-keyval'
import {saveAs} from 'file-saver'

import {DialogService} from 'aurelia-dialog'
import {LoadProject} from './resources/dialog/loadProject'
PLATFORM.moduleName('./resources/dialog/loadProject')
import {SaveProject} from './resources/dialog/saveProject'
PLATFORM.moduleName('./resources/dialog/saveProject')
import {Prompt} from './resources/dialog/prompt'
PLATFORM.moduleName('./resources/dialog/prompt')


import {inject} from 'aurelia-framework'
import {BindingSignaler} from 'aurelia-templating-resources'

@inject(DialogService, BindingSignaler)
export class App {
  jDS2 = null
  editor = null
  validatorsCache = {}
  basicTypes = ["Number", "String", "Boolean", "BigInt", "Object"]
  constructor(DS, BS, sa) {
    window.jds2 = this
    this.dialogService = DS
    this.signaler = BS
    this.save_as = saveAs
    this.baseApp = this // To be able to pass into custom elements
    setTimeout(() => {this.defaultLoad()}, 0) // Hack for browser sync desync
  }
  async defaultLoad() {
    try {
      let store = new Store("jsonDS2_settings", "settings")  //* See note @ EOF of saveProject.js
      this.idbSettings = await keysIdb(store)
      if(this.idbSettings.includes('lastSave')) {
        const saveName = await getIdb("lastSave", store)
        const save = await getIdb(saveName, new Store('jsonDS2_projects', 'projects'))
        this.jDS2 = new jDS2Handler(save)
      } else {
        throw new ReferenceError("No lastsave available")
      }
    } catch(e) {
      this.jDS2 = new jDS2Handler(demoContents)
    }
  }
  async loadTFMG() {
    let response = await fetch('data_source.json')
    this.jDS2 = jDS2Handler.build(await response.json())
    //window.c = {}
    //window.c.t = new jDS2Handler()
    //window.c.base = await response.json()
  }
  loadProject() {
    this.dialogService.open({viewModel: LoadProject, model:null, lock: false}).whenClosed(response => {
      if(!response.wasCancelled) {
        this.jDS2 = null //force aurelia update
        this.jDS2 = new jDS2Handler(response.output)
      } else {
        console.log("load cancelled")
      }
    })
  }
  saveProject() {
    //generate current SaveData
    this.dialogService.open({viewModel: SaveProject, model:this.jDS2.baseJSON, lock: false}).whenClosed(response => {
      if(!response.wasCancelled) {
      } else {
        console.log('save cancelled')
      }
    })
  }
  isTableValid(t, sT) {
    let pathArray = ["$tables", t, "$contents"]
    if(sT) pathArray.splice(-1, 1, "$subTables", sT)
    console.log(pathArray)
    return this.jDS2.list(pathArray, "values").every((ci) => this.isContentValid(t, ci))
  }
  isContentValid(t, ci) {
    if(!t || !ci) return
    if(typeof ci=="string") ci = this.jDS2.get(["$tables", t, "$contents", ci], true)
    return this.jDS2.list(["$schemas", t, "$fields"], "values").every( (f) => this.isFieldValid(f, ci.$props[f.$name]))
  }
  isFieldValid(s_field, value) {
    return this.validatorLookup(value, s_field)
  }
  async promptEditorSave() {
    if(this.suppressEditorSave) return Promise.resolve()
    if(this.editor) {
      return new Promise( (resolve) => {
        this.dialogService.open({viewModel: Prompt, model: "Would you like to save the editor", lock: false})
          .whenClosed( response => {
            if(!response.wasCancelled) {
              this.editorSave()
            }
            this.editor = null
            resolve()
        })
      })
    } else {
      return Promise.resolve()
    }
  }
  editorSave() {
    switch(this.editor.as) {
      case 'editTable':
        this.jDS2.save("schema", {$name: this.editor.schema})
        break
      case 'list':
        this.jDS2.save("contents", {where: this.editor.table, contents: this.editor.list})
        break;
      case 'editDef':
        this.jDS2.save('def', this.editor.def)
        break;
      case "editSchema":
        this.jDS2.save('schema', this.editor.schema)
        break;
      case "editType":
        //this.jDS2.save("type", {schema: this.editor.schema, subOf: this.editor.subTypeOf})
        break;
      default:
        console.log("define saving behavior for: "+this.editor.as)
    }
    this.signaler.signal("updateValids")
    this.editor = null
  }
  editorDelete(name) { // name is optional
    let sure = confirm("Are you sure you want to delete?")
    if(!sure) return
    switch(this.editor.as) {
      case "list":
        if(name) {
          this.jDS2.delete("contentItem", name, this.editor.table);
          this.signaler.signal("updateValids")
        } else {
          this.jDS2.delete('table', this.editor.table)
          this.editor = null
        }
        break;
      case "editSchema":
        this.jDS2.delete("table", this.editor.table)
        this.editor = null
        break;
      case "editDef":
        this.jDS2.delete("def", this.editor.def)
        this.editor = null
        break;
      default:
        console.log("define delete behavior for: "+this.editor.as)
        debugger
        break;
    }
    this.signaler.signal("generalUpdate")
  }
  editorCancel() {
    this.editor = null
  }
  editorGet(item) {
    switch(this.editor.as) {
      case "list":
        this.editor.CIEdit = this.jDS2.get(['$tables', this.editor.table, '$contents', item])
     default:
        return false
    }
  }
  async editTableSchema(tableName) {
    if(this.editor?.table==tableName && this.editor?.as=="editTable") return
    await this.promptEditorSave()
    if(!tableName) {
      this.editor = null;
      return
    }
    this.editor = {
       as: "editTable"
      ,table: tableName
      ,schema: this.jDS2.edit("schema", tableName)
    }
  }
  async editTypeOf(typeName, subTypeName) {
    await this.promptEditorSave()
    if(this.editor?.type==(subTypeName || typeName)) {
      this.editor = null
      return
    }
    this.editor = {
      as: "editType"
      ,type: (subTypeName || typeName)
      ,subTypeOf: (subTypeName && typeName)
      ,schema: this.jDS2.edit("type", {type: typeName, subT: subTypeName})
    }
    this.signaler.signal("generalUpdate")
  }
  async show(type, params) {
    //TODO better save_prompt logic
    await this.promptEditorSave()
    switch(type) {
      case "table":
        this.editor = {
          as: "list"
          ,table: params.name
          ,list: this.jDS2.get(["$tables",params.name, "$contents"])
          ,schema: this.jDS2.get(["$schemas", params.name])
        }
        break;
      case "subTable":
        this.editor = {
          as: "list"
          ,table: params.sub
          ,subOf: params.name
          ,list: this.jDS2.get(["$tables", params.base, "$subTables", params.sub])
          ,schema: this.jDS2.get(["$schemas", params.base])
        }
        break;
    }
  }
  async showTableContent(tableName) {
    this.editor = {
      as: "list"
      ,table: tableName
      ,list: this.jDS2.get(["$tables",tableName, "$contents"])
      ,schema: this.jDS2.get(["$schemas", tableName])
    }
  }
  addParam(params) {
    debugger
    let newParam = {
      $name: params.newParamName
     ,$type: params.newParamType.base
     ,$subType: params.newParamType.subT
     ,$lookup: params.newParamType.lookup_table
     ,$desc: params.newParamDesc
   }
   if(!this.editor.schema.$params) this.editor.schema.$params = {}
    this.editor.schema.$params[params.newParamName] = newParam
    //! IMPURE should not touch jDS2 unless in a save function
    this.jDS2.add("subType_param", {
         to: this.editor.schema.$name
        ,subOf: this.editor.subTypeOf
        ,param: newParam
    })
    this.signaler.signal("generalUpdate")
  }
  new(objType, params) {
    switch(objType) {
      case "def":
        this.jDS2.new('def', params.name, params)
        this.signaler.signal("generalUpdate")
        break;
    }
  }
  //*Add should only affect editor
  //*Save should be used to push to the handler
  add(objType, params) {
    switch(objType) {
      case 'subtype':
        if(this.editor.as=="editType" && !this.editor.subTypeOf) break
        //TODO move jDS2 push to save()
        this.jDS2.add("subtype", {
          to: this.editor.type, param: {$name: newSubTypeName}
        })
        break;
      case 'def':
        if(!params) return
        //TODO move jDS2 push to save()
        this.jDS2.add('def', params)
        break;
      case 'def_field':
        if(!params.$name) return 
        this.editor.def.$fields[params.$name] = params
        break;
      case 'schema_field':
        if(!params.$name) return
        this.editor.schema.$fields[params.$name] = params
        break;
      case 'table':
        if(!params.name) return
        this.jDS2.new('table', params.name, params)
        //this.edit('schema', params)
        break;
      case "subTable":
        let subTName = prompt("Enter name for new subTable")
        if(!subTName) return
        this.jDS2.add("subTable", {base: params.base, name: subTName})
        break;
    }
    this.signaler.signal("generalUpdate")
    this.signaler.signal("defUpdate")
}
  //*should be a jDS2 pull
  async edit(objType, params) {
    await this.promptEditorSave()
    switch(objType) {
      case 'def':
        if(!params.name) return
        this.editor = {
          as: "editDef",
          def: this.jDS2.edit('def', params.name)
        }
        this.signaler.signal("generalUpdate")
        break;
      case 'schema':
        // param.name is table name!
        if(!params.name || params.name==this.editor?.table) return
        this.editor = {
           as: "editSchema"
          ,table: params.name
          ,schema: this.jDS2.edit("schema", params.name)
        }
        this.signaler.signal("generalUpdate")
        break;
    }
  }
  editContentItem(name) {
    this.editor.CIEdit = JSON.parse(JSON.stringify(this.editor.list[name]))
  }
  storeContentItem() {
    
    this.jDS2.add("contentItem", {
       to: this.editor.table
      ,subOf: this.editor.subOf
      ,item: this.editor.CIEdit
    })
    
    this.editor.list = this.jDS2.get([
       "$tables"
       ,this.editor.subOf || this.editor.table
       ,this.editor.subOf ? "$subTables" : "$contents"
       ,this.editor.subOf && this.editor.table
    ])
    this.editor.CIEdit = null
    this.signaler.signal("updateValids")
  }
  validator(value, fn) {
    let ret = Function('value', fn)(value)
    return ret
  }
  validatorLookup(value, prop, debug = false) { // Prop comes directly from the schema...
    if(debug) debugger
    if(prop.$type=="#table") {
      return this.jDS2.list(["$tables", prop.$lookup, "$contents"], "keys").includes(value)
    }
    if(prop.$type=="#definition") {
      let fields = this.jDS2.list(["$definitions", prop.$lookup, "$fields"], "values")
      for(let each of fields) {

      }
      return true
    }

    let types = this.jDS2.types_list_base
    let fnTname = "type:"+prop.$type
    if(!this.validatorsCache[fnTname]) {
      this.validatorsCache[fnTname] = Function('value', "return "+types[prop.$type].$validator)
    }
    let passT = this.validatorsCache[fnTname](value)
    if(!prop.$subType) return passT

    let fnSname = fnTname+"UsubT:"+prop.$subType
    if(!this.validatorsCache[fnSname]) {
      this.validatorsCache[fnSname] = Function('value', 'params', "return "+types[prop.$type].$subTypes[prop.$subType].$validator)
    }
    let passS = this.validatorsCache[fnSname](value, prop.$params)
    return passT && passS
  }
  addField(name, type) {
    let obj = {
      $name: name,
      $type: type.$name
    }
    this.editor.schema.$fields.push(obj)
    this.editor.CIEdit[name] = ""
    this.newFieldType = null
    this.newFieldName = null
  } 
}

