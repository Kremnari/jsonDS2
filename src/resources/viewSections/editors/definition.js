import {bindable} from 'aurelia-templating'

export class Definition {
  @bindable def;
  @bindable types;
  @bindable addField;
  @bindable signaler;
  newField = null
  newFieldOrder = null
  fieldBase = null
  fieldSubtype = null
  newFieldParams = {}
  buttonText = "add"
  constructor() { window.testZone = this }
  edit(field) {
    ({ $name: this.newField
      ,$order: this.newFieldOrder
      ,$subType: this.fieldSubtype
      ,$params: this.newFieldParams} = field)
    this.fieldBase = this.types[field.$type]  // in order to correctly reference subtypes..
    field.$subType && (this.fieldSubtype = this.types[field.$type].$subTypes[field.$subType])
    this.buttonText = "edit"
  }
  del() {
    delete this.def.$fields[this.newField]
    this.signaler.signal("defUpdate")
  }
  addScoped(params) {
    this.addField({ param:
      { $name: this.newField,
        $order: (!!this.newFieldOrder && this.newFieldOrder) || undefined,
        $type: this.fieldBase.$name,
        $subType: this.fieldSubtype?.$name,
        $params: this.newFieldParams}
    })
    this.clearScoped()
  }
  clearScoped() {
    this.newField = null
    this.newFieldOrder = null
    this.fieldBase = null
    this.fieldSubtype = null
    this.newFieldParams = {}
    this.buttonText = "add"
  }
}
