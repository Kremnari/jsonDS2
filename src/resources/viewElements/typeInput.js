import {App} from "app"
import {inject} from 'aurelia-framework'
import {bindable} from 'aurelia-templating'

@inject(App)
export class TypeInput {
  @bindable value
  @bindable typing
  constructor(App) {
    this.baseApp = App
  }
  bind() {
    this.type = this.baseApp.jDS2.get(["$types", this.typing.$type])
    if(this.typing.$subType) {
      this.subType = this.baseApp.jDS2.get(["$types", this.typing.$type,"$subTypes", this.typing.$subType])
    }
  }
}
