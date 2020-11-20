sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
  ],
  function (Controller, JSONModel, Fragment, MessageBox, Filter) {
    var that = null;
    var oView = null;
    return Controller.extend("curso.frontend.controller.Main", {
      onInit: function () {
        that = this;
        oView = this.getView();
      },
    });
  }
);
