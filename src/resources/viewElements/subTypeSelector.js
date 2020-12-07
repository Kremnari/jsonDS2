import {App} from "app"
PLATFORM.moduleName("app")

import {inject} from "aurelia-framework"
import {bindable} from 'aurelia-templating'

@inject(App) 
export class SubTypeSelector {
  @bindable typing
  @bindable skip = []
  constructor(App) {
    this.signaler = App.signaler
    this.types = App.jDS2.list(["$types"], "values")
    this.tables = App.jDS2.list(["$tables"], "keys")
    this.definitions = App.jDS2.list(["$definitions"], "keys")
  }
}
