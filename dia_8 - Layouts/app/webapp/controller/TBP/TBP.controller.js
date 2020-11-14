sap.ui.define(
  //Arreglo de librerias
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/core/Fragment"], //siempre presente
  function (Controller, MessageBox, Fragment) {
    var that = null;
    var oView = null;
    var oRouter = null;
    return Controller.extend("curso.frontend.controller.TBP.TBP", {
      onInit: function () {
        that = this;
        oView = this.getView();
        oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("tbp")
          .attachPatternMatched(this.configurationInit, this);
      },
      configurationInit: function (oEvent) {
        console.log("TBP");
      },
      onItemSelect: function (oEvent) {
        var oItem = oEvent.getParameter("item");
        oView.byId("pageContainer").to(oView.createId(oItem.getKey()));
      },
    });
  }
);
