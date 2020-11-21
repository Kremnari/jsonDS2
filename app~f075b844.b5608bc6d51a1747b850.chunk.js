(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{0:function(e,t,n){n("GAND"),n("GmYv"),e.exports=n("b9nV")},BEPO:function(e){e.exports=JSON.parse('{"a":false,"b":false}')},app:function(e,t,n){"use strict";n.r(t),n.d(t,"App",(function(){return v}));var i={$tables:{test:{$name:"test",$contents:{testa:{id:1234,name:"testc"}},$schema:"test1"},test2:{$name:"test2",$contents:[],$schema:"test2"}},$schemas:{test1:{$name:"test1",$fields:[{$name:"id",$type:"String"},{$name:"name",$type:"String"}],$key:"name"},test2:{$name:"test2",$fields:[{$name:"id",$type:"Number"},{$name:"name",$type:"String"},{$name:"test",$type:"Boolean"}],$key:"name"}},$types:{Boolean:{$name:"Boolean",$validator:"return typeof value === 'boolean';"},String:{$name:"String",$validator:"return typeof value === 'string';"},Number:{$name:"Number",$subTypes:{tenRange:{$name:"tenRange"}},$validator:"return !isNaN(parseFloat(value)) && isFinite(value);"},BigInt:{$name:"BigInt"},Array:{$name:"Array"},Object:{$name:"Object"}}};function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var a,s,o=function(){function e(e){this.baseJSON=e||{$tables:{},$schemas:{},$types:{}}}var t,n,i,a=e.prototype;return a.tables_new=function(e){this.baseJSON.$tables[e]={$id:e,$schema:e,$contents:{}},this.schemas.new(e)},a.tables_content=function(e){return this.baseJSON.$tables[e].$contents},a.tables_schema=function(e){return this.schema_def(this.baseJSON.$tables[e].$schema)},a.tables_saveContent=function(e,t){this.baseJSON.$tables[e].$contents=t},a.tables_saveContentItem=function(e,t,n){this.baseJSON.$tables[e].$contents[t]=n},a.contentItem_add=function(e,t,n){this.baseJSON.$tables[e].$contents[t]=n},a.schemas_new=function(e){this.baseJSON.$schemas[e]={$id:e,$fields:[]}},a.schemas_edit=function(e){var t=this.baseJSON.$tables[e].$schema;return this.baseJSON.$schemas[t]||this.schemas_new(t),this.baseJSON.$schemas[t]},a.schema_def=function(e){return this.baseJSON.$schemas[e]},a.schemas_save=function(e,t){this.baseJSON.$schemas[e].properties=t.properties},a.schemas_expand=function(e,t){var n={$name:t.name,$type:t.type};this.types.get[t.type]||this.types.new(t.type),this.baseJSON.$schemas[e].push(n)},a.schemas_prepItem=function(e){var t=this,n={};return Object.values(this.baseJSON.$schemas[name]).forEach((function(e){n[e.name]=t.types.prep(e.type)})),n},a.types_new=function(e,t){this.baseJSON.$types[e]={$name:e,$isPrimitive:!1}},a.types_sub_new=function(e,t){return this.baseJSON.$types[e].$subTypes||(this.baseJSON.$types[e].$subTypes={}),this.baseJSON.$types[e].$subTypes[t.$name]=t,this.baseJSON.$types[e].$subType[t.$name]},a.types_edit=function(e,t){return t?(this.baseJSON.$types[e].$subTypes[t.$name]||this.types_sub_new(e,t),this.baseJSON.$types[e].$subTypes[t.$name]):(this.baseJSON.$types[e]||this.types_new(e),this.baseJSON.$types[e])},a.types_get=function(e,t){var n=this.baseJSON.$types[e];return t?n.$subTypes[t]:n},a.types_prep=function(e){return{}},t=e,(n=[{key:"tables_list",get:function(){return Object.values(this.baseJSON.$tables)}},{key:"types_list",get:function(){return Object.values(this.baseJSON.$types)}}])&&r(t.prototype,n),i&&r(t,i),e}(),l=n("aurelia-dialog"),u=n("resources/dialog/loadProject"),c=n("resources/dialog/saveProject"),d=n("aurelia-framework"),p=Object(d.b)(l.DialogController)(a=function(){function e(e){this.controller=e,this.answer=null,e.settings.centerHorizontalOnly=!0}return e.prototype.activate=function(e){this.message=e},e}())||a;function b(e,t,n,i,r,a,s){try{var o=e[a](s),l=o.value}catch(e){return void n(e)}o.done?t(l):Promise.resolve(l).then(i,r)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(i,r){var a=e.apply(t,n);function s(e){b(a,i,r,s,o,"next",e)}function o(e){b(a,i,r,s,o,"throw",e)}s(void 0)}))}}function f(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0;return function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}var v=Object(d.b)(l.DialogService)(s=function(){function e(e){this.tables=null,this.types=null,this.jDS2=null,this.editor=null,window.jds2=this,this.dialogService=e,this.jDS2=new o(i),this.createValidationTree()}var t=e.prototype;return t.loadProject=function(){var e=this;this.dialogService.open({viewModel:u.LoadProject,model:null,lock:!1}).whenClosed((function(t){t.wasCancelled?console.log("load cancelled"):(e.jDS2=null,e.jDS2=new o(t.output),e.createValidationTree())}))},t.saveProject=function(){this.dialogService.open({viewModel:c.SaveProject,model:this.jDS2.baseJSON,lock:!1}).whenClosed((function(e){e.wasCancelled&&console.log("save cancelled")}))},t.createValidationTree=function(){var e=this;this.validTree={};for(var t,n=this.jDS2.tables_list,i=this.validator,r=this.jDS2,a=function(){var n=t.value,a={$entries:{}},s=e.jDS2.tables_content(n.$name),o=e.jDS2.schema_def(n.$schema),l=function(e){for(var t,s={$fields:{}},l=function(){var a=t.value;s.$fields[a.$name]={},Object.defineProperty(s.$fields[a.$name],"isValid",{get:function(){return i(r.baseJSON.$tables[n.$name].$contents[e][a.$name],r.types_get(a.$type).$validator)}})},u=f(o.$fields);!(t=u()).done;)l();Object.defineProperty(s,"isValid",{get:function(){return Object.values(this.$fields).every((function(e){return e.isValid}))}}),a.$entries[e]=s};for(var u in s)l(u);Object.defineProperty(a,"isValid",{get:function(){return Object.values(this.$entries).every((function(e){return e.isValid}))}}),e.validTree[n.$name]=a},s=f(n);!(t=s()).done;)a()},t.isTableValid=function(e){var t=this;return Object.values(this.jDS2.tables_content(e)).every((function(n){return t.isContentValid(e,n)}))},t.isContentValid=function(e,t){var n=this;return this.jDS2.tables_schema(e).$fields.every((function(e){return n.isFieldValid(e,t[e.$name])}))},t.isFieldValid=function(e,t){return this.validator(t,this.jDS2.types_get(e.$type,e.$subType).$validator)},t.promptEditorSave=function(){var e=h(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.suppressEditorSave){e.next=2;break}return e.abrupt("return",Promise.resolve());case 2:if(!this.editor){e.next=6;break}return e.abrupt("return",new Promise((function(e){t.dialogService.open({viewModel:p,model:"Would you like to save the editor",lock:!1}).whenClosed((function(n){n.wasCancelled||t.editorSave(),t.editor=null,e()}))})));case 6:return e.abrupt("return",Promise.resolve());case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),t.editorSave=function(){switch(this.editor.as){case"editTable":this.jDS2.schemas_save(this.editor.table,this.editor.schema);break;case"list":this.jDS2.tables_saveContent(this.editor.table,this.editor.list);break;default:console.log("define saving behavior for: "+this.editor.as)}},t.editorCancel=function(){this.editor=null},t.editTableSchema=function(){var e=h(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((null==(n=this.editor)?void 0:n.table)!=t){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,this.promptEditorSave();case 4:if(t){e.next=7;break}return this.editor=null,e.abrupt("return");case 7:this.editor={as:"editTable",table:t,schema:this.jDS2.schemas_edit(t)};case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.editTypeOf=function(){var e=h(regeneratorRuntime.mark((function e(t,n){var i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.promptEditorSave();case 2:if((null==(i=this.editor)?void 0:i.type)!=(n||t)){e.next=5;break}return this.editor=null,e.abrupt("return");case 5:this.editor={as:"editType",type:n||t,subTypeOf:n&&t,schema:this.jDS2.types_edit(t,n)};case 6:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}(),t.showTableContent=function(){var e=h(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.promptEditorSave();case 2:this.editor={as:"list",table:t,list:this.jDS2.tables_content(t),schema:this.jDS2.tables_schema(t)};case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.addNewContentItem=function(e){var t={$name:e,$props:{}},n=this.editor.schema.$fields;Object.values(n).forEach((function(e){t.$props[e.name]=""})),this.editor.list[e]=t,this.jDS2.contentItem_add(this.editor.table,e,t)},t.editContentItem=function(e){this.editor.CIEdit=JSON.parse(JSON.stringify(this.editor.list[e])),this.editor.CIKey=e},t.storeContentItem=function(){this.jDS2.tables_saveContentItem(this.editor.table,this.editor.CIKey,JSON.parse(JSON.stringify(this.editor.CIEdit))),this.editor.list=this.jDS2.tables_content(this.editor.table),this.editor.CIEdit=null},t.validator=function(e,t){return Function("value",t)(e)},t.addField=function(e,t){var n={$name:e,$type:t.$name};this.editor.schema.$fields.push(n),this.editor.CIEdit[e]="",this.newFieldType=null,this.newFieldName=null},e}())||s},"app.css":function(e,t,n){(t=n("JPst")(!1)).push([e.i,"body > nav {\n  position: fixed\n\n}\ndiv.content {\n  position: absolute;\n  top: 40px;\n  bottom: 2px;\n  left: 2px;\n  right: 2px;\n\n}\n\n.content > section {\n  display: inline-block;\n  position: absolute;\n  border: 2px solid darkslategray;\n  border-radius: 5%;\n  box-sizing: border-box;\n  padding: 5px;\n}\n\n#tablesList {\n  top: 0;\n  left: 0;\n  height: 50%;\n  width: 40%;\n}\n\n#editorArea {\n  top: 0;\n  right: 0;\n  height: 70%;\n  width: 60%;\n}\n#editorArea ul {\n  height: 35%;\n  left: 0;\n  right: 0;\n  width: 40%;\n  position: relative;  \n  columns: 2;\n}\n#editorArea ul li {\n  display: inline;\n}\n#editorArea #CIEditor {\n  position: absolute;\n  height: 60%;\n  bottom: 0;\n}\n\n#typesList {\n  bottom: 0;\n  left: 0;\n  height: 50%;\n  width: 40%;\n}\n\n.labelLinked {\n  display: none;\n}\n.labelLinked:unchecked ~ p {\n  display: none;\n}\n.labelLinked:checked ~ p {\n  display: revert;\n}\n",""]),e.exports=t},"app.html":function(e,t,n){e.exports='<template>\n  <require from="app.css"></require>\n  <require from="resources/elements/typeFields/selector.html" as="field-selector"></require>\n  <require from="resources/viewSections/typeEditor.html" as="type-editor"></require>\n  <require from="resources/viewElements/contentPropertyLine.html" as="contentPropertyLine"></require>\n  <nav>\n    <button click.delegate="loadProject()">Load...</button>\n    <button click.delegate="saveProject()">Save...</button>\n    Editor Save:<input type="checkbox" checked value.bind="suppressEditorSave">\n  </nav>\n  <div class="content">\n    <section id="tablesList">\n      <h4>Table/Object List</h4>\n      <div note="add new static content table">\n        <input type="text" value.bind="newTable"></input>\n        <button click.delegate="editTableSchema(newTable)">+&gt;</button>\n      </div>\n      <div repeat.for="t of jDS2.tables_list" if.bind="jDS2">\n        <span click.delegate="showTableContent(t.$name)">${t.$name}</span>\n        <input type="checkbox" class="validObject" checked.bind="isTableValid(t.$name)">\n        <span click.delegate="editTableSchema(t.$name)">&#9998;</span>\n      </div>\n    </section>\n    <section id="editorArea" if.bind="editor.as">\n      <section if.bind="editor.as == \'list\'">\n        <div>\n          Add new Name:\n          <input type="text" value.bind="newContentName"></input>\n          <button click.delegate="addNewContentItem(newContentName)">+</button>\n        </div>\n        <ul>\n          <li repeat.for="contentItem of editor.list | objectKeys" click.delegate="editContentItem(contentItem)">\n            ${editor.list[contentItem].name}<input type="checkbox" checked.bind="isContentValid(editor.table, editor.list[contentItem])">\n          </li>\n        </ul>\n\n        <div id="CIEditor" if.bind="editor.CIEdit">\n          ${editor.CIEdit.$name}\n          Add new Field:\n          <select name="types" value.bind="newFieldType">\n            <option repeat.for="type of jDS2.types_list" model.bind="type">${type.$name}</option>\n          </select>\n          <input type="text" value.bind="newFieldName">name</input>\n          <button click.delegate="addField(newFieldName, newFieldType)">+</button>\n          <div repeat.for="prop of editor.schema.$fields">\n            <div\n              as-element="contentPropertyLine"\n              prop.bind="prop"\n              type.bind="jDS2.types_get(prop.$type, prop.$subType)"\n              editor.bind="editor"\n              validator.bind="validator"\n            ></div>\n          </div>\n          <button click.delegate="storeContentItem()">Store</button>\n          <button click.delegate="editor.CIEdit = null">Cancel</button>\n        </div>\n\n      </section>\n      <section if.bind="editor.as == \'editTable\'">\n        <field-selector repeat.for="field of editor.schema.$fields" field.bind="field"></field-selector>\n      </section>\n      <section\n        as-element="type-editor"\n        if.bind="editor.as == \'editType\'"\n        type.bind="editor.schema"\n        sub-type-of.bind="editor.subTypeOf"\n      ></section>\n      <div if.bind="editor.as==\'editType\'">Type EditorX</div>\n      <button click.delegate="editorCancel()">Cancel</button>\n      <button click.delegate="editorSave()">Save</button>\n    </section>\n    <section id="typesList">\n      <h4>Types List</h4>\n      <div note="add new type">\n        <input type="text" value.bind="newTypeName"></input>\n        <button click.delegate="editTypeOf(newTypeName)">+</button>\n      </div>\n      <div repeat.for="type of jDS2.types_list" if.bind="jDS2">\n        <span click.delegate="editTypeOf(type.$name)">${type.$name}</span>\n        <div repeat.for="subT of type.$subTypes | objectValues" if.bind="type.$subTypes">\n          <span click.delegate="editTypeOf(type.$name, subT)">&nbsp;-&nbsp;${subT.$name}</span>\n        </div>\n      </div>\n    </section>\n    <section id="somethingsomethingdarkside">\n\n    </section>\n  </div>\n</template>\n'},main:function(e,t,n){"use strict";n.d(t,"configure",(function(){return r}));n("ls82");var i=n("BEPO");n("70NS");function r(e){e.use.standardConfiguration().feature("resources/index").plugin("aurelia-dialog"),e.use.developmentLogging(i.a?"debug":"warn"),i.b&&e.use.plugin("aurelia-testing"),e.start().then((function(){return e.setRoot("app")}))}},"resources/dialog/loadProject":function(e,t,n){"use strict";n.r(t),n.d(t,"LoadProject",(function(){return o}));var i=n("aurelia-dialog"),r=n("ztCj");function a(e,t,n,i,r,a,s){try{var o=e[a](s),l=o.value}catch(e){return void n(e)}o.done?t(l):Promise.resolve(l).then(i,r)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(i,r){var s=e.apply(t,n);function o(e){a(s,i,r,o,l,"next",e)}function l(e){a(s,i,r,o,l,"throw",e)}o(void 0)}))}}var o=function(){function e(e){this.loadName=null,this.message="nothing loaded",this.controller=e,this.idbTarget=new r.a("jsonDS2","projects")}var t=e.prototype;return t.activate=function(){var e=s(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.c)(this.idbTarget);case 2:this.idbs=e.sent;case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),t.loadFile=function(){var e=s(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=JSON,e.next=3,t.target.files[0].text();case 3:e.t1=e.sent,this.loadedData=e.t0.parse.call(e.t0,e.t1),this.message="File Loaded";case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.loadDB=function(){var e=s(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(r.b)(t,this.idbTarget);case 2:this.loadedData=e.sent,this.message="iDB loaded";case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.complete=function(){var e=s(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.loadedData){e.next=4;break}this.controller.ok(this.loadedData),e.next=8;break;case 4:if(null==this.loadName){e.next=8;break}return e.next=7,Object(r.b)(this.loadName,this.idbTarget);case 7:this.loadedData=e.sent;case 8:this.controller.ok(this.loadedData);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),e}();o.inject=[i.DialogController]},"resources/dialog/loadProject.html":function(e,t){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>\n      <h4>Select Project to load</h4>\n    </ux-dialog-header>\n    <ux-dialog-body>\n      <h5>From IDB</h5>\n      <select value.bind="loadName">\n        <option repeat.for="idb of idbs" model.bind="idb">${idb}</option>\n      </select>\n      <button click.delegate="loadDB(loadName)">Load DB</button>\n      <h5>From File</h5>\n      <input type="file" accept=".jds2,.json" id="jsonFileSelect" change.delegate="loadFile($event)">\n      <label for="jsonFileSelect">Select a File</label>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <span>${message}</span>\n      <button click.trigger="complete()">Done</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/dialog/prompt.html":function(e,t){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-body>\n      <h3>${message}</h3>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.trigger = "controller.cancel()">Cancel</button>\n      <button click.trigger = "controller.ok(message)">Ok</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/dialog/saveProject":function(e,t,n){"use strict";n.r(t),n.d(t,"SaveProject",(function(){return l}));var i=n("aurelia-dialog"),r=n("Iab2"),a=n("ztCj");function s(e,t,n,i,r,a,s){try{var o=e[a](s),l=o.value}catch(e){return void n(e)}o.done?t(l):Promise.resolve(l).then(i,r)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(i,r){var a=e.apply(t,n);function o(e){s(a,i,r,o,l,"next",e)}function l(e){s(a,i,r,o,l,"throw",e)}o(void 0)}))}}var l=function(){function e(e){this.saveAs=null,this.saveName=null,this.controller=e,this.idbTarget=new a.a("jsonDS2","projects")}var t=e.prototype;return t.activate=function(){var e=o(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(a.c)(this.idbTarget);case 2:this.idbs=e.sent,this.saveData=t;case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.done=function(){var e=o(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=this.saveAs,e.next="replaceIDB"===e.t0?3:"newIDB"===e.t0?6:"newFile"===e.t0?9:12;break;case 3:return e.next=5,this.asDB();case 5:return e.abrupt("break",12);case 6:return e.next=8,this.asDB();case 8:return e.abrupt("break",12);case 9:return e.next=11,this.saveFile();case 11:return e.abrupt("break",12);case 12:this.controller.ok();case 13:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),t.saveFile=function(){Object(r.saveAs)(new Blob([JSON.stringify(this.saveData)],{type:"application/json"}),this.saveName+".jds2")},t.asDB=function(){var e=o(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(a.d)(this.saveName,this.saveData,this.idbTarget);case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),e}();l.inject=[i.DialogController]},"resources/dialog/saveProject.html":function(e,t){e.exports='<template>\n  <ux-dialog>\n    <ux-dialog-header>\n      <h4>Save to...</h4>\n    </ux-dialog-header>\n    <ux-dialog-body>\n      <input type="radio" value="replaceIDB" name="saveType" checked.bind="saveAs"><h5>Replace IDB</h5>\n      <select value.bind="saveName">\n        <option repeat.for="idb of idbs" model.bind="idb">${idb}</option>\n      </select>\n      <h5>As...</h5>\n      <input type="text" value.bind="saveName" disabled.bind="saveAs==\'replaceIDB\'"></input>\n      <input type="radio" value="newIDB" name="saveType" checked.bind="saveAs"><label for="newIDB">New IDB</label>\n      <input type="radio" value="newFile" name="saveType" checked.bind="saveAs"><label for="newFile">New File</label><br />\n    </ux-dialog-body>\n    <ux-dialog-footer>\n      <button click.delegate="done()">Commit</button>\n      <button click.trigger="controller.cancel()">Cancel</button>\n    </ux-dialog-footer>\n  </ux-dialog>\n</template>\n'},"resources/elements/typeFields/selector.html":function(e,t){e.exports='<template bindable="field">\n  <div>\n    \x3c!--! radio button visibility not working yet --\x3e\n    <input type="radio" class="labelLinked" id="edit_of_${field.name}">\n    <label for="edit_of_${field.name}">${field.name}</label>\n    <p>\n    Type: <span class="NYI">${field.type}</span><br/>\n    SubType: <span class="NYI">${field.subtype}</span><br/>\n    ValidationFunction: <span class="NYI">${field.description}</span>\n    </p>\n  </div>\n</template>\n'},"resources/index":function(e,t,n){"use strict";function i(e){e.globalResources(["resources/value-converters/objectValues","resources/value-converters/objectKeys"])}n.r(t),n.d(t,"configure",(function(){return i}))},"resources/value-converters/objectKeys":function(e,t,n){"use strict";n.r(t),n.d(t,"ObjectKeysValueConverter",(function(){return i}));var i=function(){function e(){}return e.prototype.toView=function(e){return e?Object.keys(e):[]},e}()},"resources/value-converters/objectValues":function(e,t,n){"use strict";n.r(t),n.d(t,"ObjectValuesValueConverter",(function(){return i}));var i=function(){function e(){}return e.prototype.toView=function(e){return e?Object.values(e):[]},e}()},"resources/viewElements/contentPropertyLine.html":function(e,t){e.exports='<template bindable="prop, type, editor, validator">\n  ${prop.$name} - ${prop.$type}\n  <input type="text" value.bind="editor.CIEdit[prop.$name]"></input>\n  <input type="checkbox" checked.bind="validator(editor.CIEdit[prop.$name], type.$validator)">\n</template\n'},"resources/viewSections/typeEditor.html":function(e,t){e.exports='<template bindable="type, subTypeOf">\n  <h5>\n    Edit Type: ${type.$name}\n    <span if.bind="subTypeOf">\n      &nbsp;&nbsp;\n      sub of: ${subTypeOf}\n    </span>\n  </h5>\n  Description: <input type="text" value.bind="type.$description"\n  Validator Function:<input type="text" value.bind="type.$validator">\n  <div if.bind="type.$subTypes">\n    <p repeat.for="subT of type.$subTypes | objectValues">${subT.$name}</p>\n  </div>\n</template>\n'}},[[0,2,4,3,6,5,7,8]]]);
//# sourceMappingURL=app~f075b844.b5608bc6d51a1747b850.bundle.map