sap.ui.define(
  //Arreglo de librerias
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/core/Fragment"], //siempre presente
  function (Controller, MessageBox, Fragment) {
    var that = null;
    var oView = null;
    var oRouter = null;
    return Controller.extend("curso.frontend.controller.MD.MD", {
      onInit: function () {
        that = this;
        oView = this.getView();
        oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("md")
          .attachPatternMatched(this.configurationInit, this);
      },
      configurationInit: function (oEvent) {
        console.log("MD");
      },
      goMasterPage: function (oEvent) {
        oView.byId("sa_contenedor").toMaster(this.createId("subnav"));
      },
      onNavBackMaster: function (oEvent) {
        oView.byId("sa_contenedor").backMaster();
      },
      onNavDetail: function (ruta) {
        oView.byId("sa_contenedor").toDetail(this.createId(ruta));
        if (ruta === "noInfo") {
          oView.byId("sa_contenedor").toMaster(this.createId("generalnav"));
        }
      },
    });
  }
);
