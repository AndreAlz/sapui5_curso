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
        console.log(this);
        var vfTotaFecha = oView.byId("vf_tota_fecha");
        var vfCantRegGw = oView.byId("vf_cant_reg_gw");
        var dummyGrafData = {
          totalFecha: {
            data: [
              {
                fecha: "11-10-2020",
                total_reg: 10,
              },
              {
                fecha: "12-10-2020",
                total_reg: 5,
              },
              {
                fecha: "13-10-2020",
                total_reg: 2,
              },
              {
                fecha: "14-10-2020",
                total_reg: 5,
              },
              {
                fecha: "15-10-2020",
                total_reg: 15,
              },
            ],
          },
          totalGw: {
            data: [
              {
                gw: "Zona X",
                total_reg: 25,
              },
              {
                gw: "Zona Y",
                total_reg: 15,
              },
              {
                gw: "Zona Z",
                total_reg: 10,
              },
            ],
          },
        };
        var model = new JSONModel(dummyGrafData);
        oView.setModel(model, "dummyData");
        vfTotaFecha.setVizProperties({
          legend: {
            title: {
              text: "Legenda",
              visible: true,
            },
          },
          title: {
            text: "Cant. Registros por Fecha",
          },
          interaction: {
            enableDeselectAll: true,
          },
          plotArea: {
            dataPoint: {
              stroke: {
                color: "#ff2ef7",
              },
            },
            // colorPalette: ["#ff2ef7"],
            dataLabel: {
              visible: true,
            },
          },
          valueAxis: {
            title: {
              text: "Total de Registro",
            },
          },
          categoryAxis: {
            color: "#3eff25",
            title: {
              text: "Fecha de Registro",
              visible: true,
            },
          },
        });
        vfCantRegGw.setVizProperties({
          title: {
            text: "Cant. Registros por Zona",
          },
          plotArea: {
            dataLabel: {
              visible: true,
            },
          },
        });
      },
      onSelectData: function (oEvent) {
        console.log(oEvent.getParameter("data"));
      },
      onDeselect: function (oEvent) {
        console.log("DESELECT");
        console.log(oEvent.getParameter("data"));
      },
      onRenderComplete: function (oEvent) {
        console.log("onRenderComplete");
      },
    });
  }
);
