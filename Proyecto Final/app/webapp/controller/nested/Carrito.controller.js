sap.ui.define(
  [
    "../../framework/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
  ],
  function (BaseController, JSONModel, Filter) {
    var that = null;
    var oView = null;
    return BaseController.extend("curso.frontend.controller.nested.Carrito", {
      onInit: function () {
        that = this;
        oView = this.getView();
        this.initBase("carrito", this);
      },
      onBuscarProdPendiente: function (oEvent) {
        var sf = oEvent.getSource();
        var value = sf.getValue();
        console.log(value);
        var table = oView.byId("tb_prod_pendientes");
        var items = table.getBinding("items");
        console.log(items);
        var filtrosArr = [];
        if (items !== undefined) {
          if (value.length === 0) {
            items.filter(null);
          } else {
            var filter1 = new Filter(
              "titulo",
              sap.ui.model.FilterOperator.Contains,
              value
            );
            filtrosArr.push(filter1);
            var filter2 = new Filter(
              "marca",
              sap.ui.model.FilterOperator.Contains,
              value
            );
            filtrosArr.push(filter2);
            var filter = new Filter({
              filters: filtrosArr,
              and: false,
            });
            items.filter(filter);
          }
        }
      },
    });
  }
);
