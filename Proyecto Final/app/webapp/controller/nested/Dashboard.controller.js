sap.ui.define(
  [
    "../../framework/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
  ],
  function (BaseController, JSONModel, Filter) {
    var that = null;
    var oView = null;
    return BaseController.extend("curso.frontend.controller.nested.Dashboard", {
      onInit: function () {
        that = this;
        oView = this.getView();
        this.initBase("dashboard", this);
        var modelPedidos = this.getOwnerComponent().getModel("modelCarrito");
        if (modelPedidos !== undefined) {
          var data = modelPedidos.getData();
          console.log("modelPedidos");
          console.log(data);
        }

        var vizColumn = oView.byId("viz_column");
        vizColumn.setVizProperties({
          title: {
            text: "Productos / Cant. Pedidos",
          },
          categoryAxis: {
            title: {
              text: "Productos Tec",
            },
          },
          valueAxis: {
            title: {
              text: "Cant. Pedido",
            },
          },
        });
        var vizDonut = oView.byId("viz_donut");
        vizDonut.setVizProperties({
          title: {
            text: "Productos / Stock",
          },
          plotArea: {
            colorPalette: ["#3bffdb", "#ff7441", "#f56eff"],
            drawingEffect: "glossy",
            dataLabel: {
              visible: true,
              type: "value",
            },
          },
        });
      },
    });
  }
);
