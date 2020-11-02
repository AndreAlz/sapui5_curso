sap.ui.define(
  //Arreglo de librerias
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], //siempre presente
  function (Controller, JSONModel) {
    var that = null;
    var oView = null;
    var oRouter = null;
    return Controller.extend("curso.frontend.controller.Formulario", {
      onInit: function () {
        that = this;
        oView = this.getView();
        oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter
          .getRoute("formulario")
          .attachPatternMatched(this.configurationInit, this);
      },
      irMain: function () {
        oRouter.navTo("main");
      },
      configurationInit: function (oEvent) {
        console.log("Formulario: Ejecutado despues de entrar a la vista");
        var DeviceModel = oView.getModel("device").getData();
        console.log(DeviceModel);
        var configuration;
        if (DeviceModel.system.phone) {
          configuration = {
            formVisible: false,
            formularioContenedor: {
              componentWidth: "150px",
              label: "100px",
              dirContenedorPrincipal: "Column",
              dirColumns: "Column",
            },
          };
        } else {
          configuration = {
            formVisible: true,
            formularioContenedor: {
              componentWidth: "250px",
              label: "250px",
              dirContenedorPrincipal: "Row",
              dirColumns: "Column",
            },
          };
        }

        var modelConfigurarion = new JSONModel(configuration);
        oView.setModel(modelConfigurarion, "config");
      },
      onVerFormulario: function () {
        var model = oView.getModel("config");
        var data = model.getData();
        model.setProperty("/formVisible", data.formVisible ? false : true);
      },
      onCambiarSize: function () {
        var model = oView.getModel("config");
        var data = model.getData();
        model.setProperty(
          "/formularioContenedor/componentWidth",
          data.formularioContenedor.componentWidth === "250px"
            ? "400px"
            : "250px"
        );
        model.setProperty(
          "/formularioContenedor/label",
          data.formularioContenedor.label === "250px" ? "400px" : "250px"
        );
      },
      onCambiarDir: function () {
        var model = oView.getModel("config");
        var data = model.getData();
        model.setProperty(
          "/formularioContenedor/dirContenedorPrincipal",
          data.formularioContenedor.dirContenedorPrincipal === "Row"
            ? "Column"
            : "Row"
        );
      },
    });
  }
);
