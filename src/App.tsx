import { Footer } from './components/Footer';
import './App.css'
import { ListaLibros } from './components/ListaLibros';
import {BsBookmarkPlus} from 'react-icons/bs'
import {Modal} from './components/Modal'
import { useLocalStorage } from './hooks/useLocalStorage';
import {Libro as LibroClass} from './classes/Libro'
import { useState, useEffect } from 'react';
import { useForm } from './hooks/useForm';

function App({nombre, saveToLocalStorage, setAutenticado}) {

  const onLogout = () => {
      saveToLocalStorage(null)
      setAutenticado(false) 
  }

  const {getLibros} = useLocalStorage('libros')
  const  {values, editar, setEditar, handleChange, resetForm, setValues} = useForm({
    nombre: '',
    autor: '',
    fechaPublicacion: '',
    portada: '',
    estado: 0
  })

  const onClickModal = () => {
    resetForm()
    setEditar(false)
    const selectElement = document.getElementById('estado') as HTMLSelectElement;
    selectElement.value = values.estado.toString();
  }

  const [libros, setLibros] = useState<LibroClass[]>([])

  useEffect(() => {
    setLibros(getLibros())
  }, [])
  
  return (
    <>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-white">{`!Bienvenido, ${nombre}!`}</span>
          <button className='btn btn-danger' onClick={() => {onLogout()}}>Logout</button>
        </div>
      </nav>
      <div className='container-fluid'>
        <h1 className='text-center mt-5'>Library APP</h1>
        <ListaLibros libros={libros} setLibros={setLibros} editar={editar} setEditar={setEditar} resetForm={resetForm} values={values} handleChange={handleChange} setValues={setValues} />
      </div>
      <div className="add bg-success d-flex justify-content-center align-items-center text-light bg-hover-primary" data-bs-toggle="modal" data-bs-target="#crear_libro" onClick={onClickModal}>
        <BsBookmarkPlus size={30}/>
      </div>
      <Modal setLibros={setLibros} editar={editar} setEditar={setEditar} resetForm={resetForm} values={values} handleChange={handleChange} setValues={setValues}/>
      <Footer/>
    </>
  )
}

export default App
