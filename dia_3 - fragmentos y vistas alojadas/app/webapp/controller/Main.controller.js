sap.ui.define(
  //Arreglo de librerias
  ["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/core/Fragment"], //siempre presente
  function (Controller, MessageBox, Fragment) {
    var that = null;
    var oView = null;
    var oRouter = null;
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
        console.log("Main: Ejecutado despues de entrar a la vista");
        var input = oView.byId("in_dp_nombre_completo");
        console.log(input);
      },
      onExtraerDatos: function (oEvent) {
        //Obtenermos el controller de la vista nesteada
        var controllerNestedView = sap.ui.controller(
          "curso.frontend.controller.nested.DatosPersonales"
        );
        //hacemos uso de su metodo getNombreCompleto para obtener el valor ingresado por el usuarios.
        var nombreCompleto = controllerNestedView.getNombreCompleto();
        if (nombreCompleto !== "") {
          MessageBox.show(`El nombre ingresado es ${nombreCompleto}`, {
            title: "Informacion.",
          });
        } else {
          MessageBox.warning(`No se ingreso un valor`, {
            title: "Alerta Campo Vacio",
          });
        }
      },
      onVerFragmento: function () {
        if (!oView.byId("dialogTexto")) {
          Fragment.load({
            id: oView.getId(),
            name: "curso.frontend.fragments.Mensaje",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            oDialog.open();
          });
        } else {
          var oDiaglo = oView.byId("dialogTexto");
          oDiaglo.open();
        }
      },
      onDialogAccept: function () {
        var input = oView.byId("dg_texto");
        console.log(input.getValue());
        MessageBox.show(`El texto ingresado es ${input.getValue()}`, {
          title: "Informacion.",
        });
      },
      onDialogClose: function () {
        oView.byId("dialogTexto").close();
      },
      pressGeneral: function () {
        sap.m.MessageBox.show("Llamado desde un componente creado con JS", {
          title: "informacion",
        });
      },
      onCreateComponent: function () {
        //Arreglo de trabajadores
        var arrTrabajadores = [
          {
            dni: "70352569",
            nombre: "Andre",
            telefono: 945105134,
          },
          { dni: "70352568", nombre: "Samuel", telefono: 987654321 },
        ];
        var VBox = oView.byId("contenedorDinamico");
        for (var i = 0; i < arrTrabajadores.length; i++) {
          var trabajador = arrTrabajadores[i];
          var button = new sap.m.Button({
            text: trabajador.nombre,
            press: function (oEvent) {
              console.log(this); //Con esto podemos hacer uso de las funciones o metodos del componente
              console.log(this.getText());
              that.pressGeneral();
            },
          });
          VBox.addItem(button);
        }
      },
    });
  }
);
