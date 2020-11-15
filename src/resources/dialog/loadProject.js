import {DialogController} from 'aurelia-dialog'
import {Store, keys as keysIdb, get as getIdb} from 'idb-keyval'

export class LoadProject {
  static inject = [DialogController]
  constructor(controller) {
    this.controller = controller
    this.idbTarget = new Store("jsonDS2", "projects")
  }
  loadName = null
  async activate() {
    this.idbs = await keysIdb(this.idbTarget)
  }
  async loadFile(evt) {
    this.loadedData = JSON.parse(await evt.target.files[0].text())
  }
  async complete() {
    if (this.loadedData) {
      this.controller.ok(this.loadedData)
    } else if(this.loadName!=null) {
      this.loadedData = await getIdb(this.loadName, this.idbTarget)
    }
    this.controller.ok(this.loadedData)
  }
}
