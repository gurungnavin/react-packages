import { useMutation, useQuery } from '@tanstack/react-query'
import { ImSpinner9 } from "react-icons/im";
import { BiError } from "react-icons/bi";
import axios from 'axios'
import { useState } from 'react';

const Mutations = () => {

  const [ title, setTitle ] = useState('')
  const [ body, setBody ] = useState('')


  const updateTodos = (todo) => {
    return axios.post('http://localhost:3000/todos', todo)
  }

  const fetchTodos = () => {
    return axios.get('http://localhost:3000/todos')
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  })

  const {mutate} = useMutation({
    mutationFn: updateTodos,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const todos = {title, body}
    mutate(todos)
    console.log(title, body)
    setTitle('')
    setBody('')
  }

  if (isLoading) {
    return <div className='w-full h-screen flex justify-center items-center'>
      <ImSpinner9 className='animate-spin' size={"50px"} style={{ color: 'goldenrod' }} />
      <div>
        <h2 className='pl-8 text-2xl font-bold'>データ抽出中です.... <br /> <span className='text-lg font-light'>しばらくお待ちください!</span></h2>
      </div>
    </div>
  }

  if (isError) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <BiError className='animate-bounce' size={"70px"} style={{ color: 'red' }} />
        <div>
          <h2 className='pl-6 text-2xl font-bold text-red-600'>`${error}が発生しました....` <br /> <span className='text-lg font-light text-black'>ネットワークまたはURLを直してください!</span></h2>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-screen p-4 flex flex-col items-center '>
      <h2 className='text-center text-3xl font-semibold mb-2'>React Query - Mutations</h2>
      <form onSubmit={handleSubmit} className='mb-4'>
        <input
          type="text"
          placeholder='Title'
          className='border p-2 mx-2'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          placeholder='Title'
          className='border p-2 mx-2'
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
        <button className='bg-green-300 p-2 mx-2 text-xl font-bold cursor-pointer hover:bg-amber-500 active:scale-90 transition-all duration-150'>Add Todo</button>
      </form>
      <div className='w-full flex flex-col items-center gap-3 border-t pt-4'>
        {data?.data.map((e) => (
          <div key={e.id} className='w-1/2 bg-green-100 border '>
            <h3 className='uppercase font-bold text-center'><span className='mr-2'>{e.id}.</span>{e.title}</h3>
            <p className='text-center'>{e.body}</p>
          </div>
        ))
        }
      </div>
      <button
        className='bg-green-300 mt-2 p-2 mx-10 text-xl font-bold cursor-pointer hover:bg-amber-500 active:scale-90 transition-all duration-150'
        // Number 3, fetch data on button click
        onClick={() => refetch()}
      >Fetch Data on Click</button>
    </div>
  )
}

export default Mutations