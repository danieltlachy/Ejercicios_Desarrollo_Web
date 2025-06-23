var operacion = "";
var pantalla;

window.onload = function(){
    pantalla = document.getElementById("txt_resultado");
}

function limpiar(){
    operacion = "";
    pantalla.value = operacion;
}

function borrar(){
    if(operacion.length>0){
        operacion = operacion.substring(0, (operacion.length-1))
    }
    pantalla.value = operacion;
}

function clicTecla(element){
    switch(element.id){
        case 'b00' : operacion = operacion + "0"; break;
        case 'b01' : operacion = operacion + "1"; break;
        case 'b02' : operacion = operacion + "2"; break;
        case 'b03' : operacion = operacion + "3"; break;
        case 'b04' : operacion = operacion + "4"; break;
        case 'b05' : operacion = operacion + "5"; break;
        case 'b06' : operacion = operacion + "6"; break;
        case 'b07' : operacion = operacion + "7"; break;
        case 'b08' : operacion = operacion + "8"; break;
        case 'b09' : operacion = operacion + "9"; break;
        case 'b_sum' :
            if(operacion.length>0 && validarOperadores()){
                operacion = operacion + "+";
            }
            break;
        case 'b_res' :
            if(validarOperadores()){
                operacion = operacion + "-";
            }  
            break;
        case 'b_mul':
            if(operacion.length>0 && validarOperadores()){
                operacion = operacion + "*";
            }      
            break;
        case 'b_div':    
         if(operacion.length>0 && validarOperadores()){
                operacion = operacion + "/";
            }      
            break;
        case 'b_pun':
            if(validarPunto()){
                operacion = operacion + ".";
            }      
            break;
        case 'b_ig':
            if(operacion.length>0){
                if(operacion.length>0){
                    try{
                        console.log(eval(operacion));
                        operacion = ""+eval(operacion);
                    }catch(e){
                        console.log(e);
                        operacion = "";
                        alert("La operación no es válida");
                    }
                }
            }       
    }
    pantalla.value = operacion;
}

function validarOperadores(){
    if(!operacion.endsWith("+") && !operacion.endsWith("-") &&
        !operacion.endsWith("*") && !operacion.endsWith("/")){
            return true;
        }
        return false;
}

function validarPunto(){
    if(operacion.length == 0 || !validarOperadores()){
        return true;
    }
    var temp = operacion;
    temp = temp + '.';
    try{
        eval(temp);
        return true;
    }catch(e){
        console.log(e);
    }
    return false;
}