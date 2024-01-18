import React from 'react';
import { equiposData } from '../../equiposRepository'; 
import 'typeface-inconsolata'; 

let currentTime = 0;
const targetTime = 45 * 60; // 45 minutos en segundos

function updateDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;

  const displayString = `${formatTime(minutes)}:${formatTime(seconds)}`;
  document.getElementById('tiempo').innerHTML = displayString;

  if (currentTime < targetTime) {
    currentTime++;
  } else {
    clearInterval(intervalId);
  }
}

function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}

function getMensajeBienvenida(equiposJugando){
    if((equiposJugando.local == 'Real Betis' || equiposJugando.visitante == 'Real Betis') && (equiposJugando.local == 'Sevilla' || equiposJugando.visitante == 'Sevilla')){
       return "¡Ha comenzado el Gran Derbi!"
    }
    if((equiposJugando.local == 'FC.Barcelona' || equiposJugando.visitante == 'FC.Barcelona') && (equiposJugando.local == 'Real Madrid' || equiposJugando.visitante == 'Real Madrid')){
      return "¡Ha comenzado el Clásico!"
    }
    return "¡Empieza el partido!"
}


export function Partido() { 

  const equiposJugando = JSON.parse(localStorage.getItem("equiposElegidosLocalStorage"));
 
  const mensajeBienvenida = getMensajeBienvenida(equiposJugando);

  const equipoDataLocal = equiposData[equiposJugando.local];
  const equipoDataVisitante = equiposData[equiposJugando.visitante];

   
  const intervalId = setInterval(updateDisplay, 15);
 
    return (
      <>
        <div className="titulo-home"> 
          <p>{mensajeBienvenida}</p>
        </div> 

        <div className="partido listado_equipos"> 
            <div className='escudos'>
                <img src={`./img/${equipoDataLocal.escudo}`} className="logo" alt={`${equiposJugando.local} Logo`} />
                <p>{equiposJugando.local}</p>
            </div>
            <div className='separacion'></div>
            <div className='escudos'>
                <img src={`./img/${equipoDataVisitante.escudo}`} className="logo" alt={`${equiposJugando.visitante} Logo`} />
                <p>{equiposJugando.visitante}</p>
            </div>
        </div>
        <div id='tiempo' className='tiempo' style={{ fontFamily: 'Inconsolata, monospace' }}>00:00</div>
      </>
    )
  }
   