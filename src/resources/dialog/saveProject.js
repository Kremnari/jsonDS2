import {DialogController} from 'aurelia-dialog'
import {saveAs} from 'file-saver';
import {Store, keys as keysIdb, set as setIdb} from 'idb-keyval'

export class SaveProject {
  static inject = [DialogController]
  constructor(controller) {
    this.controller = controller
    this.idbTarget = new Store("jsonDS2_projects", "projects") //* Doing this another way...see note at EOF
  }

  saveAs = null
  saveName = null
  async activate(saveData) {
    try {
      this.idbs = await keysIdb(this.idbTarget)
    } catch(e) {

    } finally {
      if(!this.idbs) {
        this.idbs = []
      }
    }
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
    console.log(this.saveName)
    console.log(this.saveData)
    await setIdb(this.saveName, this.saveData, this.idbTarget)
    await setIdb('lastSave', this.saveName, new Store('jsonDS2_settings', "settings"))
  }
}


/*
 * idb-keystore isn't configured to allow multiple store names per database
 * I'm not distracting myself with learning out to fork and....ect right now
 * FTM, I'm just going to use different db_names 
 */
