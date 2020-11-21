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

@inject(DialogService)
export class App {
  tables = null
  types = null
  jDS2 = null
  editor = null
  constructor(DS) {
    window.jds2 = this
    this.dialogService = DS
    this.jDS2 = new jDS2Handler(demoContents)
    this.createValidationTree()
  }
  loadProject() {
    this.dialogService.open({viewModel: LoadProject, model:null, lock: false}).whenClosed(response => {
      if(!response.wasCancelled) {
        this.jDS2 = null //force aurelia update
        this.jDS2 = new jDS2Handler(response.output)
        this.createValidationTree()
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
  createValidationTree() {
    //Create validation tree
    this.validTree = {}
    let tables = this.jDS2.tables_list
    //rescope
    let validator = this.validator
    let jDS2 = this.jDS2

    for(let t of tables) {
      let t_obj= { $entries: {} }
      let contents = this.jDS2.tables_content(t.$name)
      let schema = this.jDS2.schema_def(t.$schema)
      for(let c in contents) {
        let c_obj = {$fields: {}}
        for(let f of schema.$fields) {
          c_obj.$fields[f.$name] = {}
          Object.defineProperty(c_obj.$fields[f.$name], "isValid", {
            get: function() {
              return validator(jDS2.baseJSON.$tables[t.$name].$contents[c][f.$name], jDS2.types_get(f.$type).$validator)
            }
          })
        }
        Object.defineProperty(c_obj, "isValid", {
          get: function()  {
            return Object.values(this.$fields).every((v)=> v.isValid)
          }
        })
        t_obj.$entries[c] = c_obj
      }
      Object.defineProperty(t_obj, "isValid", {
        get: function() {
          return Object.values(this.$entries).every((e)=> e.isValid)
        }
      })
      this.validTree[t.$name] = t_obj
    }
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
      default:
        console.log("define saving behavior for: "+this.editor.as)
    }

  }
  editorCancel() {
    this.editor = null
  }
  async editTableSchema(tableName) {
    if(this.editor?.table==tableName) return
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
  addNewContentItem(name) {
    let item = { $name: name, $props: {}}
    let schema = this.editor.schema.$fields
    Object.values(schema).forEach( (schema) => { item.$props[schema.name] = "" })
    this.editor.list[name] = item
    this.jDS2.contentItem_add(this.editor.table, name, item)
  }
  editContentItem(name) {
    this.editor.CIEdit = JSON.parse(JSON.stringify(name))
  }
  storeContentItem() {
    this.editor.list[this.editor.CIEdit.name] = this.editor.CIEdit
    this.editor.CIEdit = null
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

