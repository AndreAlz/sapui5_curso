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
      configurationInit: function (oEvent) {
        var dataModelo = {
          data: [
            {
              usuario: "aalzamora",
              correo: "aalzamora@csticorp.biz",
              fechaCreacion: "15/11/2020 19:00:00pm",
              nombre: "Andre Alzamora",
              telefono: "945105134",
            },
            {
              usuario: "aalzamora",
              correo: "aalzamora@csticorp.biz",
              fechaCreacion: "15/11/2020 19:00:00pm",
              nombre: "Andre Alzamora",
              telefono: "945105134",
            },
            {
              usuario: "aalzamora",
              correo: "aalzamora@csticorp.biz",
              fechaCreacion: "15/11/2020 19:00:00pm",
              nombre: "Andre Alzamora",
              telefono: "945105134",
            },
          ],
        };
        var model = new JSONModel(dataModelo);
        oView.setModel(model, "modelData");
      },
      onItemPress: function (oEvent) {
        var row = oEvent.getSource();
        var register = row.getBindingContext("modelData");
        var data = register.getObject();
        MessageBox.show(JSON.stringify(data, null, 2), {
          title: "Data del modelo",
        });
      },
      onButtonRowPress: function (oEvent) {
        var btn = oEvent.getSource();
        var row = btn.getParent();
        var register = row.getBindingContext("modelData");
        var data = register.getObject();
        MessageBox.show(JSON.stringify(data, null, 2), {
          title: "Data del modelo",
        });
      },
      onGo: function (oEvent) {
        oRouter.navTo("gridtable");
      },
    });
  }
);
