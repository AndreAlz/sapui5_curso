sap.ui.define(
  [
    "../../framework/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
  ],
  function (BaseController, JSONModel, Fragment, MessageBox, Filter) {
    var that = null;
    var oView = null;
    return BaseController.extend("curso.frontend.controller.nested.Productos", {
      onInit: function () {
        that = this;
        oView = this.getView();
        this.initBase("productos", this);
        //Simula el cosumo de un SERVICIOS
        this.productosData = [
          {
            image: sap.ui.require.toUrl(
              "curso/frontend/resources/image/prod_1_laptop.jpg"
            ),
            titulo: "Laptop",
            precio: "S/.2500.00",
            marca: "HP",
            stock: 10,
            id: "prod_1",
          },
          {
            image: sap.ui.require.toUrl(
              "curso/frontend/resources/image/prod_1_laptop.jpg"
            ),
            titulo: "MacBook ",
            precio: "S/.3000.00",
            marca: "Apple",
            stock: 10,
            id: "prod_2",
          },
          {
            image: sap.ui.require.toUrl(
              "curso/frontend/resources/image/prod_1_laptop.jpg"
            ),
            titulo: "Notebook",
            precio: "S/.1500.00",
            marca: "HP",
            stock: 150,
            id: "prod_3",
          },
        ];
        this.createContent();
      },
      createContent: function () {
        var reference = this.reference["productos"];
        var modelColumn = reference.getOwnerComponent().getModel("columnData");
        if (modelColumn === undefined) {
          reference
            .getOwnerComponent()
            .setModel(new JSONModel({}), "columnData");
        }

        var modelProductos = new JSONModel(that.productosData);
        reference.getOwnerComponent().setModel(modelProductos, "mProductos");

        //CREACION DINAMICA DE PRODUCTOS
        // HBOX CONTENEDOR PRODUCTOS
        var contenedorProductos = reference
          .getView()
          .byId("h_contenedorProductos");
        console.log(contenedorProductos);
        contenedorProductos.destroyItems();
        reference.rederizarProducto(contenedorProductos, that.productosData);
      },
      updateProductsData: function (id, updateObject) {
        var reference = this.reference["productos"];
        reference.productosData.forEach((prod, index) => {
          if (prod.id === id) {
            that.productosData[index] = updateObject;
          }
        });
        reference.createContent();
      },
      rederizarProducto: function (contenedor, arrProductos, callBack) {
        // Interar en el arreglo de datos
        arrProductos.forEach((item) => {
          console.log("Current Item", item);
          //Crear contenedor VBOX
          var vboxContenedor = new sap.m.VBox({
            alignItems: "Center",
          });
          vboxContenedor.addStyleClass("sapUiSmallMargin");
          //Crear Tile
          var genericTile = new sap.m.GenericTile({
            header: `${item.titulo} + ${item.marca}`,
            subheader: item.precio,
          });

          //Crear TileContent (Default)
          var tileContent = new sap.m.TileContent();
          //Crear ImageContent
          var imageContent = new sap.m.ImageContent({
            src: item.image,
          });

          //agregar imagecontent al tile content
          tileContent.setContent(imageContent);
          genericTile.addTileContent(tileContent);
          //agregar boton
          var boton = new sap.m.Button({
            text: item.stock !== 0 ? "Comprar" : "Agotado",
            type: item.stock !== 0 ? "Accept" : "Critical",
            enabled: item.stock !== 0 ? true : false,
            press: function (oEvent) {
              that.onComprar(oEvent);
            },
          });
          //USANDO ATTACHEVENT
          // boton.attachEvent("press", function () {
          //   console.log("Press");
          // });

          //Agregar Info producto Model
          var cData = new sap.ui.core.CustomData({
            key: "prod",
            value: item,
          });
          boton.addCustomData(cData);
          vboxContenedor.addItem(genericTile);
          vboxContenedor.addItem(boton);
          contenedor.addItem(vboxContenedor);
        });
        if (callBack !== null && callBack !== undefined) {
          callBack();
        }
      },
      onSearchProducto: function (oEvent) {
        var sf = oEvent.getSource();
        var valor = sf.getValue().toLocaleUpperCase();
        console.log("Valor SF", valor);

        //Simular llamada de servicio
        var modelProductos = sap.ui.getCore().getModel("mProductos");
        var dataModel = modelProductos.getData();
        console.log("Datos del modelo", dataModel);
        //Filtrar el arreglo de datos
        var filteredData = dataModel.filter((item) => {
          console.log("Current Item", item);
          return item.titulo.toLocaleUpperCase().includes(valor);
        });
        console.log("filtado del modelo", filteredData);
        var contenedorProductos = oView.byId("h_contenedorProductos");
        contenedorProductos.setBusy(true);
        //Eliminar la lista de productos que se estan mostrando
        contenedorProductos.destroyItems();
        //Mostar los productos filtrados
        this.rederizarProducto(contenedorProductos, filteredData, () => {
          oView.byId("h_contenedorProductos").setBusy(false);
        });
      },
      onComprar: function (oEvent) {
        //Obtenemos el btn y sus custom data para obtener el obj
        var btn = oEvent.getSource();
        var cData = btn.getCustomData();
        var prod = cData[0].getValue();
        //hacer el obj disponible para toda la app
        var selectedProdModel = new JSONModel(prod);
        // Llamar al fragmento
        if (!oView.byId("dg_confirmacionCompra")) {
          Fragment.load({
            id: oView.getId(),
            name: "curso.frontend.fragments.Confirmacion",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            oDialog.setModel(selectedProdModel, "selectedProdModel");
            oDialog.open();
          });
        } else {
          var oDialog = oView.byId("dg_confirmacionCompra");
          oDialog.setModel(selectedProdModel, "selectedProdModel");
          oDialog.open();
        }
      },
      onCerrarDialog: function (oEvent) {
        oView.byId("dg_confirmacionCompra").close();
      },
      onConfirmar: function (oEvent) {
        var dialog = oView.byId("dg_confirmacionCompra");
        var model = dialog.getModel("selectedProdModel");
        var prod = model.getData();
        console.log(prod);
        prod.fechaRegistro = new Date();
        prod.estado = "Pendiente";
        //Actualizar el Stock
        var dataProductos = this.getOwnerComponent().getModel("mProductos");
        var arrData = dataProductos.getData();
        for (var i = 0; i < arrData.length; i++) {
          if (arrData[i].id === prod.id) {
            arrData[i].stock = arrData[i].stock - 1;
          }
        }
        dataProductos.setData(arrData);

        var currentModel = this.getOwnerComponent().getModel("modelCarrito");
        var columnData = this.getOwnerComponent().getModel("columnData");
        console.log(currentModel);
        if (currentModel === undefined) {
          var newRegistro = {
            data: [
              {
                producto: `${prod.titulo} - ${prod.marca}`,
                cant_ped: 1,
                id: prod.id,
              },
            ],
          };

          columnData.setData(newRegistro);
          var model = new JSONModel({
            data: [prod],
          });
          this.getOwnerComponent().setModel(model, "modelCarrito");
        } else {
          var dataUpdate = columnData.getData();
          var flagUpdated = false;
          console.log(dataUpdate);
          for (var j = 0; j < dataUpdate.data.length; j++) {
            if (dataUpdate.data[j].id === prod.id) {
              flagUpdated = true;
              dataUpdate.data[j] = {
                producto: `${prod.titulo} - ${prod.marca}`,
                cant_ped: dataUpdate.data[j].cant_ped + 1,
                id: prod.id,
              };
            }
          }
          if (!flagUpdated) {
            var newRegistro = {
              producto: `${prod.titulo} - ${prod.marca}`,
              cant_ped: 1,
              id: prod.id,
            };
            dataUpdate.data.push(newRegistro);
          }

          //Agregar el prod al model existente
          var arrPedidos = currentModel.getData().data;
          arrPedidos.push(prod);
          currentModel.setProperty("/data", arrPedidos);
          console.log(dataUpdate);
          columnData.setProperty("/data", dataUpdate.data);
          columnData.refresh();
        }

        dialog.close();
      },
    });
  }
);
