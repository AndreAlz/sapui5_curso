sap.ui.define(
  [
    "../../framework/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment",
  ],
  function (BaseController, JSONModel, Filter, Fragment) {
    var that = null;
    var oView = null;
    return BaseController.extend(
      "curso.frontend.controller.nested.Mantenimiento",
      {
        onInit: function () {
          that = this;
          oView = this.getView();
          this.initBase("mantenimiento", this);
        },
        onEditarProd: function (oEvent) {
          var src = oEvent.getSource(),
            row = src.getParent(),
            data = row.getBindingContext("mProductos").getObject();
          console.log(data);
          var model = new JSONModel(data);
          if (!oView.byId("dg_editar_prod")) {
            Fragment.load({
              id: oView.getId(),
              name: "curso.frontend.fragments.EditarProd",
              controller: this,
            }).then(function (oDialog) {
              oView.addDependent(oDialog);
              oDialog.setModel(model, "selectedEditarProd");
              oDialog.open();
            });
          } else {
            var oDialog = oView.byId("dg_editar_prod");
            oDialog.setModel(model, "selectedEditarProd");
            oDialog.open();
          }
        },
        onCerrarDialog: function (oEvent) {
          oEvent.getSource().getParent().close();
        },
        onGuardar: function (oEvent) {
          var dialog = oEvent.getSource().getParent(),
            model = dialog.getModel("selectedEditarProd"),
            data = model.getData();

          var obj = {
            image: data.image,
            id: data.id,
            titulo: oView.byId("in_titulo").getValue(),
            precio: oView.byId("in_precio").getValue(),
            marca: oView.byId("in_marca").getValue(),
            stock: oView.byId("in_stock").getValue(),
          };
          console.log(obj);
          var cProductos = sap.ui.controller(
            "curso.frontend.controller.nested.Productos"
          );
          console.log(cProductos);
          cProductos.updateProductsData(data.id, obj);
        },
      }
    );
  }
);
