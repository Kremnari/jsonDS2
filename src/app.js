import {MetaFilter} from './resources/lib/metafilter'
import {demoContents} from "./resources/schema/defaults"
import {jDS2Handler} from './resources/jDS2Handler'

import {DialogService} from 'aurelia-dialog'
import {LoadProject} from './resources/dialog/loadProject'
import {SaveProject} from './resources/dialog/saveProject'
import {inject} from 'aurelia-framework'

@inject(DialogService)
export class App {
  tables = null
  types = null
  fileContents = demoContents
  jDS2 = null
  editor = {as: null}
  constructor(DS) {
    window.jds2 = this
    this.dialogService = DS
    setTimeout( () => { this.init() }, 0)
  }
  init() {
    //Instantiate like it's a new project
    this.tables = MetaFilter(this.fileContents.tables)
    this.types = MetaFilter(this.fileContents.types)
  }
  async loadFile(evt) {
    this.fileContents = JSON.parse(await evt.target.files[0].text())
    this.init()
  }
  loadProject() {
    this.dialogService.open({viewModel: LoadProject, model:null, lock: false}).whenClosed(response => {
      if(!response.wasCancelled) {
        this.jDS2 = new jDS2Handler(response.output)
      } else {
        console.log("load cancelled")
      }
    })
  }
  saveProject() {
    //generate current SaveData
    this.dialogService.open({viewModel: SaveProject, model:this.jDS2, lock: false}).whenClosed(response => {
      if(!response.wasCancelled) {
      } else {
        console.log('save cancelled')
      }
    })
  }
  addNewTable(name) {
    this.fileContents.tables[name] = {
      name: name,
      contents: [],
      $schema: []
    }
    this.tables.push(name)
  }
  addNewContentItem(name) {
    let props = {}
    let schema = this.fileContents.tables[this.editor.table].$schema
    Object.values(schema).forEach( (schem) => { props[schem.name] = "" })
    this.fileContents.tables[this.editor.table].contents.push({
      name: name,
      props: props
    })
    //this.editor.list.push(name)
  }
  editContentItem(name) {
    this.editor.CIEdit = this.editor.list[name]
  }
  showTableContent(tableName) {
    this.editor.as = "list"
    this.editor.table = tableName
    this.editor.list = this.fileContents.tables[tableName].contents
    this.editor.schema = this.fileContents.tables[tableName].$schema
  }
  editTableSchema(tableName) {
    if(this.editor.table==tableName) {
      this.editor = { as: null };
      return
    }
    this.editor.as = "editTable"
    this.editor.table = tableName
    this.editor.schema = this.fileContents.tables[tableName].$schema
  }

  addNewType(typeName) {
    this.types.push(typeName)
  } 
  editTypeOf(typeName) {
    this.editor.as = "editType"
  }
  addField(name, type) {
    let obj = {name: name, type: type}
    this.editor.schema.push(obj)
    this.editor.CIEdit.props[name] = ""
    this.newFieldType = null
    this.newFieldName = null
  }

}

