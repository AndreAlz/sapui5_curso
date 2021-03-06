sap.ui.define(
  //Arreglo de librerias
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/core/Fragment"], //siempre presente
  function (Controller, MessageBox, Fragment) {
    var that = null;
    var oView = null;
    var oRouter = null;
    return Controller.extend("curso.frontend.controller.Main", {
      onInit: function () {
        that = this;
        oView = this.getView();
        oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("main")
          .attachPatternMatched(this.configurationInit, this);
      },
      configurationInit: function (oEvent) {},
      goMasterDetail: function (oEvent) {
        oRouter.navTo("md");
      },
      goToolBarPage: function (oEvent) {
        oRouter.navTo("tbp");
      },
    });
  }
);
