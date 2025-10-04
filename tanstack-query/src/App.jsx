import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Posts from './components/Posts';
import RQPosts from './components/RQPosts';
import PostDetailsRQ from './components/PostDetailsRQ';
import PaginationRQuery from './components/PaginationRQuery';
import LoadMore from './components/LoadMore';
import ScrollingDataWithQuery from './components/ScrollingDataWithQuery';
import Mutations from './components/Mutations';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section>
      {/* Header */}
      <header className="w-full flex justify-between px-24 py-4 shadow-md fixed top-0 left-0 bg-orange-100 z-50">
        <Link to="/">
          <h1 className="text-3xl uppercase font-bold">
            Lo<span className="text-red-400">go</span>
          </h1>
        </Link>

        <button className="md:hidden text-3xl" onClick={() => setMenuOpen(true)}>
          ☰
        </button>

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

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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

      {/* Route-based content */}
      <main className="pt-20 px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/rqposts" element={<RQPosts />} />
          <Route path="/rqposts/:postId" element={<PostDetailsRQ />} />
          <Route path="/paginationrquery" element={<PaginationRQuery />} />
          <Route path="/loadmore" element={<LoadMore />} />
          <Route path="/scrolling" element={<ScrollingDataWithQuery />} />
          <Route path="/mutations" element={<Mutations />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </section>
  );
};

export default App;
