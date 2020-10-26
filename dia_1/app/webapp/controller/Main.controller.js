sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";
  return Controller.extend("curso.frontend.controller.Main", {
    onInit: function () {
      console.log("Impreso desde el controlador JS");
    },
  });
});
