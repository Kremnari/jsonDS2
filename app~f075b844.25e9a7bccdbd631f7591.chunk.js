(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{0:function(e,t,n){n("GAND"),n("GmYv"),e.exports=n("b9nV")},BEPO:function(e){e.exports=JSON.parse('{"a":false,"b":false}')},app:function(e,t,n){"use strict";n.r(t),n.d(t,"App",(function(){return x}));var i={$tables:{test:{$id:"test",$contents:[],$schema:"test1"},test2:{$i:"test2",$contents:[],$schema:"test2"}},$schemas:{test1:{$id:"test1",$fields:[{name:"id",type:"number"},{name:"name",type:"string"}]},test2:{$id:"test2",$fields:[{name:"id",type:"number"},{name:"name",type:"string"},{name:"test",type:"boolean"}]}},$types:{Boolean:{name:"Boolean",isPrimitive:!0},String:{name:"String",isPrimitive:!0},Number:{name:"Number",isPrimitive:!0},BigInt:{name:"BigInt",isPrimitive:!0},Array:{name:"Array",isPrimitive:!0},Object:{name:"Object",isPrimitive:!0}}};function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=function(){function e(e){this.baseJSON=e||{$tables:{},$schemas:{},$types:{}}}var t,n,i,r=e.prototype;return r.tables_new=function(e){this.baseJSON.$tables[e]={$id:e,$schema:e,$contents:{}},this.schemas.new(e)},r.tables_content=function(e){return Object.keys(this.baseJSON.$tables[e].$contents)},r.tables_schema=function(e){return this.schema_def(this.baseJSON.$tables[e].$schema)},r.tables_saveContent=function(e,t){this.baseJSON.$tables[e].$contents=t},r.contentItem_add=function(e,t,n){this.baseJSON.$tables[e].$contents[t]=n},r.schemas_new=function(e){this.baseJSON.$schemas[e]={$id:e,$fields:[]}},r.schemas_edit=function(e){return this.baseJSON.$schemas[e]||this.schemas_new(e),this.baseJSON.$schemas[e]},r.schema_def=function(e){return this.baseJSON.$schemas[e]},r.schemas_save=function(e,t){this.baseJSON.$schemas[e].properties=t.properties},r.schemas_expand=function(e,t){var n={$name:t.name,$type:t.type};this.types.get[t.type]||this.types.new(t.type),this.baseJSON.$schemas[e].push(n)},r.schemas_prepItem=function(e){var t=this,n={};return Object.values(this.baseJSON.$schemas[name]).forEach((function(e){n[e.name]=t.types.prep(e.type)})),n},r.types_new=function(e,t){this.baseJSON.$types[e]={id:e}},r.types_edit=function(e){return this.baseJSON.$types[e]||this.types.new(e),this.baseJSON.$types[e]},r.types_prep=function(e){return{}},t=e,(n=[{key:"tables_list",get:function(){return Object.keys(this.baseJSON.$tables)}},{key:"types_list",get:function(){return Object.keys(this.baseJSON.$types)}}])&&a(t.prototype,n),i&&a(t,i),e}(),o=n("aurelia-dialog"),s=n("ztCj");function c(e,t,n,i,a,r,o){try{var s=e[r](o),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(i,a)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(i,a){var r=e.apply(t,n);function o(e){c(r,i,a,o,s,"next",e)}function s(e){c(r,i,a,o,s,"throw",e)}o(void 0)}))}}var u=function(){function e(e){this.loadName=null,this.message="nothing loaded",this.controller=e,this.idbTarget=new s.a("jsonDS2","projects")}var t=e.prototype;return t.activate=function(){var e=l(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.c)(this.idbTarget);case 2:this.idbs=e.sent;case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),t.loadFile=function(){var e=l(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=JSON,e.next=3,t.target.files[0].text();case 3:e.t1=e.sent,this.loadedData=e.t0.parse.call(e.t0,e.t1),this.message="File Loaded";case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.loadDB=function(){var e=l(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.b)(t,this.idbTarget);case 2:this.loadedData=e.sent,this.message="iDB loaded";case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.complete=function(){var e=l(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.loadedData){e.next=4;break}this.controller.ok(this.loadedData),e.next=8;break;case 4:if(null==this.loadName){e.next=8;break}return e.next=7,Object(s.b)(this.loadName,this.idbTarget);case 7:this.loadedData=e.sent;case 8:this.controller.ok(this.loadedData);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),e}();u.inject=[o.DialogController];var d=n("Iab2");function p(e,t,n,i,a,r,o){try{var s=e[r](o),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(i,a)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(i,a){var r=e.apply(t,n);function o(e){p(r,i,a,o,s,"next",e)}function s(e){p(r,i,a,o,s,"throw",e)}o(void 0)}))}}var b=function(){function e(e){this.saveAs=null,this.saveName=null,this.controller=e,this.idbTarget=new s.a("jsonDS2","projects")}var t=e.prototype;return t.activate=function(){var e=h(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.c)(this.idbTarget);case 2:this.idbs=e.sent,this.saveData=t;case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.done=function(){var e=h(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=this.saveAs,e.next="replaceIDB"===e.t0?3:"newIDB"===e.t0?6:"newFile"===e.t0?9:12;break;case 3:return e.next=5,this.asDB();case 5:return e.abrupt("break",12);case 6:return e.next=8,this.asDB();case 8:return e.abrupt("break",12);case 9:return e.next=11,this.saveFile();case 11:return e.abrupt("break",12);case 12:this.controller.ok();case 13:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),t.saveFile=function(){Object(d.saveAs)(new Blob([JSON.stringify(this.saveData)],{type:"application/json"}),this.saveName+".jds2")},t.asDB=function(){var e=h(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.d)(this.saveName,this.saveData,this.idbTarget);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),e}();b.inject=[o.DialogController];var f,m,v=n("aurelia-framework"),g=Object(v.b)(o.DialogController)(f=function(){function e(e){this.controller=e,this.answer=null,e.settings.centerHorizontalOnly=!0}return e.prototype.activate=function(e){this.message=e},e}())||f;function y(e,t,n,i,a,r,o){try{var s=e[r](o),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(i,a)}function w(e){return function(){var t=this,n=arguments;return new Promise((function(i,a){var r=e.apply(t,n);function o(e){y(r,i,a,o,s,"next",e)}function s(e){y(r,i,a,o,s,"throw",e)}o(void 0)}))}}var x=Object(v.b)(o.DialogService)(m=function(){function e(e){this.tables=null,this.types=null,this.jDS2=null,this.editor=null,window.jds2=this,this.dialogService=e,this.jDS2=new r(i)}var t=e.prototype;return t.loadProject=function(){var e=this;this.dialogService.open({viewModel:u,model:null,lock:!1}).whenClosed((function(t){t.wasCancelled?console.log("load cancelled"):(e.jDS2=null,e.jDS2=new r(t.output))}))},t.saveProject=function(){this.dialogService.open({viewModel:b,model:this.jDS2.baseJSON,lock:!1}).whenClosed((function(e){e.wasCancelled&&console.log("save cancelled")}))},t.promptEditorSave=function(){var e=w(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.editor){e.next=4;break}return e.abrupt("return",new Promise((function(e){t.dialogService.open({viewModel:g,model:"Would you like to save the editor",lock:!1}).whenClosed((function(n){n.wasCancelled||t.editorSave(),t.editor=null,console.log("closed"),e()}))})));case 4:return this.editor=null,e.abrupt("return",Promise.resolve());case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),t.editorSave=function(){switch(this.editor.as){case"editTable":this.jDS2.schemas_save(this.editor.table,this.editor.schema);break;case"list":this.jDS2.tables_saveContent(this.editor.table,this.editor.list);break;default:console.log("define saving behavior for: "+this.editor.as)}},t.editorCancel=function(){this.editor={}},t.editTableSchema=function(){var e=w(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.promptEditorSave();case 2:if(t){e.next=5;break}return this.editor=null,e.abrupt("return");case 5:this.editor={as:"editTable",table:t,schema:this.jDS2.schemas_edit(t)};case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.editTypeOf=function(){var e=w(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.promptEditorSave();case 2:if(this.editor.type!=t){e.next=5;break}return this.editor={as:null},e.abrupt("return");case 5:this.editor.as="editType",this.editor.type=t,this.editor.schema=this.jDS2.types_edit(t);case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.showTableContent=function(){var e=w(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.promptEditorSave();case 2:this.editor={as:"list",table:t,list:this.jDS2.tables_content(t),schema:this.jDS2.tables_schema(t)};case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.addNewContentItem=function(e){var t={$name:e,$props:{}},n=this.editor.schema.$fields;Object.values(n).forEach((function(e){t.$props[e.name]=""})),this.editor.list[e]=t,this.jDS2.contentItem_add(this.editor.table,e,t)},t.editContentItem=function(e){this.editor.CIEdit=JSON.parse(JSON.stringify(this.editor.list[e]))},t.storeContentItem=function(){this.editor.list[this.editor.CIEdit.name]=this.editor.CIEdit,this.editor.CIEdit=null},t.addNewType=function(e){this.types.push(e)},t.addField=function(e,t){var n={name:e,type:t};this.editor.schema.push(n),this.editor.CIEdit.obj.$props[e]="",this.newFieldType=null,this.newFieldName=null},e}())||m},"app.css":function(e,t,n){(t=n("JPst")(!1)).push([e.i,"body > nav {\n  position: fixed\n\n}\ndiv.content {\n  position: absolute;\n  top: 40px;\n  bottom: 2px;\n  left: 2px;\n  right: 2px;\n\n}\n\n.content > section {\n  display: inline-block;\n  position: absolute;\n  border: 2px solid darkslategray;\n  border-radius: 5%;\n  box-sizing: border-box;\n  padding: 5px;\n}\n\n#tablesList {\n  top: 0;\n  left: 0;\n  height: 50%;\n  width: 40%;\n}\n\n#editorArea {\n  top: 0;\n  right: 0;\n  height: 70%;\n  width: 60%;\n}\n#editorArea ul {\n  height: 35%;\n  left: 0;\n  right: 0;\n  width: 40%;\n  position: relative;  \n  columns: 2;\n}\n#editorArea ul li {\n  display: inline;\n}\n#editorArea #CIEditor {\n  position: absolute;\n  height: 60%;\n  bottom: 0;\n}\n\n#typesList {\n  bottom: 0;\n  left: 0;\n  height: 50%;\n  width: 40%;\n}\n",""]),e.exports=t},"app.html":function(e,t,n){e.exports='<template>\n  <require from="app.css"></require>\n  <nav>\n    <button click.delegate="loadProject()">Load...</button>\n    <button click.delegate="saveProject()">Save...</button>\n  </nav>\n  <div class="content">\n    <section id="tablesList">\n      <h4>Table/Object List</h4>\n      <div note="add new static content table">\n        <input type="text" value.bind="newTable"></input>\n        <button click.delegate="editTableSchema(newTable)">+&gt;</button>\n      </div>\n      <div repeat.for="t of jDS2.tables_list" if.bind="jDS2">\n        <span click.delegate="showTableContent(t)">${t}</span>\n        <span click.delegate="editTableSchema(t)">&#9998;</span>\n      </div>\n    </section>\n    <section id="editorArea" if.bind="editor.as">\n      <section if.bind="editor.as == \'list\'">\n        <div>\n          Add new Name:\n          <input type="text" value.bind="newContentName"></input>\n          <button click.delegate="addNewContentItem(newContentName)">+</button>\n        </div>\n        <ul>\n          <li repeat.for="contentItem of editor.list" click.delegate="editContentItem(contentItem)">\n            ${contentItem.$name}\n          </li>\n        </ul>\n        <div id="CIEditor" if.bind="editor.CIEdit">\n          ${editor.CIEdit.$name}\n          Add new Field:\n          <select name="types" value.bind="newFieldType">\n            <option repeat.for="type of jDS2.types_list" model.bind="type">${type}</option>\n          </select>\n          <input type="text" value.bind="newFieldName">name</input>\n          <button click.delegate="addField(newFieldName, newFieldType)">+</button>\n          <div repeat.for="prop of editor.schema.$fields">\n            ${prop.name} - ${prop.type}<input type="text" value.bind="editor.CIEdit.obj.$props[prop.name]"></input>\n          </div>\n          <button click.delegate="storeContentItem()">Store</button>\n          <button click.delegate="editor.CIEdit = null">Cancel</button>\n        </div>\n\n      </section>\n      <section if.bind="editor.as == \'editTable\'">\n        <div repeat.for="value of editor.schema.$fields">\n          ${value}\n        </div>\n      </section>\n      <section if.bind="editor.as == \'editType\'">\n        Edit Type\n      </section>\n      <button click.delegate="editorCancel()">Cancel</button>\n      <button click.delegate="editorSave()">Save</button>\n    </section>\n    <section id="typesList">\n      <h4>Types List</h4>\n      <div note="add new type">\n        <input type="text" value.bind="newTypeName"></input>\n        <button click.delegate="editTypeOf(newTypeName)">+</button>\n      </div>\n      <div repeat.for="type of jDS2.types_list" if.bind="jDS2">\n        <span click.delegate="editTypeOf(type)">${type}</span>\n        <div repeat.for="subT of type.subtypes" if.bind="type.subtypes">\n          <span click.delegate="editTypeOf(subT)">${subT.name}</span>\n        </div>\n      </div>\n    </section>\n    <section id="somethingsomethingdarkside">\n\n    </section>\n  </div>\n</template>\n'},main:function(e,t,n){"use strict";n.d(t,"configure",(function(){return a}));n("ls82");var i=n("BEPO");n("70NS");function a(e){e.use.standardConfiguration().feature("resources/index").plugin("aurelia-dialog"),e.use.developmentLogging(i.a?"debug":"warn"),i.b&&e.use.plugin("aurelia-testing"),e.start().then((function(){return e.setRoot("app")}))}},"resources/dialog/loadProject.html":function(e,t){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>\n      <h4>Select Project to load</h4>\n    </ux-dialog-header>\n    <ux-dialog-body>\n      <h5>From IDB</h5>\n      <select value.bind="loadName">\n        <option repeat.for="idb of idbs" model.bind="idb">${idb}</option>\n      </select>\n      <button click.delegate="loadDB(loadName)">Load DB</button>\n      <h5>From File</h5>\n      <input type="file" accept=".jds2,.json" id="jsonFileSelect" change.delegate="loadFile($event)">\n      <label for="jsonFileSelect">Select a File</label>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <span>${message}</span>\n      <button click.trigger="complete()">Done</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/dialog/prompt.html":function(e,t){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-body>\n      <h3>${message}</h3>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.trigger = "controller.cancel()">Cancel</button>\n      <button click.trigger = "controller.ok(message)">Ok</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/dialog/saveProject.html":function(e,t){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>\n      <h4>Save to...</h4>\n    </ux-dialog-header>\n    <ux-dialog-body>\n      <input type="radio" value="replaceIDB" name="saveType" checked.bind="saveAs"><h5>Replace IDB</h5>\n      <select value.bind="saveName">\n        <option repeat.for="idb of idbs" model.bind="idb">${idb}</option>\n      </select>\n      <h5>As...</h5>\n      <input type="text" value.bind="saveName" disabled.bind="saveAs==\'replaceIDB\'"></input>\n      <input type="radio" value="newIDB" name="saveType" checked.bind="saveAs"><label for="newIDB">New IDB</label>\n      <input type="radio" value="newFile" name="saveType" checked.bind="saveAs"><label for="newFile">New File</label><br />\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.delegate="done()">Commit</button>\n      <button click.trigger="controller.cancel()">Cancel</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/index":function(e,t,n){"use strict";function i(e){}n.r(t),n.d(t,"configure",(function(){return i}))}},[[0,2,4,3,6,5,7,8]]]);
//# sourceMappingURL=app~f075b844.25e9a7bccdbd631f7591.bundle.map