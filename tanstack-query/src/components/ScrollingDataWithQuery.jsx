
import {useInfiniteQuery } from "@tanstack/react-query";
import axios, { all } from "axios";
import { ImSpinner9 } from "react-icons/im";
import { BiError } from "react-icons/bi";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";


// Function to fetch paginated data
const loadMoreQuery = ({pageParam}) => {
  return axios.get(`http://localhost:3000/fruits/?_limit=15&_page=${pageParam}`)
};
const ScrollingDataWithQuery = () => {  
  const {data, isLoading, isError, error, isFetchingNextPage, fetchNextPage} = useInfiniteQuery({
    queryKey : ['fruits'],
    queryFn : loadMoreQuery,
    initialPageParam: 1,
    getNextPageParam : (_lastPage, allPages) => {
      if(allPages.length < 4){
        return allPages.length + 1
      }else{
        return undefined
      }
    }
  })

  const {ref, inView} = useInView()

  useEffect(()=> {
    if(inView){
      fetchNextPage()
    }
  },[fetchNextPage, inView])
  
  // console.log(data, "data");
  // Loading state
  if (isLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <ImSpinner9 className='animate-spin' size={"50px"} style={{ color: 'goldenrod' }} />
        <div>
          <h2 className='pl-8 text-2xl font-bold'>データ抽出中です.... <br /> <span className='text-lg font-light'>しばらくお待ちください!</span></h2>
        </div>
      </div>
    );
  }
  
  // Error state
  if (isError) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <BiError className='animate-bounce' size={"70px"} style={{ color: 'red' }} />
        <div>
          <p>{error.message}</p>
          <h2 className='pl-6 text-2xl font-bold text-red-600'>エラーが発生しました.... <br /> <span className='text-lg font-light text-black'>ネットワークまたはURLを直してください!</span></h2>
        </div>
      </div>
    );
  }

  
  
  // Data display
  return (
    <div className='w-full h-full flex flex-col items-center bg-gray-50'>
      <h2 className='text-center text-3xl font-semibold'>React Query</h2>
  <div className='w-full h-full flex justify-center bg-gray-50 py-2'>

  <div className='w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-3 xl:gap-4 2xl:gap-6 
    border border-black rounded-lg bg-white shadow-md p-4 mx-16'>
    
    {data?.pages?.flatMap(page =>
      page.data.map(fruit => (
        <div 
          key={fruit.id} 
          className='flex flex-col items-center p-2 border-2 bg-amber-300 rounded-md shadow-sm hover:bg-amber-100 hover:scale-[1.03] transition'
        >
          <img 
            src={fruit.image} 
            alt={fruit.name} 
            className='w-full h-24 object-cover rounded-md mb-2' 
          />
          <p className='font-bold text-amber-700 text-sm sm:text-base'><span className="mr-2">{fruit.id}</span>{fruit.name}</p>
          <p className='text-xs text-gray-700 mt-1 text-center'>{fruit.description}</p>
        </div>
      ))
    )}
  </div>

</div>



      <div ref={ref}>
        {isFetchingNextPage && "Loading more..."}  
      </div>

      
    </div>
  );

};

export default ScrollingDataWithQuery