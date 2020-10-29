sap.ui.define(
  //Arreglo de librerias
  ["sap/ui/core/mvc/Controller"], //siempre presente
  function (Controller) {
    var that = null;
    var oView = null;
    var oRouter = null;
    return Controller.extend("curso.frontend.controller.Datos", {
      onInit: function () {
        that = this;
        oView = this.getView();
        console.log("Datos: Impreso desde el controlador JS");
        oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("datos")
          .attachPatternMatched(this.configurationInit, this);
      },
      configurationInit: function (oEvent) {
        var parameters = oEvent.getParameters().arguments;
        console.log(parameters);
        var id = oEvent.getParameter("arguments").id;
        console.log(id);
        console.log("Datos: Ejecutado despues de entrar a la vista");
      },
      irMain: function () {
        oRouter.navTo("main");
      },
    });
  }
);
