import {Libro} from '../classes/Libro'
import { FormInterface } from './Form'

export interface LibroProps {
  libro: Libro,
  setLibros: (libros: Libro[]) => void,
  editar: boolean,
  setEditar: React.Dispatch<React.SetStateAction<boolean>>,
  resetForm: () => void,
  values: FormInterface,
  handleChange: any,
  setValues: any,
}

export interface ListadoLibrosProps {
  libros: Libro[],
  setLibros: (libros: Libro[]) => void,
  editar: boolean,
  setEditar: React.Dispatch<React.SetStateAction<boolean>>,
  resetForm: () => void,
  values: FormInterface,
  handleChange: any
  setValues: any,

}

export interface ModalLibroProp {
  setLibros: (libros: Libro[]) => void,
  editar: boolean,
  setEditar: React.Dispatch<React.SetStateAction<boolean>>,
  resetForm: () => void,
  values: FormInterface,
  handleChange: any
  setValues: any,

}