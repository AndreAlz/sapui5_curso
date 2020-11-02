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
        var dataModel1 = {
          inputsEnabled: false,
          textValue1: "Texto entregado desde el Modelo",
          textValue2: "Data binding propiedad Path",
          textValue3: "Texto si Formato",
          listaDesordenada: [
            { key: 2, nombre: "Valor2" },
            { key: 3, nombre: "Valor3" },
            { key: 1, nombre: "Valor1" },
            { key: 4, nombre: "Valor1" },
          ],
        };
        var oModel1 = new JSONModel(dataModel1);
        //Disponible para toda la VISTA MAIN
        oView.setModel(oModel1, "model1");
        var dataModel2 = {
          modelCambiado: true,
          textValue: "El curso es sobre SAPUI5",
        };
        var oModel2 = new JSONModel(dataModel2);
        //Cambiamos el tipo de binding
        oModel2.setDefaultBindingMode(BindingMode.OneTime);
        //Disponible para toda la VISTA MAIN
        oView.setModel(oModel2, "model2");
      },
      formatterData: function (value) {
        return `${value} desde el formatter`;
      },
      onActiarPress: function (oEvent) {
        var oModel1 = oView.getModel("model1");
        var data = oModel1.getData();
        oModel1.setProperty(
          "/inputsEnabled",
          data.inputsEnabled ? false : true
        );
      },
      onVerData: function (oEvent) {
        var oModel1 = oView.getModel("model1");
        var data1 = oModel1.getData();
        var oModel2 = oView.getModel("model2");
        var data2 = oModel2.getData();
        var dataModelFragment = { data1, data2 };
        var oModelFragment = new JSONModel(dataModelFragment);
        console.log(data1, data2);
        if (!oView.byId("dialogTexto")) {
          Fragment.load({
            id: oView.getId(),
            name: "curso.frontend.fragments.Mensaje",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            oDialog.setModel(oModelFragment, "modelf");
            oDialog.open();
          });
        } else {
          var oDialog = oView.byId("dialogTexto");
          oDialog.setModel(oModelFragment, "modelf");
          oDialog.open();
        }
      },
      formatterJson: function (value) {
        return JSON.stringify(value, null, 2);
      },
      onDialogClose: function (oEvent) {
        oEvent.getSource().getParent().close();
      },
      onCambiarOneWay: function (oEvent) {
        var oModel = oView.getModel("model2");
        var data = oModel.getData();
        oModel.setProperty("/modelCambiado", data.modelCambiado ? false : true);
        oModel.setProperty(
          "/textValue",
          data.modelCambiado ? "El curso es sobre SAPUI5" : "ONETIME!"
        );
        sap.m.MessageToast.show("El modelo 2 fue cabiado exitosamente!", {
          at: "center center",
        });
      },
      onNavegar: function (oEvent) {
        var oModel1 = oView.getModel("model1");
        sap.ui.getCore().setModel(oModel1, "appmodel1");
        var oModel2 = oView.getModel("model2");
        this.getOwnerComponent().setModel(oModel2, "appmodel2");
        oRouter.navTo("datos");
      },
    });
  }
);
