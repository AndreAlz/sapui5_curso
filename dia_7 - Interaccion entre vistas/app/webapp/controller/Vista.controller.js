sap.ui.define(
  //Arreglo de librerias
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/core/Fragment"], //siempre presente
  function (Controller, MessageBox, Fragment) {
    var that = null;
    var oView = null;
    var oRouter = null;
    return Controller.extend("curso.frontend.controller.Vista", {
      onInit: function () {
        that = this;
        oView = this.getView();
        oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("vista")
          .attachPatternMatched(this.configurationInit, this);
      },
      configurationInit: function (oEvent) {
        var tipoSol = oEvent.getParameters().arguments.tiposol;
        var codigosol = oEvent.getParameters().arguments.codigosol;
        console.log(codigosol);
        var dataFormularioModel = sap.ui.getCore().getModel("dataFormulario");
        if (dataFormularioModel === undefined) {
          MessageBox.show(
            `El tipo de solicitud es ${
              tipoSol === "1" ? "General" : "Traslado"
            } y el codigo es ${codigosol !== undefined ? codigosol : "NULO"}`
          );
        } else {
          var data = dataFormularioModel.getData();
          MessageBox.show(
            `El tipo de solicitud es ${
              tipoSol === "1" ? "General" : "Traslado"
            }\n la data enviada es: \n ${JSON.stringify(data, null, 2)}`
          );
        }
      },
    });
  }
);
