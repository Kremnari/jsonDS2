import {DialogController} from 'aurelia-dialog'
import {Store, keys as keysIdb, get as getIdb} from 'idb-keyval'

export class LoadProject {
  static inject = [DialogController]
  constructor(controller) {
    this.controller = controller
    this.idbTarget = new Store("jsonDS2_projects", "projects")  //* See note at EOF of saveProject.js
  }
  loadName = null
  message = "nothing loaded"
  async activate() {
    this.idbs = await keysIdb(this.idbTarget)
  }
  async loadFile(evt) {
    this.loadedData = JSON.parse(await evt.target.files[0].text())
    this.message = "File Loaded"
  }
  async loadDB(which) {
    this.loadedData = await getIdb(which, this.idbTarget)
    this.message = "iDB loaded"
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
