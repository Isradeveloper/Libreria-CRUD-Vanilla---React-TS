import { Estado } from '../interfaces/EstadoLibro';

export class Libro {

  constructor(
    public nombre:string,
    public autor: string,
    public fechaPublicacion: string,
    public estado: Estado,
    public id: number,
    public portada: string = 'NA',
  ){
  }

  getNombreCorto():string {
    if (this.nombre.length > 20) {
      return this.nombre.slice(0, 17) + '...'
    } else {
      return this.nombre
    }
  }

  getNombreAutorCorto():string {
    if (this.autor.length > 20) {
      return this.autor.slice(0, 17) + '...'
    } else {
      return this.autor
    }
  }

}