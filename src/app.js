import {MetaFilter} from './resources/lib/metafilter'
import {demoContents} from "./resources/schema/defaults"
import {jDS2Handler} from './resources/jDS2Handler'

import {DialogService} from 'aurelia-dialog'
import {LoadProject} from './resources/dialog/loadProject'
PLATFORM.moduleName('./resources/dialog/loadProject')
import {SaveProject} from './resources/dialog/saveProject'
PLATFORM.moduleName('./resources/dialog/saveProject')
import {Prompt} from './resources/dialog/prompt'
import {inject} from 'aurelia-framework'
import {BindingSignaler} from 'aurelia-templating-resources'

@inject(DialogService, BindingSignaler)
export class App {
  jDS2 = null
  editor = null
  basicTypes = ["Number", "String", "Boolean", "BigInt", "Object"]
  constructor(DS, BS) {
    window.jds2 = this
    this.dialogService = DS
    this.signaler = BS
    this.jDS2 = new jDS2Handler(demoContents)
    this.baseApp = this
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
  isTableValid(t) {
    return Object.values(this.jDS2.tables_content(t)).every((ci) => this.isContentValid(t, ci))
  }
  isContentValid(t, ci) {
    if(typeof ci=="string") ci = this.jDS2.tables_content(t)[ci]
    return Object.values(this.jDS2.tables_schema(t).$fields).every((f) => this.isFieldValid(f, ci.$props[f.$name]))
  }
  isFieldValid(s_field, value) {
    return this.validator(value, this.jDS2.types_get(s_field.$type, s_field.$subType).$validator)
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
        this.jDS2.schemas_save(this.editor.table, this.editor.schema)
        break
      case 'list':
        this.jDS2.tables_saveContent(this.editor.table, this.editor.list)
        break;
      case 'editDef':
        this.jDS2.save('def', this.editor.def)
        break;
      case "editSchema":
        this.jDS2.save('schema', this.editor.schema)
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
        if(name) { this.jDS2.delete("contentItem", name, this.editor.table); break; }
        break;
      case "editTable":
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
  }
  editorCancel() {
    this.editor = null
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
      ,schema: this.jDS2.schemas_edit(tableName)
    }
  }
  async editTypeOf(typeName, subType) {
    await this.promptEditorSave()
    if(this.editor?.type==(subType || typeName)) {
      this.editor = null
      return
    }
    this.editor = {
      as: "editType"
      ,type: (subType || typeName)
      ,subTypeOf: (subType && typeName)
      ,schema: this.jDS2.types_edit(typeName, subType)
    }
  }
  async showTableContent(tableName) {
    await this.promptEditorSave()
    this.editor = {
      as: "list"
      ,table: tableName
      ,list: this.jDS2.tables_content(tableName)
      ,schema: this.jDS2.tables_schema(tableName)
    }
  }
  addParam(params) {
    let newParam = {
      $name: params.newParamName
     ,$type: params.newParamType
   }
    this.editor.schema.$params[params.newParamName] = newParam
    this.jDS2.add("subType_param", {
         to: this.editor.type.$name
        ,subOf: this.editor.subTypeOf
        ,param: newParam
    })
    this.signaler.signal("generalUpdate")
  }
  //*Add should only affect editor
  //*Save should be used to push to the handler
  add(objType, params) {
    switch(objType) {
      case 'subtype':
        if(this.editor.as=="editType" && !this.editor.subTypeOf) break
        //TODO move jDS2 push to save()
        this.jDS2.types_sub_new(this.editor.type, {$name: newSubTypeName})
        break;
      case 'def':
        if(!params) return
        //TODO move jDS2 push to save()
        this.jDS2.add('def', params)
        this.signaler.signal("generalUpdate")
        break;
      case 'def_field':
        if(!params.$name) return 
        this.editor.def.$fields[params.$name] = params
        this.signaler.signal("generalUpdate")
        this.signaler.signal("defUpdate")
        break;
      case 'schema_field':
        if(!params.$name) return
        this.editor.schema.$fields[params.$name] = params
        this.signaler.signal("generalUpdate")
        this.signaler.signal("defUpdate")
        break;
    }
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
  addNewContentItem(name) {
    let item = { $name: name, $props: {}}
    let fields = this.editor.schema.$fields
    Object.values(fields).forEach( (field) => { item.$props[field.$name] = "" })
    this.editor.CIEdit = item
    this.jDS2.tables_saveContentItem(this.editor.table, name, item)
    this.editor.list[name] = item
  }
  editContentItem(name) {
    this.editor.CIEdit = JSON.parse(JSON.stringify(this.editor.list[name]))
  }
  storeContentItem() {
    this.jDS2.tables_saveContentItem(this.editor.table, this.editor.CIEdit.$name, this.editor.CIEdit)
    this.editor.list = this.jDS2.tables_content(this.editor.table)
    this.editor.CIEdit = null
    this.signaler.signal("updateValids")
  }
  validator(value, fn) {
    let ret = Function('value', fn)(value)
    return ret
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

