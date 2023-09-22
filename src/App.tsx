import { Footer } from './components/Footer';
import './App.css'
import { ListaLibros } from './components/ListaLibros';
import {BsBookmarkPlus} from 'react-icons/bs'
import {Modal} from './components/Modal'
import { useLocalStorage } from './hooks/useLocalStorageLibros';
import {Libro as LibroClass} from './classes/Libro'
import { useState, useEffect } from 'react';
import { useForm } from './hooks/useForm';

function App() {


  const {getLibros} = useLocalStorage('libros')
  const  {values, editar, setEditar, handleChange, resetForm} = useForm({
    nombre: '',
    autor: '',
    fechaPublicacion: '',
    portada: '',
    estado: 0
  })

  const onClickModal = () => {
    const selectElement = document.getElementById('estado') as HTMLSelectElement;
    selectElement.value = values.estado.toString();
  }

  const [libros, setLibros] = useState<LibroClass[]>([])

  useEffect(() => {
    setLibros(getLibros())
  }, [])
  
  return (
    <>
      <div className='container-fluid'>
        <h1 className='text-center mt-5'>Library APP</h1>
        <ListaLibros libros={libros}/>
      </div>
      <div className="add bg-success d-flex justify-content-center align-items-center text-light bg-hover-primary" data-bs-toggle="modal" data-bs-target="#crear_libro" onClick={onClickModal}>
        <BsBookmarkPlus size={30}/>
      </div>
      <Modal setLibros={setLibros} editar={editar} setEditar={setEditar} resetForm={resetForm} values={values} handleChange={handleChange}/>
      <Footer/>
    </>
  )
}

export default App
