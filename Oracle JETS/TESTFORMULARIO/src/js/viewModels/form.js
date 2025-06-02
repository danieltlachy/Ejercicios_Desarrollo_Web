/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define([
  "ojs/ojresponsiveutils",
  "ojs/ojresponsiveknockoututils",
  "knockout",
  "ojs/ojknockout",
  "ojs/ojformlayout",
  "ojs/ojlabel",
  "ojs/ojselectcombobox",
  "ojs/ojinputtext",
  "ojs/ojbutton",
  "ojs/ojcontext",
  "ojs/ojdatetimepicker",
  "ojs/ojradioset",
  "ojs/ojswitch",
  "ojs/ojdialog",
  "ojs/ojcollapsible",
], function (
  ResponsiveUtils,
  ResponsiveKnockoutUtils,
  ko,
  ojknockout,
  ojformlayout,
  ojlabel,
  ojselectcombobox,
  ojinputtext,
  ojbutton,
  Context
) {
  function ControllerViewModel() {
    var self = this;
    self.var_nombre = ko.observable("");
    self.var_apellidoPaterno = ko.observable("");
    self.var_apellidoMaterno = ko.observable("");
    self.var_fechaNacimiento = ko.observable(null);
    self.var_genero = ko.observable("");
    self.var_carrera = ko.observable("");
    self.var_anioIngreso = ko.observable("");
    self.var_correoInstitucional = ko.observable("");
    self.var_password = ko.observable("");
    self.var_estudianteExtranjero = ko.observable(false);
    self.var_observaciones = ko.observable("");

    self.dialogOpened = ko.observable(false);
    self.errorDialogOpened = ko.observable(false);
    self.dialogContent = ko.observable("");

    self.actionValidar = function () {
      console.log("Validando campos...");
      var correoError = document.getElementById("correoError");
      if (correoError) {
        correoError.style.display = "none";
      }

      var errores = validarCamposRequeridos();

      if (errores.length > 0) {
        console.log("Errores de validación, mostrando diálogo de errores...");
        var mensajeError = formatearErrores(errores);
        self.dialogContent(mensajeError);
        self.errorDialogOpened(true);

        var errorDialog = document.getElementById("dg_errores");
        if (errorDialog) {
          Context.getContext(errorDialog).getBusyContext().whenReady().then(function () {
            errorDialog.open();
          });
        }

        var tieneErrorCorreo = errores.some(function (error) {
          return error.includes("correo");
        });

        if (tieneErrorCorreo && correoError) {
          correoError.style.display = "block";
        }

        return;
      }

      console.log("Validación exitosa, mostrando diálogo...");
      var datosFormateados = formatearDatos();
      self.dialogContent(datosFormateados);
      self.dialogOpened(true);

      var dialog = document.getElementById("dg_resumen");
      if (dialog) {
        Context.getContext(dialog).getBusyContext().whenReady().then(function () {
          dialog.open();
        });
      }
    };

    self.closeDialog = function (event, context) {
      console.log("Cerrando diálogo...");
      var dialogId = context && context.element ? context.element.id : "dg_resumen";
      var dialog = document.getElementById(dialogId);
      if (dialog) {
        dialog.close();
      }
      if (dialogId === "dg_resumen") {
        self.dialogOpened(false);
      } else if (dialogId === "dg_errores") {
        self.errorDialogOpened(false);
      }
    };

    function validarCorreo(correo) {
      var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(correo);
    }

    function validarCamposRequeridos() {
      var errores = [];

      if (!self.var_nombre() || self.var_nombre().trim() === "") {
        errores.push("• El nombre es requerido");
      }

      if (
        !self.var_apellidoPaterno() ||
        self.var_apellidoPaterno().trim() === ""
      ) {
        errores.push("• El apellido paterno es requerido");
      }

      if (
        !self.var_apellidoMaterno() ||
        self.var_apellidoMaterno().trim() === ""
      ) {
        errores.push("• El apellido materno es requerido");
      }

      var anio = parseInt(self.var_anioIngreso());
      if (!anio || isNaN(anio) || anio < 2000 || anio > 2030) {
        errores.push(
          "• El año de ingreso es requerido y debe estar entre 2000 y 2030"
        );
      }

      if (
        !self.var_correoInstitucional() ||
        self.var_correoInstitucional().trim() === ""
      ) {
        errores.push("• El correo institucional es requerido");
      } else if (!validarCorreo(self.var_correoInstitucional().trim())) {
        errores.push("• El formato del correo electrónico no es válido");
      }

      if (!self.var_password() || self.var_password().trim() === "") {
        errores.push("• La contraseña es requerida");
      }

      return errores;
    }

    function formatearDatos() {
      var datos = [];

      datos.push("Nombre: " + (self.var_nombre().trim() || "No especificado"));
      datos.push("Apellido Paterno: " + (self.var_apellidoPaterno().trim() || "No especificado"));
      datos.push("Apellido Materno: " + (self.var_apellidoMaterno().trim() || "No especificado"));
      datos.push("Fecha de Nacimiento: " + (self.var_fechaNacimiento() || "No especificada"));
      datos.push("Género: " + (self.var_genero() === "Masculino" ? "Masculino" : self.var_genero() === "Femenino" ? "Femenino" : "No especificado"));
      
      var carreraNombre = "";
      switch (self.var_carrera()) {
        case "Ingeniería de Software":
          carreraNombre = "Ingeniería de Software";
          break;
        case "Tecnologías Computacionales":
          carreraNombre = "Tecnologías Computacionales";
          break;
        case "Redes y Servicios de Cómputo":
          carreraNombre = "Redes y Servicios de Cómputo";
          break;
        case "Ingeniería en Ciberseguridad":
          carreraNombre = "Ingeniería en Ciberseguridad";
          break;
        default:
          carreraNombre = self.var_carrera() || "No seleccionada";
      }
      datos.push("Carrera: " + carreraNombre);
      datos.push("Año de Ingreso: " + (self.var_anioIngreso() || "No especificado"));
      datos.push("Correo Institucional: " + (self.var_correoInstitucional().trim() || "No especificado"));
      datos.push("Estudiante Extranjero: " + (self.var_estudianteExtranjero() ? "Sí" : "No"));
      datos.push(
        "Observaciones: " + (self.var_observaciones() && self.var_observaciones().trim() !== ""
          ? self.var_observaciones().trim()
          : "Ninguna")
      );

      return datos.join("<br>");
    }

    function formatearErrores(errores) {
      return errores.join("<br>");
    }

    const smQuery = ResponsiveUtils.getFrameworkQuery(
      ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY
    );
    this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    self.columns = ko.pureComputed(function () {
      return this.smScreen() ? 1 : 2;
    }, self);

    this.appName = ko.observable("App Name");
    this.userLogin = ko.observable("john.hancock@oracle.com");

    this.footerLinks = [
      {
        name: "About Oracle",
        linkId: "aboutOracle",
        linkTarget: "http://www.oracle.com/us/corporate/index.html#menu-about",
      },
      {
        name: "Contact Us",
        id: "contactUs",
        linkTarget: "http://www.oracle.com/us/corporate/contact/index.html",
      },
      {
        name: "Legal Notices",
        id: "legalNotices",
        linkTarget: "http://www.oracle.com/us/legal/index.html",
      },
      {
        name: "Terms Of Use",
        id: "termsOfUse",
        linkTarget: "http://www.oracle.com/us/legal/terms/index.html",
      },
      {
        name: "Your Privacy Rights",
        id: "yourPrivacyRights",
        linkTarget: "http://www.oracle.com/us/legal/privacy/index.html",
      },
    ];
  }

  var viewModel = new ControllerViewModel();
  $(document).ready(function () {
    ko.applyBindings(viewModel, document.getElementById("globalBody"));
  });

  Context.getPageContext().getBusyContext().applicationBootstrapComplete();

  return viewModel;
});