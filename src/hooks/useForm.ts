import { useState } from "react"
import {FormInterface} from '../interfaces/Form'

export const useForm = (initialValues: FormInterface) => {

  const [values, setValues] = useState(initialValues);
  const [editar, setEditar] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Restablecer el formulario a sus valores iniciales
  const resetForm = () => {
    setValues(initialValues);
  };

  return {values, editar, handleChange, resetForm, setEditar, setValues};
}
