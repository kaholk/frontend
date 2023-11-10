import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { MainLayout } from "./layouts/MainLayout"
import { HomePage } from "./pages/HomePage"
import { NotFoundPAge } from "./pages/NotFoundPage"
import { HelpersPage } from './pages/HelpersPage';
import { ChatsPage } from './pages/ChatsPage'
import { RegisterPage } from "./pages/RegisterPage"

import { TestPage } from './pages/TestPage'

import { DevTools } from 'jotai-devtools';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* style={{position: "absolute", zIndex: "9999", right: 0, bottom: 0, width: "900px", height: "800px", transform: "translate3d(0px, 0px, 0px)"}} */}
    <div >
      <DevTools theme='dark' isInitialOpen/>
    </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <MainLayout/> }>
            <Route index element={ <HomePage/> } />
            <Route path='helpers' element={ <HelpersPage/> } />
            <Route path='chats' element={ <ChatsPage/> } />
            <Route path='test' element={ <TestPage/> } />
            <Route path='register' element={ <RegisterPage/> } />
            <Route path='*' element={ <NotFoundPAge/> } />
          </Route>
        </Routes>
      </BrowserRouter>
  </StrictMode>
)
