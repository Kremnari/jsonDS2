import {bindable} from 'aurelia-templating'
import {inject} from 'aurelia-framework'

import {App} from "app"
PLATFORM.moduleName("app")

@inject(App) 
export class Definition {
  @bindable def;
  @bindable schema;
  buttonText = "add"
  editType = null
  constructor(App) { 
    this.types = App.jDS2.list(['$types'], "values")
    this.signaler = App.signaler
    this.addField = (param) => App.add(this.editType+'_field', param)
    this.getDef = (def) => {
        if(!def) return
        this.addDef = App.jDS2.get(["$definitions", def]);
        this.fieldTyping.defFields = {}
    }
  }
  bind() {
    this.editType = (this.def && "def") || (this.schema && "schema") || required("needs schema or definition")
    this.pointer = (this.def ? this.def : this.schema)
  }
  edit(field) {
    ({
       $name: this.fieldName
      ,$order: this.fieldOrder
      ,$type: this.fieldTyping.base
      ,$subType: this.fieldTyping.subT
      ,$lookup: this.fieldTyping.lookup
      ,$params: this.fieldParams
    } = field)
    this.buttonText = "edit"
  }
  del() {
    delete this.pointer.$fields[this.newField]
    this.signaler.signal("defUpdate")
  }
  addScoped() {
    this.addField({
         $name: this.fieldName
        ,$order: (!!this.fieldOrder && this.fieldOrder) || undefined
        ,$type: this.fieldTyping.base
        ,$subType: this.fieldTyping.subT
        ,$lookup: this.fieldTyping.lookup
        ,$params: this.fieldParams || undefined
    })
    this.clearScoped()
  }
  clearScoped() {
    this.fieldName = null
    this.fieldOrder = null
    this.fieldTyping = {}
    this.fieldParams = {}
    this.buttonText = "add"
    this.signaler.signal("defUpdate")
    this.signaler.signal("typeSelectUpdate")
  }
  //Old
  fieldSubtypeChanged(newVal) {
    if(!newVal) {
      this.newFieldParams = undefined
    } else {
      this.newFieldParams = {}
    }
    this.signaler.signal("defUpdate")
  }
  editOld(field) {
    ({ $name: this.newField
      ,$order: this.newFieldOrder
      ,$subType: this.fieldSubtype
      ,$params: this.newFieldParams} = field)
    this.fieldBase = this.types[field.$type]  // in order to correctly reference subtypes..
    field.$subType && (this.fieldSubtype = this.types[field.$type].$subTypes[field.$subType])
    this.buttonText = "edit"
  }
}

const required = (message) => {
  throw new Error(message)
}
