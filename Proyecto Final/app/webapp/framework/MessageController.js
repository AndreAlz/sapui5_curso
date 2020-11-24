sap.ui.define(
  ["sap/m/MessageBox", "sap/ui/core/Fragment", "sap/ui/model/json/JSONModel"],
  function (MessageBox, Fragment, JSONModel) {
    "use strict";
    return {
      sendMessage: function (type, message, arrActions, closeCallback) {
        var titulo = "";
        switch (type) {
          case "error":
            titulo = "Mensaje de Error";
            break;
          case "warning":
            titulo = "Mensaje de Alerta";
            break;
          case "information":
            titulo = "Mensaje de Informacion";
            break;
          case "confirm":
            titulo = "Mensaje de Confirmacion";
            break;
          case "success":
            titulo = "Mensaje de Exito";
            break;
        }
        closeCallback =
          closeCallback === undefined
            ? null
            : closeCallback === null
            ? null
            : closeCallback;
        arrActions =
          arrActions === undefined
            ? null
            : arrActions === null
            ? null
            : arrActions;
        var settings = {
          title: titulo,
          onClose: (data) => {
            if (closeCallback !== null) {
              closeCallback(data);
            }
          },
        };
        if (arrActions !== null) {
          settings.actions = arrActions;
        }
        sap.m.MessageBox[type](message, settings);
      },
      openFragment: function (path, id, context, payload, modelName) {
        var oView = context.getView();
        payload =
          payload === undefined ? null : payload === null ? null : payload;

        if (!oView.byId(id)) {
          Fragment.load({
            id: oView.getId(),
            name: path,
            controller: context,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            if (payload !== null) {
              oDialog.setModel(new JSONModel(payload), modelName);
            }
            oDialog.open();
          });
        } else {
          var oDialog = oView.byId(id);
          if (payload !== null) {
            oDialog.setModel(new JSONModel(payload), modelName);
          }
          oDialog.open();
        }
      },
    };
  }
);
