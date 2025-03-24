export interface Hotel {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  nit: string;
  numero_habitaciones: number;
  habitaciones?: Habitacion[];
}

export interface Habitacion {
  id: number;
  tipo: string;
  acomodacion: string;
  cantidad: number;
}

export interface Props {
  show: boolean;
  handleClose: () => void;
  hotel?: Hotel | null;
  setHoteles: React.Dispatch<React.SetStateAction<Hotel[]>>;
  hoteles: Hotel[];
}