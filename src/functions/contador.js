
let currentTime = 0;
//const tiempoDeCadaParte = 5 * 60; // 45 minutos en segundos
const primeraParte = 5 * 60; // 45 minutos en segundos
const segundaParte = 10 * 60; // 45 minutos en segundos
//let intervalId = 0; 
 
function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}
   
function correrCronometro(intervalId, tiempoJugado, setTiempoJugado, tiempoParado) {

    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60; 

    const displayString = `${formatTime(minutes)}:${formatTime(seconds)}`;
    document.getElementById('tiempo').innerHTML = displayString;

    if (currentTime < tiempoJugado) {
        console.log(tiempoParado);
        !tiempoParado ? currentTime++ : clearInterval(intervalId); 
    }else { 
       if(tiempoJugado == segundaParte){ 
        console.log('tiempoJugado: ' + tiempoJugado); 
            clearInterval(intervalId);
            console.log("¡FINAAAAL DEL PARTIDO!");
        }
        if(tiempoJugado == primeraParte){
             console.log('intervalId: ' + intervalId); 
            clearInterval(intervalId);
            setTiempoJugado(segundaParte);  
            console.log("TERMINA LA PRIMERA PARTE");            
            
       }
       
    } 
} 


export { primeraParte, segundaParte, correrCronometro }; 