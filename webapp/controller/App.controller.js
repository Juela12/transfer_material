sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("TransferMaterial.transfermaterial.controller.App", {
            onInit: function () {
                // var numberNav = [{
                //     "number": "313"
                // }, {
                //     "number": "315"
                // }, {
                //     "number": "311"
                // }, {
                //     "number": "301"
                // }, {
                //     "number": "309"
                // }, {
                //     "number": "321"
                // }, {
                //     "number": "322"
                // }, {
                //     "number": "325"
                // }, {
                //     "number": "343"
                // }, {
                //     "number": "344"
                // },
                // ]
                // var oModel = new sap.ui.model.json.JSONModel(numberNav);
                // this.getView().setModel(oModel, "Navigation");

            },
            onSecondview: function () {

                this.getOwnerComponent().getRouter().navTo("secondview")

            },
            onSecondview2: function () {

                this.getOwnerComponent().getRouter().navTo("secondview2")

            },
            onSecondview3: function () {

                this.getOwnerComponent().getRouter().navTo("secondview3")

            },

        });
    });
