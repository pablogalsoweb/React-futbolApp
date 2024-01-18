import { Equipos } from "./componentes/equipos"


export function Home() { 
 
  console.log('home');
    return (
      <>
        <div className="titulo-home">
          <p>Elige dos equipos</p>
          <p>para empezar el partido</p>
        </div>
        
        <Equipos /> 
        
      </>
    )
  }
   