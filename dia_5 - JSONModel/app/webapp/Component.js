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
        var profile = i18nModel.getProperty("profile");
        if (profile !== undefined) {
          var i18nModelCurrentProfile = new ResourceModel({
            bundleName: "curso.frontend.i18n.i18n",
            locale: profile,
          });
          this.setModel(i18nModelCurrentProfile, "i18n");
        } else {
          console.log(profile !== undefined)
          this.setModel(i18nModel, "i18n");
        }

        // set device model
        var oDeviceModel = new JSONModel(Device);
        this.setModel(oDeviceModel, "device");
      },
    });
  }
);
