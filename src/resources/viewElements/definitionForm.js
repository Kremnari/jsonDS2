import {App} from "app"
import {inject} from 'aurelia-framework'
import {bindable} from 'aurelia-templating'

@inject(App)
export class DefinitionForm {
  @bindable value
  @bindable defName
  constructor(App) {
    this.baseApp = App
  }
  bind() {
    this.definition = this.baseApp.jDS2.get(["$definitions", this.defName])
  }
  defNameValueChanged() {
    this.definition = this.baseApp.jDS2.get(["$definitions", this.defName])
  }
}
