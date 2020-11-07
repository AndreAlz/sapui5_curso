sap.ui.define(
  //Arreglo de librerias
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
  ], //siempre presente
  function (Controller, MessageBox, Fragment, JSONModel) {
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
      onEnviar: function (oEvent) {
        var nombre = oView.byId("in_nombre").getValue();
        var dni = oView.byId("in_dni").getValue();
        var telefono = oView.byId("in_telefono").getValue();
        var tiposol = oView.byId("cb_tipo_sol").getSelectedKey();
        var dataEnvio = {
          nombre,
          dni,
          telefono,
        };
        var model = new JSONModel(dataEnvio);
        sap.ui.getCore().setModel(model, "dataFormulario");
        oRouter.navTo("vista", {
          tiposol,
          codigosol: Math.random(),
        });
      },
    });
  }
);
