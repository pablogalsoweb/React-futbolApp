
 interface equipoType {
    id: number;
    escudo: string;
    'escudo-gris': string;
    defensa: number;
    medio: number;
    ataque: number;
    dureza: number;
    velocidad: number;
    disparo: number;
    punteria: number;
}

export interface EquiposDataType {
    [equipo: string]: equipoType;
}

export interface equiposElegidosType {'local' : string, 'visitante' : string}

export interface EscudosProps {
    clickElegirEquipo: () => void;
    nombreEquipo: string;
    equipoData: equipoType; // Tipa esto según la estructura esperada de equipoData
    equiposElegido: equiposElegidosType; // Tipa esto según la estructura esperada de equiposElegido
  }