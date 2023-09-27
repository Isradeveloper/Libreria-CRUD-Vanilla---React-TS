import { useEffect, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Routes, Route, Navigate } from 'react-router-dom'
import App from "../App"
import { Login } from "../pages/Login/Login"


export const Main = () => {

  const {getLocalStorage, saveToLocalStorage} = useLocalStorage('usuario')

  const [usuario, setUsuario] = useState({})
  const [autenticado, setAutenticado] = useState(false)
  const { usuario:username } = usuario

  useEffect(() => {
    const usuarioLocalStorage = getLocalStorage()
    if (usuarioLocalStorage) {
      setUsuario(usuarioLocalStorage)
      setAutenticado(true)
    } else {
      setUsuario({})
      setAutenticado(false)
    }
  }, [autenticado])
  

  return (
    <Routes>
      {
        (autenticado == true) ? (
          <>
            <Route path="/home" element={<App nombre={username} saveToLocalStorage={saveToLocalStorage} setAutenticado={setAutenticado}/>}/>
            <Route path="*" element={<Navigate to={'/home'}/>}/>
          </>
        ): (
          <>
            <Route path="/login" element={<Login saveToLocalStorage={saveToLocalStorage} setAutenticado={setAutenticado}/>}/>
            <Route path="*" element={<Navigate to={'/login'}/>}/>
          </>
        )
      }
    </Routes>
  )
}
