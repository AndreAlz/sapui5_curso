sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
  ],
  function (Controller, MessageBox, Fragment, JSONModel) {
    var that = null;
    var oView = null;
    var oRouter = null;
    var URL_SERVICE = "https://cursosapui.cfapps.us10.hana.ondemand.com";
    var tipo = "ajax";
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
        if (tipo === "fetch") {
          fetch(`${URL_SERVICE}/getRequest`, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
            .then((res) => {
              console.log("PROMESA DE DATA");
              console.log(res);
              return res.json();
            })
            .then((data) => {
              console.log("data Obtenida");
              console.log(data);
              sap.m.MessageToast.show(data.mensaje);
              oView.setModel(new JSONModel(data), "dataModel");
            });
        } else {
          var dataRequest = jQuery.ajax({
            type: "GET",
            contentType: "application/json",
            url: `${URL_SERVICE}/getRequest`,
            dataType: "json",
            beforeSend: function () {
              console.log("Antes de ejecutar");
            },
            success: function (data, textStatus, jqXHR) {
              console.log("data Obtenida");
              console.log(data);
              sap.m.MessageToast.show(data.mensaje);
              oView.setModel(new JSONModel(data), "dataModel");
            },
            complete: function () {
              console.log("Al terminar");
            },
          });
        }
      },
      onDialogClose: function (oEvent) {
        var dialog = oEvent.getSource().getParent();
        this.limpiarForm();
        dialog.close();
      },
      limpiarForm: function (oEvent) {
        var arrInputs = [
          "dg_nombre",
          "dg_edad",
          "dg_nacionalidad",
          "dg_telefono",
          "dg_correo",
        ];
        arrInputs.forEach((i) => {
          oView.byId(i).setValue("");
        });
      },
      onAgregar: function (oEvent) {
        if (!oView.byId("dg_agregar")) {
          Fragment.load({
            id: oView.getId(),
            name: "curso.frontend.fragments.Agregar",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            oDialog.open();
          });
        } else {
          var oDiaglo = oView.byId("dg_agregar");
          oDiaglo.open();
        }
      },

      onGuardar: function () {
        var objPost = {
          nombre: oView.byId("dg_nombre").getValue(),
          edad: oView.byId("dg_edad").getValue(),
          nacionalidad: oView.byId("dg_nacionalidad").getValue(),
          telefono: oView.byId("dg_telefono").getValue(),
          correo: oView.byId("dg_correo").getValue(),
        };
        if (tipo === "fetch") {
          fetch(`${URL_SERVICE}/postRequest`, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(objPost),
          })
            .then((res) => {
              console.log("PROMESA DE DATA");
              console.log(res);
              return res.json();
            })
            .then((data) => {
              console.log("data Obtenida");
              console.log(data);
              sap.m.MessageToast.show(data.mensaje);
            });
        } else {
          jQuery.ajax({
            type: "POST",
            contentType: "application/json",
            url: `${URL_SERVICE}/postRequest`,
            dataType: "json",
            data: JSON.stringify(objPost),
            beforeSend: function () {
              console.log("Antes de ejecutar");
            },
            success: function (data, textStatus, jqXHR) {
              console.log("data Obtenida");
              console.log(data);
              sap.m.MessageToast.show(data.mensaje);
            },
            complete: function () {
              console.log("Al terminar");
            },
          });
        }
      },
      onEliminar: function (oEvent) {
        var objDelete = oEvent
          .getSource()
          .getParent()
          .getBindingContext("dataModel")
          .getObject();
        if (tipo === "fetch") {
          fetch(`${URL_SERVICE}/deleteRequest`, {
            method: "DELETE",
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(objDelete),
          })
            .then((res) => {
              console.log("PROMESA DE DATA");
              console.log(res);
              return res.json();
            })
            .then((data) => {
              console.log("data Obtenida");
              console.log(data);
              sap.m.MessageToast.show(data.mensaje);
            });
        } else {
          jQuery.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: `${URL_SERVICE}/deleteRequest`,
            dataType: "json",
            data: JSON.stringify(objDelete),
            beforeSend: function () {
              console.log("Antes de ejecutar");
            },
            success: function (data, textStatus, jqXHR) {
              console.log("data Obtenida");
              console.log(data);
              sap.m.MessageToast.show(data.mensaje);
            },
            complete: function () {
              console.log("Al terminar");
            },
          });
        }
      },
      onActualizar: function (oEvent) {
        var objUpdate = oEvent
          .getSource()
          .getParent()
          .getBindingContext("dataModel")
          .getObject();
        this.objUpdate = objUpdate;
        if (!oView.byId("dg_agregar")) {
          Fragment.load({
            id: oView.getId(),
            name: "curso.frontend.fragments.Agregar",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            oDialog.open();
          });
        } else {
          var oDiaglo = oView.byId("dg_agregar");
          oDiaglo.open();
        }
      },
      onEditarRegister: function (oEvent) {
        var objToUpdate = {
          nombre: oView.byId("dg_nombre").getValue(),
          edad: oView.byId("dg_edad").getValue(),
          nacionalidad: oView.byId("dg_nacionalidad").getValue(),
          telefono: oView.byId("dg_telefono").getValue(),
          correo: oView.byId("dg_correo").getValue(),
          id: that.objUpdate.id,
        };
        if (tipo === "fetch") {
          fetch(`${URL_SERVICE}/putRequest`, {
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(objToUpdate),
          })
            .then((res) => {
              console.log("PROMESA DE DATA");
              console.log(res);
              return res.json();
            })
            .then((data) => {
              console.log("data Obtenida");
              console.log(data);
              sap.m.MessageToast.show(data.mensaje);
            });
        } else {
          jQuery.ajax({
            type: "PUT",
            contentType: "application/json",
            url: `${URL_SERVICE}/putRequest`,
            dataType: "json",
            data: JSON.stringify(objToUpdate),
            beforeSend: function () {
              console.log("Antes de ejecutar");
            },
            success: function (data, textStatus, jqXHR) {
              console.log("data Obtenida");
              console.log(data);
              sap.m.MessageToast.show(data.mensaje);
            },
            complete: function () {
              console.log("Al terminar");
            },
          });
        }
      },
    });
    z;
  }
);
