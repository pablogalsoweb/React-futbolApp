/*import betis from '../assets/img/escudo-betis.png';
import betisGris from '../assets/img/escudo-betis-gris.png';
import sevilla from '../assets/img/escudo-sevilla.png';
import sevillaGris from '../assets/img/escudo-sevilla-gris.png';
import barcelona from '../assets/img/escudo-barcelona.png';
import barcelonaGris from '../assets/img/escudo-barcelona-gris.png';
import madrid from '../assets/img/escudo-madrid.png';
import madridGris from '../assets/img/escudo-madrid-gris.png';*/
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { equiposData } from '../../../equiposRepository';

import { Escudos } from './escudos';


function eliminarEquipoElegido(equiposElegido, setEquiposElegido, equipo){
    const escudoYaElegido = Object.entries(equiposElegido).find(([propiedad, valor]) => valor === equipo) || [];
    const propiedadArray = escudoYaElegido[0]; // local o visitante 
    const eleccion = {...equiposElegido};
    eleccion[propiedadArray] = ''; // eliminamos equipo del array
    setEquiposElegido(eleccion); 
}

function faltaPorElegir(equiposElegido){
  if(equiposElegido['local'] != '' && equiposElegido['visitante'] != ''){     
    return false;
  }
  return true;
}

function yaEstaElegido(equiposElegido, equipoPulsado){
    const escudoYaElegido = Object.entries(equiposElegido).find(([propiedad, valor]) => valor === equipoPulsado) || [];
    if(escudoYaElegido.length > 0){
       return true;
    }
    return false;
}



export function Equipos() {  
    const [equiposElegido, setEquiposElegido] = useState({'local' : '', 'visitante' : ''});

    const eleccionDeEquiposTerminada = !faltaPorElegir(equiposElegido); 

    const navigate  = useNavigate(); //para redirigir a otra ruta
     
    const clickElegirEquipo = (equipo:string) => { 
          
          if(yaEstaElegido(equiposElegido, equipo)){
              eliminarEquipoElegido(equiposElegido, setEquiposElegido, equipo);  
          }   
          else if(faltaPorElegir(equiposElegido)){  
              const eleccion = {...equiposElegido};
              if(equiposElegido['local'] == ''){
                 // console.log('meto local: ' + equipo);
                  eleccion.local = equipo;                
              }
              else if(equiposElegido['visitante'] == ''){
                 // console.log('meto visitante: ' + equipo);
                  eleccion.visitante = equipo; 
              }
              setEquiposElegido(eleccion); 
          }
 
    } 

    const empezamosPartido = () => {
      localStorage.setItem("equiposElegidosLocalStorage", JSON.stringify(equiposElegido));
      //console.log(JSON.parse(localStorage.getItem('equiposElegidosLocalStorage')));
      // Redirige a la URL deseada 
      navigate ('/partido');
    }

    const equipos = Object.keys(equiposData);   
    
    return (
      <>
          <div className="listado_equipos">   
              { equipos.map((equipo)=> {
                const equipoData = equiposData[equipo];
                return <Escudos key={equipo}
                            clickElegirEquipo={ () => clickElegirEquipo(equipo) } 
                            nombreEquipo={equipo} 
                            equipoData={equipoData} 
                            equiposElegido={equiposElegido} 
                        />             
                }) 
              }    
          </div>
          { eleccionDeEquiposTerminada && <button id="empezar" onClick={empezamosPartido} className='appear-buttom'>Empezar partido</button> }
          
      </>
    )
  }
   