sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  function (Controller) {
    var that = null;
    var oView = null;
    return Controller.extend("curso.frontend.controller.Main", {
      onInit: function () {
        that = this;
        oView = this.getView();
      },
    });
  }
);
