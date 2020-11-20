const express = require("express");
const app = express();
const port = parseInt(process.env.PORT) || 3000;
var bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
var currentIndex = 1;
var listTrabajadore = [
  {
    nombre: "Andre Alzamora",
    edad: 23,
    nacionalidad: "Peruano(a)",
    telefono: "945105134",
    correo: "andre.alz5297@gmail.com",
    id: "1",
  },
];

app.get("/getRequest", (req, res) => {
  res.json({
    mensaje: "La lista de usuarios fue enviada correctamente",
    data: listTrabajadore,
  });
});

app.post("/postRequest", (req, res) => {
  var body = req.body;
  body.id = currentIndex + 1;
  var result = { data: body, mensaje: "La data fue tratada correctamente." };
  listTrabajadore.push(body);
  res.json(result);
});

app.put("/putRequest", (req, res) => {
  var body = req.body;
  var flag = false;
  listTrabajadore.forEach((item, index) => {
    if (item.id === body.id) {
      flag = true;
      listTrabajadore[index] = body;
    }
  });
  if (!flag) {
    listTrabajadore.push(body);
  }
  var result = { data: body, mensaje: "Data actualizada Correctamente" };
  res.json(result);
});

app.delete("/deleteRequest", (req, res) => {
  var body = req.body;
  listTrabajadore.forEach((item, index) => {
    if (item.id === body.id) {
      listTrabajadore.splice(index, 1);
    }
  });
  res.json({ mensaje: "registro borrado correctamente" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
