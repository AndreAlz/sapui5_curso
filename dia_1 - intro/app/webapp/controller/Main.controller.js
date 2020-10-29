sap.ui.define(
  //Arreglo de librerias
  ["sap/ui/core/mvc/Controller"], //siempre presente
  function (Controller) {
    var that = null;
    var oView = null;
    return Controller.extend("curso.frontend.controller.Main", {
      onInit: function () {
        that = this;
        oView = this.getView();
        console.log("Impreso desde el controlador JS");
      },
    });
  }
);
