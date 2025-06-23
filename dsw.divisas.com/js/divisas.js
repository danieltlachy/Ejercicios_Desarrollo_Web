const API_URL_BASE = "https://openexchangerates.org/api/";
const API_APP_ID = "e77f99c02f404d34a3631b67223d85e5";
const API_MXN_CURRENCY = "MXN";
var pesos_a_dolares = true;

window.onload = function(){
  actualizarImagenesMonedas();
}

function intercambiarTipoConversion(){
  pesos_a_dolares = !pesos_a_dolares;
  actualizarImagenesMonedas();
}

function actualizarImagenesMonedas(){
  var titulo = document.getElementById("h1_titulo");
  var img1 = document.getElementById("img1");
  var img2 = document.getElementById("img2");
  if(pesos_a_dolares){
    titulo.innerText = "Conversor de Divisas Pesos Méxicanos a Dolares";
    img1.src="img/mxn.png";
    img2.src="img/usa.png";
  }else{
    titulo.innerText = "Conversor de Divisas Dolares a Pesos Méxicanos";
    img1.src="img/usa.png";
    img2.src="img/mxn.png";
  }
}

function convertir(){
    // Obtener los valores necesarios
    let importe = parseFloat(document.getElementById("txt_importe").value);
    let res = document.getElementById("txt_resultado");
    let txtasa = document.getElementById("txt_tasa");
    console.log(pesos_a_dolares);
    
    const URL = `${API_URL_BASE}latest.json?app_id=${API_APP_ID}&symbols=${API_MXN_CURRENCY}`;
    
    axios.get(URL)
      .then(function(response) {
        console.log(response.data);
        
        // Extraer la tasa de conversión a Pesos Mexicanos
        var var_rates = response.data.rates;
        var tasa = parseFloat(var_rates['MXN']);
        
        if(!isNaN(importe) && importe > 0.0 && !isNaN(tasa) && tasa > 0.0){
          txtasa.value = tasa;
          
          if(pesos_a_dolares){
            res.value = (importe / tasa).toFixed(2);
          }
          else {
            res.value = (importe * tasa).toFixed(2);
          }
        }
      })
      .catch(function(error) {
        console.error("Error:", error);
        if (error.response) {
          alert(`Error del servidor: ${error.response.status}`);
        } else if (error.request) {
          alert("No se puede consultar el API en este momento...");
        } else {
          alert("Error al realizar la solicitud: " + error.message);
        }
      });
      
    return false; // Evita que se ejecute el redirect del FORM
}