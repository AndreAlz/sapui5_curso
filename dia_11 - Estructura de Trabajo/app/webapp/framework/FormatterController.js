sap.ui.define([], function () {
  "use strict";
  return {
    dateTimeFormatter(date) {
      if (date === undefined || date === null) {
        var fecha = new Date();
      } else {
        var fecha = new Date(date);
      }
      var dia = fecha.getDate() >= 10 ? fecha.getDate() : "0" + fecha.getDate();
      var mes =
        fecha.getMonth() + 1 >= 10
          ? fecha.getMonth() + 1
          : "0" + (fecha.getMonth() + 1);
      var año = fecha.getFullYear();
      var hora =
        fecha.getHours() >= 10 ? fecha.getHours() : "0" + fecha.getHours();
      var minutos =
        fecha.getMinutes() >= 10
          ? fecha.getMinutes()
          : "0" + fecha.getMinutes();
      var segundos =
        fecha.getSeconds() >= 10
          ? fecha.getSeconds()
          : "0" + fecha.getSeconds();
      var ampm = fecha.getHours() >= 12 ? "pm" : "am";
      return `${dia}-${mes}-${año} ${hora}:${minutos}:${segundos} ${ampm}`;
    },
  };
});
