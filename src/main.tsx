import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { MainLayout } from "./layouts/MainLayout"
import { HomePage } from "./pages/HomePage"
import { NotFoundPAge } from "./pages/NotFoundPage"
import { HelpersPage } from './pages/HelpersPage';
import { ChatsPage } from './pages/ChatsPage'

import { TestPage } from './pages/TestPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MainLayout/> }>
          <Route index element={ <HomePage/> } />
          <Route path='helpers' element={ <HelpersPage/> } />
          <Route path='chats' element={ <ChatsPage/> } />
          <Route path='test' element={ <TestPage/> } />
          <Route path='*' element={ <NotFoundPAge/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
