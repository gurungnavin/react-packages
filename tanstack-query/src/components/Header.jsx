import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Posts from './Posts'
import RQPosts from './RQPosts'
import PostDetailsRQ from './PostDetailsRQ'
import PaginationRQuery from './PaginationRQuery'
import LoadMore from './LoadMore'
import ScrollingDataWithQuery from './ScrollingDataWithQuery'
import Mutations from './Mutations'
import { useState } from 'react'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <BrowserRouter>
      {/* Header */}
      <header className="w-full flex justify-between px-24 py-4 shadow-md fixed top-0 left-0 bg-orange-100 z-50">
        <Link to='/'>
          <h1 className='text-3xl uppercase font-bold'>Lo<span className='text-red-400 '>go</span></h1>
        </Link>


        {/* Hamburger Icon */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-lg font-semibold">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/rqposts">RQpost</Link>
          <Link to="/paginationrquery">Pagination</Link>
          <Link to="/loadmore">Loadmore</Link>
          <Link to="/scrolling">Scrolling</Link>
          <Link to="/mutations">Mutation</Link>
        </nav>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-2xl">
            ❌
          </button>
        </div>
        <nav className="flex flex-col gap-4 p-6 text-lg font-semibold">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/posts" onClick={() => setMenuOpen(false)}>Posts</Link>
          <Link to="/rqposts" onClick={() => setMenuOpen(false)}>RQPosts</Link>
          <Link to="/paginationrquery" onClick={() => setMenuOpen(false)}>Pagination</Link>
          <Link to="/loadmore" onClick={() => setMenuOpen(false)}>Loadmore</Link>
          <Link to="/scrolling" onClick={() => setMenuOpen(false)}>Scrolling</Link>
          <Link to="/mutations" onClick={() => setMenuOpen(false)}>Mutation</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pt-20 px-6">
        <Routes>
        <Route path='/' element= {<Home />} />
        <Route path='/posts' element= {<Posts />} />
        <Route path='/rqposts' element= {<RQPosts />} />
        <Route path='/rqposts/:postId' element= {<PostDetailsRQ />}/>
        <Route path = '/paginationrquery' element= {<PaginationRQuery />}/>
        <Route path = '/loadmore' element= {<LoadMore />}/>
        <Route path = '/scrolling' element= {<ScrollingDataWithQuery />}/>
        <Route path = '/mutations' element= {<Mutations />}/>
      </Routes>

      </main>
    </BrowserRouter>
  );
}

export default Header