sap.ui.define(
  ["../framework/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    var that = null;
    var oView = null;
    var oRouter = null;
    return BaseController.extend("curso.frontend.controller.Main", {
      onInit: function () {
        that = this;
        oView = this.getView();
        oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this.initBase("main", this);
        oRouter
          .getRoute("main")
          .attachPatternMatched(this.configurationInit, this);
      },
      configurationInit: function (oEvent) {
        var model = new JSONModel({ texto: new Date() });
        oView.setModel(model, "mTest");
      },
      onPress: function () {
        this.msg.openFragment(
          "curso.frontend.fragment.Mensaje",
          "dialogTexto",
          that,
          { datos: "TEST" },
          "mDatos"
        );
      },
      onDialogClose: function (oEvent) {
        var dialog = oEvent.getSource().getParent();
        dialog.close();
      },
    });
  }
);
