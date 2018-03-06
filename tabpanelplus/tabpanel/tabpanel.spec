{
    "name": "tabpanelplus-tabpanel",
    "displayName": "Tab Panel Plus",
	"version": 1,
	"icon": "tabpanelplus/tabpanel/tab.png",
    "definition": "tabpanelplus/tabpanel/tabpanel.js",
    "serverscript": "tabpanelplus/tabpanel/tabpanel_server.js",
	"libraries": [{"name":"accordionpanel", "version":"1", "url":"tabpanelplus/tabpanel/accordionpanel.css", "mimetype":"text/css"}],
	"model":
	{
	        "background" : "color", 
	        "borderType" : {"type":"border","stringformat":true}, 
	        "closeIconStyleClass" : {"type":"styleclass", "default":"fa fa-times close-icon", "tags": { "scope" :"design" }, "values":[]},
	        "enabled" : { "type": "enabled", "blockingOn": false, "default": true, "for": ["onChangeMethodID","onTabChangeMethodID"] }, 
	        "fontType" : {"type":"font","stringformat":true}, 
	        "foreground" : "color", 
	        "horizontalAlignment" : {"type" :"int", "tags": { "scope" :"design" }, "values" :[{"LEFT":2}, {"CENTER":0},{"RIGHT":4}],"default" : -1}, 
	        "location" : "point", 
	        "readOnly" : { "type": "protected", "for": ["onChangeMethodID","onTabChangeMethodID"] }, 
	        "selectedTabColor" : "color", 
	        "size" : {"type" :"dimension",  "default" : {"width":300, "height":300}}, 
	        "styleClass" : { "type" :"styleclass", "tags": { "scope" :"design" }, "values" :[]}, 
	        "tabIndex" : { "type": "object", "pushToServer": "shallow" }, 
	        "tabSeq" : {"type" :"tabseq", "tags": { "scope" :"design" }}, 
	        "tabs" : {"type":"tab[]", "pushToServer": "shallow", "droppable":true}, 
	        "transparent" : "boolean", 
	        "visible" : "visible",
			"activeTabIndex": { "type": "int", "default": 0, "tags": { "scope": "private" }, "pushToServer": "shallow" }
	},
	"handlers":
	{
	        "onChangeMethodID" : {
	         	
	        	"parameters":[
								{
						          "name":"previousIndex",
								  "type":"int"
								}, 
								{
						          "name":"event",
								  "type":"JSEvent"
								} 
							 ]
	        } 
	},
	"api":
	{
	        "addTab": {
	            "returns": "boolean",
				"parameters":[
								{                                                                 
 								"name":"form/formname",
								"type":"object []"
			                	},
             					{                                                                 
 								"name":"name",
								"type":"object",
			            		"optional":true
			            		},
             					{                                                                 
 								"name":"tabText",
								"type":"object",
			            		"optional":true
			            		},
             					{                                                                 
 								"name":"tooltip",
								"type":"object",
			            		"optional":true
			            		},
             					{                                                                 
 								"name":"iconURL",
								"type":"object",
			            		"optional":true
			            		},
             					{                                                                 
 								"name":"fg",
								"type":"object",
			            		"optional":true
			            		},
             					{                                                                 
 								"name":"bg",
								"type":"object",
			            		"optional":true
			            		},
             					{                                                                 
 								"name":"relatedfoundset/relationname",
								"type":"object",
			            		"optional":true
			            		},
             					{                                                                 
 								"name":"index",
								"type":"object",
			            		"optional":true
			            		}             
							 ]
	
	        },
	        "getFormName": {
	            "returns": "string"
	        },
	        "getHeight": {
	            "returns": "int"
	        },
	        "getLocationX": {
	            "returns": "int"
	        },
	        "getLocationY": {
	            "returns": "int"
	        },
	        "getMaxTabIndex": {
	            "returns": "int"
	        },
	        "getMnemonicAt": {
	            "returns": "string",
				"parameters":[
								{                                                                 
 								"name":"i",
								"type":"int"
			                	}             
							 ]
	
	        },
	        "getSelectedTabFormName": {
	            "returns": "string"
	        },
	        "getTabBGColorAt": {
	            "returns": "string",
				"parameters":[
								{                                                                 
 								"name":"unnamed_0",
								"type":"int"
			                	}             
							 ]
	
	        },
	        "getTabFGColorAt": {
	            "returns": "string",
				"parameters":[
								{                                                                 
 								"name":"i",
								"type":"int"
			                	}             
							 ]
	
	        },
	        "getTabFormNameAt": {
	            "returns": "string",
				"parameters":[
								{                                                                 
 								"name":"i",
								"type":"int"
			                	}             
							 ]
	
	        },
	        "getTabNameAt": {
	            "returns": "string",
				"parameters":[
								{                                                                 
 								"name":"i",
								"type":"int"
			                	}             
							 ]
	
	        },
	        "getTabRelationNameAt": {
	            "returns": "string",
				"parameters":[
								{                                                                 
 								"name":"i",
								"type":"int"
			                	}             
							 ]
	
	        },
	        "getTabTextAt": {
	            "returns": "string",
				"parameters":[
								{                                                                 
 								"name":"i",
								"type":"int"
			                	}             
							 ]
	
	        },
	        "getWidth": {
	            "returns": "int"
	        },
	        "indexOf" : {
	        	"parameters" : [
	        					{
	        					"name":"form/formname",
	        					"type":"object"
	        					}
	        				],
	        	"returns" : "int"
	        },
	        "isTabEnabled": {
	            "returns": "boolean",
				"parameters":[
								{                                                                 
 								"name":"unnamed_0",
								"type":"int"
			                	}             
							 ]
	
	        },
	        "isTabEnabledAt": {
	            "returns": "boolean",
				"parameters":[
								{                                                                 
 								"name":"i",
								"type":"int"
			                	}             
							 ]
	
	        },
	        "removeAllTabs": {
	            "returns": "boolean"
	        },
	        "removeTabAt": {
	            "returns": "boolean",
				"parameters":[
								{                                                                 
 								"name":"index",
								"type":"int"
			                	}             
							 ]
	
	        },
	        "setMnemonicAt": {
				"parameters":[
								{                                                                 
 								"name":"index",
								"type":"int"
			                	},
             					{                                                                 
 								"name":"text",
								"type":"string"
			                	}             
							 ]
	
	        },
	        "setTabBGColorAt": {
				"parameters":[
								{                                                                 
 								"name":"unnamed_0",
								"type":"int"
			                	},
             					{                                                                 
 								"name":"unnamed_1",
								"type":"string"
			                	}             
							 ]
	
	        },
	        "setTabEnabled": {
				"parameters":[
								{                                                                 
 								"name":"unnamed_0",
								"type":"int"
			                	},
             					{                                                                 
 								"name":"unnamed_1",
								"type":"boolean"
			                	}             
							 ]
	
	        },
	        "setTabEnabledAt": {
				"parameters":[
								{                                                                 
 								"name":"i",
								"type":"int"
			                	},
             					{                                                                 
 								"name":"b",
								"type":"boolean"
			                	}             
							 ]
	
	        },
	        "setTabFGColorAt": {
				"parameters":[
								{                                                                 
 								"name":"i",
								"type":"int"
			                	},
             					{                                                                 
 								"name":"s",
								"type":"string"
			                	}             
							 ]
	
	        },
	        "setTabTextAt": {
				"parameters":[
								{                                                                 
 								"name":"index",
								"type":"int"
			                	},
             					{                                                                 
 								"name":"text",
								"type":"string"
			                	}             
							 ]
	
	        }
	},
"types": {
  "tab": {
  		"name": "string",
  		"containsFormId": "form",
  		"text": "tagstring",
  		"relationName": "relation",
  		"active": "boolean",
  		"foreground": "color",
  		"disabled": "boolean",
  		"imageMediaID": "media",
  		"mnemonic": "string",
  		"showCloseIcon": "boolean",
		"isActive": { "type": "boolean", "default": false, "tags": { "scope": "private" }, "pushToServer": "shallow" }
  	}
}
	 
}