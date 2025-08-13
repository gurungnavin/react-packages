import React from 'react'
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'
import Posts from './Posts'
import RQPosts from './RQPosts'
import Home from './Home'

const Header = () => {
  return (
    <BrowserRouter>
    <header className='w-full flex justify-between px-48 py-6 shadow-xl absolute top-0 left-0 z-20'>
      <Link to='/'>
      <h1 className='text-4xl uppercase font-bold'>Lo<span className='text-red-400 '>go</span></h1>
      </Link>
      <nav className='flex gap-12 font-bold text-xl'>
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts</Link>
        <Link to='/rqposts'>RQPost</Link>
      </nav>
    </header>
      <Routes>
        <Route path='/' element= {<Home />} />
        <Route path='/posts' element= {<Posts />} />
        <Route path='/rqposts' element= {<RQPosts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Header