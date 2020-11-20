sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "./MessageController",
    "./FormatterController",
  ],
  function (
    Controller,
    JSONModel,
    History,
    MessageController,
    FormatterController
  ) {
    "use strict";
    var configuration = {
      MAIN_URL: "http://localhost:3000",
      requestAPI: "fetch",
      reviewResult: false,
      printConsole: true,
      sendMessage: true,
    };
    return Controller.extend("curso.frontend.framework.BaseController", {
      reference: {},
      fmt: FormatterController,
      msg: MessageController,
      initBase: function (nameSpace, context) {
        this.reference[nameSpace] = context;
      },
      getRequest: function (path, component, callback, errorCallback, other) {
        var that = this;
        try {
          path = path === undefined ? null : path === null ? null : path;
          component =
            component === undefined
              ? null
              : component === null
              ? null
              : component;
          callback =
            callback === undefined ? null : callback === null ? null : callback;
          errorCallback =
            errorCallback === undefined
              ? null
              : errorCallback === null
              ? null
              : errorCallback;
          other = other === undefined ? null : other === null ? null : other;
          var URL_USE = that.paramValidator(path, other);
          if (configuration.requestAPI === "fetch") {
            var settings = {
              method: "GET",
              headers: that.headersContructor(other),
            };
            fetch(`${URL_USE}${path}`, settings)
              .then((res) => {
                var result = that.requestValidator(res);
                if (result.type === "ok") {
                  return result.data;
                } else {
                  throw result;
                }
              })
              .then((payload) => {
                that.successHandler(payload, component, callback);
              })
              .catch((e) => {
                that.errorHandler(e, errorCallback);
              });
          } else {
            jQuery.ajax({
              type: "GET",
              contentType: "application/json",
              url: `${URL_USE}${path}`,
              dataType: "json",
              success: function (payload) {
                that.successHandler(payload, component, callback);
              },
              error: function (e) {
                that.errorHandler(e, errorCallback);
              },
            });
          }
        } catch (e) {
          that.errorHandler(e, errorCallback);
        }
      },
      postRequest: function (
        path,
        body,
        component,
        callback,
        errorCallback,
        other
      ) {
        var that = this;
        try {
          path = path === undefined ? null : path === null ? null : path;
          body = body === undefined ? null : body === null ? null : body;
          component =
            component === undefined
              ? null
              : component === null
              ? null
              : component;
          callback =
            callback === undefined ? null : callback === null ? null : callback;
          errorCallback =
            errorCallback === undefined
              ? null
              : errorCallback === null
              ? null
              : errorCallback;
          other = other === undefined ? null : other === null ? null : other;
          var URL_USE = that.paramValidator(path, other);
          if (body !== undefined) {
            body = JSON.stringify(body);
          }
          if (configuration.requestAPI === "fetch") {
            var settings = {
              method: "POST",
              headers: that.headersContructor(other),
            };
            if (body !== undefined) {
              settings.body = body;
            }
            fetch(`${URL_USE}${path}`, settings)
              .then((res) => {
                var result = that.requestValidator(res);
                if (result.type === "ok") {
                  return result.data;
                } else {
                  throw result;
                }
              })
              .then((payload) => {
                that.successHandler(payload, component, callback);
              })
              .catch((e) => {
                that.errorHandler(e, errorCallback);
              });
          } else {
            var settings = {
              type: "POST",
              contentType: "application/json",
              url: `${URL_USE}${path}`,
              dataType: "json",
              success: function (payload) {
                that.successHandler(payload, component, callback);
              },
              error: function (e) {
                that.errorHandler(e, errorCallback);
              },
            };
            if (body !== undefined) {
              settings.data = body;
            }
            jQuery.ajax(settings);
          }
        } catch (e) {
          that.errorHandler(e, errorCallback);
        }
      },
      putRequest: function (
        path,
        body,
        component,
        callback,
        errorCallback,
        other
      ) {
        var that = this;
        try {
          path = path === undefined ? null : path === null ? null : path;
          body = body === undefined ? null : body === null ? null : body;
          component =
            component === undefined
              ? null
              : component === null
              ? null
              : component;
          callback =
            callback === undefined ? null : callback === null ? null : callback;
          errorCallback =
            errorCallback === undefined
              ? null
              : errorCallback === null
              ? null
              : errorCallback;
          other = other === undefined ? null : other === null ? null : other;
          var URL_USE = that.paramValidator(path, other);
          if (body !== undefined) {
            body = JSON.stringify(body);
          }
          if (configuration.requestAPI === "fetch") {
            var settings = {
              method: "PUT",
              headers: that.headersContructor(other),
            };
            if (body !== undefined) {
              settings.body = body;
            }
            fetch(`${URL_USE}${path}`, settings)
              .then((res) => {
                var result = that.requestValidator(res);
                if (result.type === "ok") {
                  return result.data;
                } else {
                  throw result;
                }
              })
              .then((payload) => {
                that.successHandler(payload, component, callback);
              })
              .catch((e) => {
                that.errorHandler(e, errorCallback);
              });
          } else {
            var settings = {
              type: "PUT",
              contentType: "application/json",
              url: `${URL_USE}${path}`,
              dataType: "json",
              success: function (payload) {
                that.successHandler(payload, component, callback);
              },
              error: function (e) {
                that.errorHandler(e, errorCallback);
              },
            };
            if (body !== undefined) {
              settings.data = body;
            }
            jQuery.ajax(settings);
          }
        } catch (e) {
          that.errorHandler(e, errorCallback);
        }
      },
      deleteRequest: function (
        path,
        body,
        component,
        callback,
        errorCallback,
        other
      ) {
        var that = this;
        try {
          path = path === undefined ? null : path === null ? null : path;
          body = body === undefined ? null : body === null ? null : body;
          component =
            component === undefined
              ? null
              : component === null
              ? null
              : component;
          callback =
            callback === undefined ? null : callback === null ? null : callback;
          errorCallback =
            errorCallback === undefined
              ? null
              : errorCallback === null
              ? null
              : errorCallback;
          other = other === undefined ? null : other === null ? null : other;
          var URL_USE = that.paramValidator(path, other);
          if (body !== undefined) {
            body = JSON.stringify(body);
          }
          if (configuration.requestAPI === "fetch") {
            var settings = {
              method: "DELETE",
              headers: that.headersContructor(other),
            };
            if (body !== undefined) {
              settings.body = body;
            }
            fetch(`${URL_USE}${path}`, settings)
              .then((res) => {
                var result = that.requestValidator(res);
                if (result.type === "ok") {
                  return result.data;
                } else {
                  throw result;
                }
              })
              .then((payload) => {
                that.successHandler(payload, component, callback);
              })
              .catch((e) => {
                that.errorHandler(e, errorCallback);
              });
          } else {
            var settings = {
              type: "DELETE",
              contentType: "application/json",
              url: `${URL_USE}${path}`,
              dataType: "json",
              success: function (payload) {
                that.successHandler(payload, component, callback);
              },
              error: function (e) {
                that.errorHandler(e, errorCallback);
              },
            };
            if (body !== undefined) {
              settings.data = body;
            }
            jQuery.ajax(settings);
          }
        } catch (e) {
          that.errorHandler(e, errorCallback);
        }
      },
      paramValidator: function (path, other) {
        var URL_USE = configuration.MAIN_URL;
        if (path === null) {
          throw Error("Path es un campo obligatorio");
        }
        if (other !== null) {
          if (other.url !== null && other.url !== undefined) {
            URL_USE = other.url;
          }
        }
        return URL_USE;
      },
      headersContructor: function (other) {
        if (other !== null) {
          if (other.headers !== null && other.headers !== undefined) {
            return other.headers;
          }
        } else {
          return new Headers({
            "Content-type": "application/json",
          });
        }
      },
      requestValidator: function (res) {
        if (res.ok) {
          return {
            type: "ok",
            data: res.json(),
          };
        } else {
          return {
            type: "error",
            data: {
              status: res.status,
              text: res.statusText,
              headers: res.headers,
            },
          };
        }
      },
      resultReview: function (payload) {
        if (payload.type !== "ok") {
          if (configuration.printConsole) {
            console.error(e);
          }
          if (configuration.sendMessage) {
            that.msg("error", payload.message);
          }
        }
      },
      successHandler: function (payload, component, callback) {
        if (configuration.reviewResult) {
          resultReview(payload);
        }
        if (component !== null) {
          component.setModel(new JSONModel(payload));
        }
        if (callback !== null) {
          callback(payload);
        }
      },
      errorHandler: function (e, errorCallback) {
        if (configuration.printConsole) {
          console.error(e);
        }
        if (configuration.sendMessage) {
          that.msg("error", "Error al ejecutar la peticion");
        }
        if (errorCallback !== null) {
          errorCallback("function", e);
        }
      },
    });
  }
);
