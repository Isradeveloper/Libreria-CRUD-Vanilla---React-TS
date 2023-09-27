import { useLocalStorage } from "../hooks/useLocalStorage"
import {Libro as LibroClass} from '../classes/Libro'
import { ModalLibroProp } from "../interfaces/LibroProps"
import Swal from 'sweetalert2'


export const Modal: React.FC<ModalLibroProp> = ({setLibros, editar, setEditar, resetForm, values, handleChange}) => {

  const {getLibros, saveToLocalStorage} = useLocalStorage('libros')

  const {nombre, autor, estado, fechaPublicacion, portada, id} = values


  const guardarLibro = () => {

    if (nombre == '' || autor == '' || estado == 0 || fechaPublicacion == '') {
      Swal.fire({
        buttonsStyling: false,
        icon: 'error',
        text: 'Tienes algunos campos vacíos en el formulario',
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: "btn btn-success",
        }
      })
      return
    }

    Swal.fire({
      buttonsStyling: false,
      icon: 'warning',
      text: '¿Estás seguro de que desea agregar este libro?',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton:"btn btn-danger ms-2"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const libros = getLibros()
        const libroObjeto = new LibroClass(nombre, autor, fechaPublicacion, {id: estado}, new Date().getTime(), portada || 'NA')
        saveToLocalStorage([...libros, libroObjeto])
        setLibros(getLibros())

        Swal.fire({
          buttonsStyling: false,
          icon: 'success',
          title: '¡Genial!',
          text: 'Libro creado correctamente',
          showConfirmButton: false,
          timer: 1000
        }).then(()=>{
          let elemento = document.querySelector('#cerrar_modal');
          if (elemento instanceof HTMLElement) {
              elemento.click();
              resetForm()
              setEditar(false)
          }
        })
      }
    })
  }

  const editarLibro = () => {

    if (nombre == '' || autor == '' || estado == 0 || fechaPublicacion == '') {
      Swal.fire({
        buttonsStyling: false,
        icon: 'error',
        text: 'Tienes algunos campos vacíos en el formulario',
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: "btn btn-success",
        }
      })
      return
    }

    Swal.fire({
      buttonsStyling: false,
      icon: 'warning',
      text: '¿Estás seguro de que desea editar este libro?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton:"btn btn-danger ms-2"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let libros = getLibros()
        
        libros = libros.map((libro) => {
          if (values.id == libro.id) {
            return new LibroClass(values.nombre, values.autor, values.fechaPublicacion, {id: values.estado}, values.id, values.portada || 'NA')
          } else {
            return libro
          }
        })
      
        saveToLocalStorage(libros)
        setLibros(getLibros())

        Swal.fire({
          buttonsStyling: false,
          icon: 'success',
          title: '¡Genial!',
          text: 'Libro actualizado correctamente',
          showConfirmButton: false,
          timer: 1000
        }).then(()=>{
          let elemento = document.querySelector('#cerrar_modal');
          if (elemento instanceof HTMLElement) {
              elemento.click();
              resetForm()
              setEditar(false)
          }
        })
      }
    })
  }

  return (
    <div className="modal fade" id="crear_libro" tabIndex={-1} aria-labelledby="crear-libro" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="crear-libro">{(editar == false ? 'Crear nuevo libro' : `Editar libro: ${id}`)}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className='row'>
              <div className="col-12 form-group">
                <label htmlFor="nombre" className='form-label'>Nombre del libro <span className='text-danger'>*</span></label>
                <input type="text" id='nombre' name='nombre' className='form-control' value={nombre} onChange={handleChange}/>
              </div>
              <div className="col-12 form-group mt-3">
                <label htmlFor="nombre_autor" className='form-label'>Nombre del autor <span className='text-danger'>*</span></label>
                <input type="text" id='nombre_autor' name='autor' className='form-control' value={autor} onChange={handleChange}/>
              </div>
              <div className="col-12 form-group mt-3">
                <label htmlFor="fecha_publicacion" className='form-label'>Fecha de publicación<span className='text-danger'>*</span></label>
                <input type="date" id='fecha_publicacion' name='fechaPublicacion' className='form-control' value={fechaPublicacion} onChange={handleChange}/>
              </div>
              <div className="col-12 form-group mt-3">
                <label htmlFor="portada" className='form-label'>Portada <span className='text-success'>(Pegar link)</span></label>
                <textarea name="portada" id="portada" className='form-control' value={portada} onChange={handleChange}></textarea>
              </div>
              <div className="col-12 form-group mt-3">
                <label htmlFor="estado" className='form-label'>Estado <span className='text-danger'>*</span></label>
                <select name="estado" id="estado" className='form-select' defaultValue={estado} onChange={handleChange}>
                  <option value={0}>Seleccione un estado...</option>
                  <option value={1}>Prestado</option>
                  <option value={2}>Dañado</option>
                  <option value={3}>Perdido</option>
                  <option value={4}>Disponible</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="cerrar_modal">Cancelar</button>
            {editar == false ? <button type="button" className="btn btn-primary" onClick={guardarLibro}>Guardar</button> : <button type="button" className="btn btn-primary" onClick={editarLibro}>Editar</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
