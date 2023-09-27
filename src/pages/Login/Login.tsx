import { useForm } from "../../hooks/useForm"

export const Login = ({saveToLocalStorage, setAutenticado}) => {

  const {values, setValues, handleChange} = useForm({'usuario': '', 'password': ''})

  const {usuario, password} = values

  const onLogin = () => {
    if (usuario != '' && password != '' ) {
      saveToLocalStorage({
        "usuario": usuario,
        "password": password
      })
      setAutenticado(true)
    }
  }



  return (
    <div className="bg-danger d-flex justify-content-center align-items-center flex-xl-row flex-column" style={{ height: 'auto', minHeight: '100vh' }}>
      <div className="row bg-white w-100 h-50" style={{ minHeight: '100vh' }}>
        <div className="col-xl-4 bg-danger d-none d-xl-block imagen-login">
          
        </div>
        <div className="col-xl-8 d-flex justify-content-center align-items-center px-2 px-xl-5">
          <div className="col-12 h-100 d-flex justify-content-center align-items-center px-2 px-xl-5 flex-column">
            <h1>Iniciar sesión</h1>
            <form className='row mt-4'>
              <div className="col-12 form-group">
                <label htmlFor="usuario" className='form-label'>Usuario <span className='text-danger'>*</span></label>
                <input type="text" id='usuario' name='usuario' className='form-control' value={usuario} onChange={handleChange} />
              </div>
              <div className="col-12 form-group mt-3">
                <label htmlFor="password" className='form-label'>Contraseña <span className='text-danger'>*</span></label>
                <input type="password" id='password' name='password' className='form-control' value={password} onChange={handleChange} />
              </div>
              <div className="col-12">
                <button type="button" className="w-100 btn btn-primary mt-4" onClick={() => {onLogin()}}>Iniciar sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
