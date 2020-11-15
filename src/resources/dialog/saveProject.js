import {DialogController} from 'aurelia-dialog'
import {saveAs} from 'file-saver';
import {Store, keys as keysIdb, set as setIdb} from 'idb-keyval'

export class SaveProject {
  static inject = [DialogController]
  constructor(controller) {
    this.controller = controller
    this.idbTarget = new Store("jsonDS2", "projects")
  }

  saveAs = null
  saveName = null
  async activate(saveData) {
    this.idbs = await keysIdb(this.idbTarget)
    this.saveData = saveData
  }
  async done() {
    switch(this.saveAs) {
      case 'replaceIDB':
        await this.asDB();
        break;
      case 'newIDB':
        await this.asDB();
        break;
      case 'newFile':
        await this.saveFile();
        break;
    }

    this.controller.ok();
  }
  saveFile() {
    saveAs(new Blob([JSON.stringify(this.saveData)], {type: 'application/json'}), this.saveName+".jds2")
  }
  async asDB() {
    await setIdb(this.saveName, this.saveData, this.idbTarget)
  }
}
