sap.ui.define(
  //Arreglo de librerias
  ["sap/ui/core/mvc/Controller"], //siempre presente
  function (Controller) {
    var that = null;
    var oView = null;
    var oRouter = null;
    return Controller.extend("curso.frontend.controller.Main", {
      onInit: function () {
        that = this;
        oView = this.getView();
        console.log("Main: Impreso desde el controlador JS");
        oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("main")
          .attachPatternMatched(this.configurationInit, this);
      },
      configurationInit: function (oEvent) {
        console.log("Main: Ejecutado despues de entrar a la vista");
      },
      changeInputValueState: function (oEvent) {
        var input = oEvent.getSource();
        var valor = input.getValue();
        if (valor === "") {
          input.setValueState("Warning");
          input.setValueStateText("El valor del input fue eliminado");
        } else {
          input.setValueState("Information");
          input.setValueStateText("El input fue llenado con el valor " + valor);
        }
      },
      irVistaDatos: function () {
        oRouter.navTo("datos", {
          id: 1,
          optional: 2,
          query: { text: "Texto_query", curso: "SAPUI5" },
        });
      },
    });
  }
);
