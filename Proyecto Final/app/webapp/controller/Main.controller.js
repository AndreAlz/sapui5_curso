sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    var that = null;
    var oView = null;
    return Controller.extend("curso.frontend.controller.Main", {
      onInit: function () {
        that = this;
        oView = this.getView();

        //Simula el cosumo de un SERVICIOS
        var productosData = [
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
            titulo: "Laptop",
            precio: "S/.3000.00",
            marca: "MAC",
            stock: 0,
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
            id: "prod_4",
          },
        ];

        var modelProductos = new JSONModel(productosData);
        sap.ui.getCore().setModel(modelProductos, "mProductos");

        //CREACION DINAMICA DE PRODUCTOS
        // HBOX CONTENEDOR PRODUCTOS
        var contenedorProductos = oView.byId("h_contenedorProductos");
        console.log(contenedorProductos);
        this.rederizarProducto(contenedorProductos, productosData);
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
          });
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
    });
  }
);
