import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import { equiposElegidosType } from '../../../functions/interfaces';

import { equiposData } from '../../../equiposRepository';



import { Escudos } from './escudos';


function eliminarEquipoElegido(equiposElegido:equiposElegidosType, setEquiposElegido:React.Dispatch<React.SetStateAction<equiposElegidosType>>, equipo:string){
    const escudoYaElegido = Object.entries(equiposElegido).find(([propiedad, valor]) => valor === equipo) || [];

    console.log('escudoYaElegido ' + escudoYaElegido + "---");

    
    const propiedadArray = escudoYaElegido[0] as keyof equiposElegidosType; // loca    
    const eleccion: equiposElegidosType = {...equiposElegido};
    console.log('propiedadArray ' + propiedadArray);
    eleccion[propiedadArray] = ''; // eliminamos equipo del array
    setEquiposElegido(eleccion); 
}

function faltaPorElegir(equiposElegido:equiposElegidosType){
  if(equiposElegido['local'] != '' && equiposElegido['visitante'] != ''){     
    return false;
  }
  return true;
}

function yaEstaElegido(equiposElegido:equiposElegidosType, equipoPulsado:string){
    const escudoYaElegido = Object.entries(equiposElegido).find(([propiedad, valor]) => valor === equipoPulsado) || [];
    if(escudoYaElegido.length > 0){
       return true;
    }
    return false;
}



export function Equipos() {  
    const [equiposElegido, setEquiposElegido] = useState<equiposElegidosType>({'local' : '', 'visitante' : ''});

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
   