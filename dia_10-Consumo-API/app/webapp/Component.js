sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
  ],
  function (UIComponent, ResourceModel, Device, JSONModel) {
    "use strict";

    return UIComponent.extend("curso.frontend.Component", {
      metadata: {
        manifest: "json",
      },
      init: function () {
        UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();
        var i18nModel = new ResourceModel({
          bundleName: "curso.frontend.i18n.i18n",
        });

        // set device model
        var oDeviceModel = new JSONModel(Device);
        this.setModel(oDeviceModel, "device");

        this.setModel(i18nModel, "i18n");
      },
    });
  }
);
