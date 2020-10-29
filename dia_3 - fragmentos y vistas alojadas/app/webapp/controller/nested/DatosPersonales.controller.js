sap.ui.define(
  //Arreglo de librerias
  ["sap/ui/core/mvc/Controller"], //siempre presente
  function (Controller) {
    var that = null;
    var oView = null;
    var oRouter = null;
    return Controller.extend(
      "curso.frontend.controller.nested.DatosPersonales",
      {
        onInit: function () {
          that = this;
          oView = this.getView();
          oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          this.configurationInit();
        },
        configurationInit: function (oEvent) {
          console.log(
            "Datos Personales: Ejecutado despues de entrar a la vista"
          );
        },
        getNombreCompleto: function () {
          return oView.byId("in_dp_nombre_completo").getValue();
        },
      }
    );
  }
);
