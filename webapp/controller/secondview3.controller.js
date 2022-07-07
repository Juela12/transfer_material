sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, Fragment, Filter) {
        "use strict";

        return Controller.extend("TransferMaterial.transfermaterial.controller.secondview3", {
            onInit: function () {

            },
            onNavBack3: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
          
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteApp", true);
                }
          
            },
            onReadStorage: function () {

                var oModel = this.getOwnerComponent().getModel();
                var that = this;

                //Do the call to BE and create the data binding model
                oModel.read(`/storageLocation1Set`, {
                    success: function (oData) {
                        var sRequest = new sap.ui.model.json.JSONModel(oData.results);
                        that.getView().setModel(sRequest, "Storage");

                    },
                    error: function (Error) {
                    }
                });
            },
            onReadPlant: function () {

                var oModel = this.getOwnerComponent().getModel();
                var that = this;

                //Do the call to BE and create the data binding model
                oModel.read(`/storageLocation1Set`, {
                    success: function (oData) {
                        var sRequest = new sap.ui.model.json.JSONModel(oData.results);
                        that.getView().setModel(sRequest, "Plant");

                    },
                    error: function (Error) {
                    }
                });
            },
            onValueHelpRequestPlant: function (oEvent) {
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();
                var that = this;

                if (!this._pValueHelpDialogPlant) {
                    this._pValueHelpDialogPlant = Fragment.load({
                        id: oView.getId(),
                        name: "TransferMaterial.transfermaterial.view.fragment.Plant",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._pValueHelpDialogPlant.then(function (oDialog) {
                    that.onReadPlant();
                    oDialog.open(sInputValue);
                });
            },


            onValueHelpSearchPlant: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("Plant", FilterOperator.Contains, sValue);
            },

            onValueHelpClosePlant: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (!oSelectedItem) {
                    return;
                }

                 this.getView().byId("idSourcePlant").setValue(oSelectedItem.getTitle());
            },

            onValueHelpRequestStorage: function (oEvent) {
                var sInputValue = oEvent.getSource().getValue(),
                    oView = this.getView();
                var that = this;
                this.oEventId = oEvent.getSource().sId;

                if (!this._pValueHelpDialogStorage) {
                    this._pValueHelpDialogStorage = Fragment.load({
                        id: oView.getId(),
                        name: "TransferMaterial.transfermaterial.view.fragment.Storage",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._pValueHelpDialogStorage.then(function (oDialog) {
                     that.onReadStorage();
                    oDialog.open(sInputValue);
                });
            },


            onValueHelpSearchStorage: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("Storage", FilterOperator.Contains, sValue);
            },

            onValueHelpCloseStorage: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                if (!oSelectedItem) {
                    return;
                }

                var str1 = this.oEventId;
                if( str1.substring(78, 101) === "idSourceStorageLocation" ){

                    this.getView().byId("idSourceStorageLocation").setValue(oSelectedItem.getTitle());
                this.getView().byId("getDescription").setText(oSelectedItem.getDescription());
                }
                
               else  if ( str1.substring(78, 106) === "idDestinationStorageLocation"){
                    this.getView().byId("idDestinationStorageLocation").setValue(oSelectedItem.getTitle());
                 this.getView().byId("getDescriptionofDestination").setText(oSelectedItem.getDescription());
                }  
            },
            onSave: function () {

                var oModel = this.getOwnerComponent().getModel();
                var oPlant = this.getView().byId("idSourcePlant").getValue();
                var oSourceStorage  = this.getView().byId("idSourceStorageLocation").getValue();
                var oLgobe  = this.getView().byId("getDescription").getText();
                var oSourceStorage2  = this.getView().byId("idDestinationStorageLocation").getValue();
                var oLgobe2 = this.getView().byId("getDescriptionofDestination").getText();
               
               

                var oEntry = {
                    "Werks":oPlant,
                    "Logort":oSourceStorage,
                    "Lgobe":oLgobe,
                    "Logort2":oSourceStorage2,
                    "Lgobe2":oLgobe2  
               
                  

                }

                oModel.create(`/createMaterialSet`, oEntry, {
                    success: function (odata) {
                        MessageBox.success("Created successfully!", {

                        });
                        //oModel.refresh(true);
                    },
                    error: function (error) {
                        MessageBox.error("Error. Failed to create the Material! Please try again later,", {

                        });
                    }
                });

                oModel.refresh(true);

            },
            onClose: function () {
                this.getView().byId("idSourcePlant").setValue('');
                this.getView().byId("idSourceStorageLocation").setValue(''); 
                this.getView().byId("getDescription").setText('');                  
                this.getView().byId("idDestinationStorageLocation").setValue('');
                this.getView().byId("getDescriptionofDestination").setText('');
      

            },

        });
    });