sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/BindingMode",
    "sap/ui/core/Fragment",
  ],
  function (Controller, JSONModel, BindingMode, Fragment) {
    var that = null;
    var oView = null;
    var oRouter = null;
    return Controller.extend("curso.frontend.controller.Datos", {
      onInit: function () {
        that = this;
        oView = this.getView();
        oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("datos")
          .attachPatternMatched(this.configurationInit, this);
      },
      configurationInit: function (oEvent) {
        var oModel = sap.ui.getCore().getModel("appmodel1");
        if (oModel !== undefined) {
          var dataModel = oModel.getData();
          console.log(dataModel);
        } else {
          oRouter.navTo("main");
        }
      },
      formatterJson: function (value) {
        return JSON.stringify(value, null, 2);
      },
      onRegresar: function () {
        oRouter.navTo("main");
      },
    });
  }
);
