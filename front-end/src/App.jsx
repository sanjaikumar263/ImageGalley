import React from 'react'
import Create from './Component/Create/Create'
import Login from './Component/Authantication/Login'
import Nav from './Component/Nav/Nav'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Component/Authantication/Signup'
import View from './Component/Read/View'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path={"/"} element={<Signup/>} />
        <Route path={"/login"} element={<Login/>}/>
        <Route>
          <Route path={"/upload"} element={<Create/>}/>
          <Route path={'/view'} element={<View/>}/>
        </Route>
      </Routes>
    
      </BrowserRouter>
     
    </div>
  )
}

export default App
