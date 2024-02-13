import { EscudosProps, equiposElegidosType } from '../../../functions/interfaces';


function yaEstaElegido(equiposElegido:equiposElegidosType, equipoPulsado:string){
    const escudoYaElegido = Object.entries(equiposElegido).find(([propiedad, valor]) => valor === equipoPulsado) || [];
    if(escudoYaElegido.length > 0){
       return true;
    }
    return false;
}

export function Escudos({clickElegirEquipo, nombreEquipo, equipoData, equiposElegido}:EscudosProps){
         
    const styleGreyImage = yaEstaElegido(equiposElegido, nombreEquipo) ? '' : 'gris';

    return(
        <div className='escudos' onClick={clickElegirEquipo}>
            <img src={`./img/${equipoData.escudo}`} className={`logo ${styleGreyImage}`} alt={`${nombreEquipo} Logo`} />
            <p>{nombreEquipo}</p>
          </div>
    );
}