import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs'
import { LibroProps } from '../interfaces/LibroProps'
import { useLocalStorage } from '../hooks/useLocalStorageLibros'
import { Libro as LibroClass } from '../classes/Libro'
import Swal from 'sweetalert2'

export const Libro: React.FC<LibroProps> = ({ libro, editar, handleChange, resetForm, setEditar, setLibros, values, setValues }) => {

  const { getLibros, saveToLocalStorage } = useLocalStorage('libros')

  const formatFecha = (fechaStr: string) => {
    const partes = fechaStr.split('-').map(part => parseInt(part, 10));
    const fecha = new Date(partes[0], partes[1] - 1, partes[2]); // Recuerda que los meses en JavaScript son 0-indexados
    return fecha.toLocaleDateString()
  }

  const editarLibro = (id: number) => {
    const libros: LibroClass[] = getLibros()
    const libro = libros.find((libro) => libro.id == id)
    if (libro) {
      setValues({ ...libro, estado: libro.estado.id })
      setEditar(true)
      const selectElement = document.getElementById('estado') as HTMLSelectElement;
      selectElement.value = libro.estado.id.toString();
    }
  }

  const eliminarLibro = (id:number) => {
    Swal.fire({
      buttonsStyling: false,
      icon: 'warning',
      text: '¿Estás seguro de que desea eliminar este libro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton:"btn btn-danger ms-2"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const libros = getLibros()
        const nuevos_libros = libros.filter((libro) => libro.id != id);
        saveToLocalStorage(nuevos_libros)
        setLibros(getLibros())

        Swal.fire({
          buttonsStyling: false,
          icon: 'success',
          title: '¡Genial!',
          text: 'Libro eliminado correctamente',
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
    <div className="col-12 col-xxl-2 col-lg-3 col-sm-6 d-flex justify-content-center align-items-center mt-5" id={`libro-${libro.id}`}>

      <div className="col-xxl-11 col-12 text-center card">
        <div className="col-12 imagen-card">
          {(libro.portada == 'NA') ? <img className="w-100 h-100" src="img/portada_no_encontrada.png" alt="portada" loading='lazy' /> : <img className="w-100 h-100" src={libro.portada} alt="portada" loading='lazy' />}
        </div>
        <div className="col-12 py-2 fw-bold text-primary">{libro.getNombreCorto()}</div>
        <div className="col-12 py-2 fw-bold">Autor</div>
        <div className="col-12 py-2">{libro.getNombreAutorCorto()}</div>
        <div className="col-12 py-2 fw-bold">Fecha de publicación</div>
        <div className="col-12 py-2">{formatFecha(libro.fechaPublicacion)}</div>

        {
          (libro.estado.id == 1)
            ? <div className="col-12 py-2 fw-bold bg-warning">Prestado</div>
            : (libro.estado.id == 2)
              ? <div className="col-12 py-2 fw-bold bg-danger text-light">Dañado</div>
              : (libro.estado.id == 3)
                ? <div className="col-12 py-2 fw-bold bg-dark text-light">Perdido</div>
                : (libro.estado.id == 4)
                  ? <div className="col-12 py-2 fw-bold bg-info">Disponible</div>
                  : ''
        }

        <div className="col-12 d-flex justify-content-around py-3">
          <button className="btn btn-primary col-5" data-bs-toggle="modal" data-bs-target="#crear_libro" onClick={(e) => { editarLibro(libro.id) }}><BsPencilFill /> Editar</button>
          <button className="btn btn-danger col-5" onClick={(e) => {eliminarLibro(libro.id)}}><BsFillTrashFill /> Eliminar</button>
        </div>
      </div>

    </div>
  )
}
