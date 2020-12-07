import {App} from "app"
import {inject, observable} from 'aurelia-framework'
import {bindable} from 'aurelia-templating'

@inject(App)
export class TypeInput {
  @bindable value
  @bindable typing
  constructor(App) {
    this.baseApp = App
  }
  bind() {
    if(this.typing.$type=="#table") {
      this.control = "table"
      this.elements = this.baseApp.jDS2.list(["$tables", this.typing.$lookup, "$contents"], "keys")
    } else if(this.typing.$type=="#definition") {
      this.control = "definition"
      this.collapseMe = false
      this.value ??= {}
      this.defLines = this.baseApp.jDS2.list(["$definitions", this.typing.$lookup, "$fields"], "values")
    } else {
      this.control = "basic"
      this.type = this.baseApp.jDS2.get(["$types", this.typing.$type])
      if(this.typing.$subType) {
        this.subType = this.baseApp.jDS2.get(["$types", this.typing.$type,"$subTypes", this.typing.$subType])
      }
    }
  }
  valueChanged() {
    this.baseApp.signaler.signal("updateValids")
  }
  toggleSub() {
    this.collapseMe = !this.collapseMe
  }
}
