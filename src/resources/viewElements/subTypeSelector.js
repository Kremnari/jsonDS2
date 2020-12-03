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
    this.types = App.jDS2.types_list_base
    this.tables = App.jDS2.tables_list_keys
    this.definitions = App.jDS2.defs_list_keys
  }
}
