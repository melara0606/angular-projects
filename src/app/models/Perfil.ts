export interface PefilInterface {
  id: number;
  nombre: string;
  estado: number;
}

export class Perfil implements PefilInterface {
  constructor(public id: number, public nombre: string, public estado: number) { }
}
