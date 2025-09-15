import React from 'react'
import { ImSpinner9 } from "react-icons/im";
import { BiError } from "react-icons/bi";
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const RQPosts = () => {
  // Number 2, use refetch function to fetch data on button click
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get('http://localhost:3000/posts')
    },
    enabled: false // Number 1, disable automatic query on mount
   
  })

  console.log(isFetching, error)

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
          <h2 className='pl-6 text-2xl font-bold text-red-600'>エラーが発生しました.... <br /> <span className='text-lg font-light text-black'>ネットワークまたはURLを直してください!</span></h2>
        </div>
      </div>
    )
  }


  return (
    <>
      <h2 className='text-center pt-28 text-5xl font-semibold'>React Query</h2>

      
      <button 
      className='bg-amber-400 p-4 mx-20 my-1 text-3xl cursor-pointer rounded-xl hover:bg-amber-500 active:scale-90 transition-all duration-150'
      // Number 3, fetch data on button click
      onClick={() => refetch()}
      >Fetch Data on Click</button>
      <div className='w-full grid grid-cols-3 md:grid-cols-4 gap-4 px-48 h-52 py-16'>
        {data?.data.map((e) => (
          <div key={e.id} className=' bg-white rounded-bl-xl rounded-br-2xl h-full p-2'>
            <img src={e.image} alt="" />
            <h3 className='uppercase font-bold text-center py-4'>{e.title}</h3>
          </div>
        ))
        }
      </div>
    </>
  )
}

export default RQPosts