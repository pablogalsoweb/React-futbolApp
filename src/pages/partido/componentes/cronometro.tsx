import { useEffect, useState } from "react";
 
export function Cronometro(){

        const maximoPrimeraParte = 5; // 45 minutos en segundos
        const maximoSegundaParte = 10; // 45 minutos en segundos
  
        const [minutos, setMinutos] = useState(0);
        const [segundos, setSegundos] = useState(0);
        const [corriendo, setCorriendo] = useState(true);

        const [tiempoJugado, setTiempoJugado] = useState(maximoPrimeraParte);

        function terminaPrimeraParte(){
            if (minutos === maximoPrimeraParte-1 && segundos === 59) {
                return true;
            }
            else{
                return false;
            }
        }
        function terminaSegundaParte(){
            if ((minutos === maximoSegundaParte-1 && segundos === 59) || minutos>=maximoSegundaParte) {
                return true;
            }
            else{
                return false;
            }
        }

        function estanSinJugar(){
            if ((minutos === maximoPrimeraParte || minutos === maximoSegundaParte) && segundos === 0) {
                return true;
            }
            else{
                return false;
            }
        }
 
        
        useEffect(() => {
            let interval:number = 0; 
            if (corriendo) {
                //console.log('corriendo interval ' + interval); 
                interval = setInterval(() => {
                    if (segundos === 59) { 
                        setMinutos((prevMinutos) => prevMinutos + 1);
                        setSegundos(0);
                    } else {
                        setSegundos((prevSegundos) => prevSegundos + 1);
                    }

                    if (terminaPrimeraParte()) {
                        // Detener el cronómetro después de 45 minutos 
                        clearInterval(interval);
                        setTiempoJugado(maximoSegundaParte);
                        setCorriendo(false);
                    }
                    
                    if (terminaSegundaParte()) { 
                        // Detener el cronómetro después de 45 minutos
                        clearInterval(interval);  
                        setCorriendo(false); 
                    }

                }, 15);
            } else {
               // console.log('NO corriendo interval ' + interval); 
                clearInterval(interval);
            }

            return () => {
                clearInterval(interval);
            };
        }, [corriendo, minutos, segundos]);

        const controlarTiempo = () => {
            setCorriendo((prevCorriendo) => !prevCorriendo);
            const btn_controlTiempo = document.getElementById('controlTiempo');
            if(btn_controlTiempo){
                btn_controlTiempo.textContent = corriendo ? 'Seguir partido' : 'Pausar';
            } 
        };

        const comenzarSegundaParte = () => {
            setCorriendo(true); 
        };
 

        return (
            <>
                 <div id='tiempo' className='tiempo' style={{ fontFamily: 'Inconsolata, monospace' }}>{`${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`}</div>
                 { (tiempoJugado == maximoSegundaParte && minutos == maximoPrimeraParte && segundos === 0) && <button id="empezarSegundaParte" onClick={comenzarSegundaParte} className='appear-buttom'>Empezar 2ª Parte</button> }
                 { (!estanSinJugar()) && <button id="controlTiempo" onClick={controlarTiempo} className='appear-buttom'>Pausar</button> }
                 { terminaSegundaParte() && <button className='appear-buttom'>Final del partido</button> }
                  
            </>
         )
}
/*   { !tiempoParado && <button id="controlTiempo" onClick={controlarTiempo} className='appear-buttom'>Pausar</button> } */