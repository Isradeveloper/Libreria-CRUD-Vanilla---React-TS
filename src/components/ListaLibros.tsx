import { ListadoLibrosProps } from '../interfaces/LibroProps';
import {Libro} from './Libro';


export const ListaLibros:React.FC<ListadoLibrosProps> = ({libros, editar, handleChange, resetForm, setEditar, setLibros, values, setValues}) => {

  return (
    <div className="row mx-xxl-5 mx-0 mb-5 g-3">
        {/* <Libro libro={new LibroClass('Roronoa Zoroddddddddd', 'Hola bbdddddddddddddddddddddddddd', new Date(), {nombreEstado: 'Pendiente', id: 1}, 1, "https://elcomercio.pe/resizer/u3n8JeAtvQH2kj_rUsy9PD85USQ=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/J5TZJL65YBB2JN5TCPZBJVNJTQ.webp")}/> */}
        {
          libros.map((libro, index) => (
            <Libro libro={libro} key={index} setLibros={setLibros} editar={editar} setEditar={setEditar} resetForm={resetForm} values={values} handleChange={handleChange} setValues={setValues} />
          ))
        }
    </div>
  )
}
