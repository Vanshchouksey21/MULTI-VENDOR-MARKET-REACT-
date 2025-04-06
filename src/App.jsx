import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Productdetails from './pages/Productdetails'
import Contact from './pages/Contact'
import About from './pages/About'
import Kitchen from './pages/kitchen'
import SearchResults from './pages/SearchResults'
import HomeEntertainment from './pages/home-appliances'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
          <Route path='categories/kitchen' element={<Kitchen />} />
          <Route path='categories/home-appliances' element={<HomeEntertainment />} />
          <Route path='/productdetails/:id' element={<Productdetails />} />
          <Route path='home/productdetails/:id' element={<Productdetails />} />
          <Route path="/search" element={<SearchResults />} />
         
          <Route path="/categories/all" element={<Home />} />

        </Route>

       
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
