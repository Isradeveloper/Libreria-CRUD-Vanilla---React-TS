import {Libro} from '../classes/Libro'

export const useLocalStorage = (key:string) => {

  const saveToLocalStorage = (newData:any) => {
    localStorage.setItem(key, JSON.stringify(newData));
  };

  const getLocalStorage = () => {
    return localStorage.getItem(key)
  };

  const getLibros = (): Libro[] => {
    const librosData = localStorage.getItem('libros');
    
    if (!librosData) return [];
    
    const array = JSON.parse(librosData);
    
    return array.map((libro: Libro) => new Libro(libro.nombre, libro.autor, libro.fechaPublicacion, libro.estado, libro.id, libro.portada));
  };

  return {
    getLibros,
    saveToLocalStorage,
    getLocalStorage,
  }
}