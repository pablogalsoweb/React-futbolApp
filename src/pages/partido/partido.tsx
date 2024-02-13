import React from 'react';

import { equiposElegidosType } from './../../functions/interfaces';

import { equiposData } from '../../equiposRepository'; 
import 'typeface-inconsolata';  
import { Cronometro } from './componentes/cronometro';




function getMensajeBienvenida(equiposJugando:equiposElegidosType){
    if((equiposJugando.local == 'Real Betis' || equiposJugando.visitante == 'Real Betis') && (equiposJugando.local == 'Sevilla' || equiposJugando.visitante == 'Sevilla')){
       return "¡Ha comenzado el Gran Derbi!"
    }
    if((equiposJugando.local == 'FC.Barcelona' || equiposJugando.visitante == 'FC.Barcelona') && (equiposJugando.local == 'Real Madrid' || equiposJugando.visitante == 'Real Madrid')){
      return "¡Ha comenzado el Clásico!"
    }
    return "¡Empieza el partido!"
}


export function Partido() { 
  const dataLocalStorage = localStorage.getItem("equiposElegidosLocalStorage");

    if (dataLocalStorage !== null) {
          const equiposJugando:equiposElegidosType = JSON.parse(dataLocalStorage);
          const mensajeBienvenida = getMensajeBienvenida(equiposJugando); 

          const equipoDataLocal = equiposData[equiposJugando.local];
          const equipoDataVisitante = equiposData[equiposJugando.visitante];

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
              <Cronometro />
            </>
          )
    
    }
    else{
      return (
        <>
          <div className="titulo-home"> 
            <p>Hubo un problema</p>
          </div>  
        </>
      )
    } 
    
  }
   