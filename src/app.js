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
  async promptEditorSave() {
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
    if(this.editor?.type==typeName) {
      this.editor = null
      return
    }
    this.editor = {
      as: "editType"
      ,type: typeName
      ,schema: this.jDS2.types_edit(typeName)
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
  
  addNewType(typeName) {
    this.types.push(typeName)
  } 
  addField(name, type) {
    let obj = {name: name, type: type}
    this.editor.schema.push(obj)
    this.editor.CIEdit.obj.$props[name] = ""
    this.newFieldType = null
    this.newFieldName = null
  }

}

