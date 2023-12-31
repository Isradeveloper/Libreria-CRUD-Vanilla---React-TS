import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {HashRouter} from 'react-router-dom'
import './index.css'
import { Main } from './routers/Main.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Main />
  </HashRouter>,
)
