import React, { useEffect, useState } from 'react'
import { ImSpinner9 } from "react-icons/im";
import { BiError } from "react-icons/bi";
import axios from 'axios'

const Posts = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  // without axios
  // useEffect(()=>{
  //   // Fetch data from the local file.
  //   fetch("http://localhost:3000/posts").then((res)=> res.json())
  //   .then((data) => {setList(data)
  //     setLoading(false)
  // })
  // .catch((error) => {
  //   console.log("Failed to fetch Data", error);
  //   setLoading(false)
  // });
  // }, [])



  // with axios

  const fetchData = async () => {
    try {
      setLoading(true); // Immediately show loading

      // Wait 5 seconds first
      // await new Promise(resolve => setTimeout(resolve, 5000));

      const response = await axios.get('http://localhost:3000/posts')
      setList(response.data)
      setLoading(false)

    } catch (error) {
      console.log("Failed to fetch Data", error);
      setLoading(false)
      setError(true)
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <div className='w-full h-screen flex justify-center items-center'>
      <ImSpinner9 className='animate-spin' size={"50px"} style={{ color: 'goldenrod' }} />
      <div>
        <h2 className='pl-8 text-2xl font-bold'>データ抽出中です.... <br /> <span className='text-lg font-light'>しばらくお待ちください!</span></h2>
      </div>
    </div>
  }

  if (error) {
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
    <h2 className='text-center pt-28 text-5xl font-semibold'>Tranditional API Fetch</h2>
      <div className='w-full grid grid-cols-3 md:grid-cols-4 gap-4 px-48 h-52 pt-16'>
        {
          list.map((data) => (
            <div key={data.id} className=' bg-white rounded-bl-xl rounded-br-2xl h-full p-2'>
              <img src={data.image} alt="" />
              <h3 className='uppercase font-bold text-center py-4'>{data.title}</h3>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Posts