import React from 'react'
import Posts from './components/Posts'

const App = () => {
  return (
    <div className='w-full h-screen bg-green-200 flex items-center justify-center'>
      <div className= 'p-5 rounded-tl-2xl flex flex-col gap-5 justify-center items-center'>
        <h2 className='text-4xl'>Posts</h2>
      <Posts />
      </div>
    </div>
  )
}

export default App
