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
  "ojs/ojcollapsible"
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
    //declaracion de variables observables
    var self = this;
    self.var_tipo = ko.observable("1");
    self.var_importe = ko.observable(0.0);
    self.var_resultado = ko.observable(0.0);
    var var_rates; // Variable para almacenar la respuesta del servicio web
    // Lista de monedas para el combobox
    self.cbx_monedas = ko.observableArray([]);
    self.cbx_de = ko.observable("MXN");
    self.cbx_a = ko.observable("USD");
    self.var_importe2 = ko.observable(0.0);
    self.var_resultado2 = ko.observable(0.0);

    self.actionConvertir = function () {
      /* Se extraé el valor de la variable observable var_importe  
           y se parsea a una variable de tipo Float */
      var importe = parseFloat(self.var_importe());
      // Se extrae la tasa de conversión a Pesos Mexicanos de los resultados del WS
      var tasa = parseFloat(var_rates['MXN']);
      // Se valida que el importe y la tasa no sea Nulo y sea mayor a cero
      if (!isNaN(importe) && importe > 0.0 && !isNaN(tasa) && tasa > 0.0) {
        // Si es de Dolares a Pesos
        if (self.var_tipo() == '1') {
          self.var_resultado(importe * tasa);
        }
        // Si es de Pesos a Dolares
        else {
          self.var_resultado(importe / tasa);
        }
      }
    };

    // combobox para convertir entre monedas
    self.actionIntercambiar = function () {
      var temp = self.cbx_de();
      self.cbx_de(self.cbx_a());
      self.cbx_a(temp);
    };

    // para convertir entre monedas
    self.actionConvertir2 = function () {
      var importe = parseFloat(self.var_importe2());
      var tasa1 = parseFloat(var_rates[self.cbx_de()]);
      var tasa2 = parseFloat(var_rates[self.cbx_a()]);
      // Se valida que el importe no sea Nulo y sea mayor a cero
      if (
        !isNaN(importe) &&
        importe > 0.0 &&
        !isNaN(tasa1) &&
        tasa1 > 0.0 &&
        !isNaN(tasa2) &&
        tasa2 > 0.0
      ) {
        // De Tasa1 A Dolares
        var conversion = importe / tasa1;
        // De Dolares A Tasa2
        conversion = conversion * tasa2;
        self.var_resultado2(conversion);
      }
    };

    function consultarDivisasWS() {
      var request = new XMLHttpRequest();
      request.open(
        //abre canal HTTP para enviar la solicitud
        "GET", // tipo de solicitud
        "https://openexchangerates.org/api/latest.json?app_id=e77f99c02f404d34a3631b67223d85e5", // URL del servicio web
        true // bandera que indica que la solicitud es asíncrona
      );
      request.timeout = 6000; //tiempo de espera para la respuesta del WS en ms
      request.onload = function () {
        // función que se ejecuta cuando la solicitud se completa
        if (request.status >= 200 && request.status < 300) {
          // Convierte la respuesta del WS a un objeto JSON
          var data = JSON.parse(this.response);
          // Imprime en consola el objeto JSON resultante
          console.log(data);
          // Asigna a la variable var_rates SOLO el arreglo de divisas contenido en la respuesta del WS
          var_rates = data.rates;
        } else {
          alert("No se puede conectar al servidor...");
        }
      };
      request.ontimeout = function (e) {
        // función que se ejecuta cuando la solicitud excede el tiempo de espera
        alert(
          "El servicio no se encuentra disponible en este momento... Por favor intenta mas tarde..."
        );
      };
      request.send(); //envía la solicitud al servidor
    }

    function consultarCatalogoDivisasWS() {
      var request = new XMLHttpRequest();
      request.open(
        "GET",
        "https://openexchangerates.org/api/currencies.json?app_id=e77f99c02f404d34a3631b67223d85e5",
        true
      );
      request.timeout = 6000; //milliseconds
      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          // Begin accessing JSON data here
          var data = JSON.parse(this.response);
          console.log(data);
          // El resultado en JSON es un Objeto de tipo Enumerable, por lo que se tiene que hacer un for para recorrer cada elemento
          for (var key in data) {
            // Se valida que el atributo tenga propiedades
            if (data.hasOwnProperty(key)) {
              // Se obtiene el nombre de cada objeto enumerable
              var nombre = data[key];
              // Se almacena en el arreglo observable cada uno de los elementos
              self.cbx_monedas.push({ value: key, label: nombre });
            }
          }

          //var_rates = data.rates;
        } else {
          alert("No se puede conectar al servidor...");
        }
      };
      request.ontimeout = function (e) {
        alert(
          "El servicio no se encuentra disponible en este momento... Por favor intenta mas tarde..."
        );
      };
      request.send();
    }

    // Media queries for responsive layouts
    const smQuery = ResponsiveUtils.getFrameworkQuery(
      ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY
    );
    this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    // si la pantalla es pequeña, se muestra una columna, de lo contrario dos
    self.columns = ko.pureComputed(function() { 
      return this.smScreen() ? 1 : 2; 
    }, self);

    // Header
    // Application Name used in Branding Area
    this.appName = ko.observable("App Name");
    // User Info used in Global Navigation area
    this.userLogin = ko.observable("john.hancock@oracle.com");

    // Footer
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
    $(document).ready(function () {
      //$(document) variable jquery que hace referencia al documento HTML y ready() es un evento que se dispara cuando el DOM está completamente cargado
      consultarDivisasWS();
      consultarCatalogoDivisasWS();
    });
  }

  // release the application bootstrap busy state
  Context.getPageContext().getBusyContext().applicationBootstrapComplete();

  return new ControllerViewModel();
});
