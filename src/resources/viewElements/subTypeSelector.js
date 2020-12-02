import {App} from "app"
PLATFORM.moduleName("app")

import {inject} from "aurelia-framework"
import {bindable} from 'aurelia-templating'

@inject(App) 
export class SubTypeSelector {
  @bindable typing
  constructor(App) {
    this.signaler = App.signaler
    this.types = App.jDS2.types_list_base
    this.tables = App.jDS2.tables_list_keys
  }
}
