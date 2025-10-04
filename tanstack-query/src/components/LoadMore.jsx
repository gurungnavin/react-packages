
import {useInfiniteQuery } from "@tanstack/react-query";
import axios, { all } from "axios";
import { ImSpinner9 } from "react-icons/im";
import { BiError } from "react-icons/bi";


// Function to fetch paginated data
const loadMoreQuery = ({pageParam}) => {
  return axios.get(`http://localhost:3000/fruits/?_limit=5&_page=${pageParam}`)
};
const LoadMore = () => {  
  const {data, isLoading, isError, error, hasNextPage, isFetchingNextPage, fetchNextPage} = useInfiniteQuery({
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
    <div className='w-full h-full flex flex-col justify-start items-center py-8'>
      
      <div className='w-xl max-w-xl border border-black bg-blue-50 rounded-lg shadow-md p-4 mb-6 overflow-y-auto' style={{ maxHeight: '65vh' }}>
        {data?.pages?.flatMap(page =>
          page.data.map(fruit => (
            <div key={fruit.id} className='flex items-center gap-2 p-3 mb-3 border-2 bg-amber-500 text-white rounded-md shadow-sm hover:bg-amber-100 hover:text-black hover:scale-[1.03] transition'>
              <span className='font-bold text-amber-700'>{fruit.id}.</span>
              <span className='text-xl font-semibold'>{fruit.name}</span>
            </div>
          ))
        )}
        {isFetchingNextPage && (
          <div className='flex justify-center items-center py-4'>
            <ImSpinner9 className='animate-spin' size={"32px"} style={{ color: 'goldenrod' }} />
            <span className='ml-3 text-amber-700 font-medium'>Loading more...</span>
          </div>
        )}
      </div>

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className={`bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-6 rounded-md shadow transition disabled:bg-gray-400 disabled:cursor-not-allowed mb-2`}
        style={{ minWidth: '160px' }}
      >
        {isFetchingNextPage
          ? 'データ抽出中です...'
          : hasNextPage
            ? 'もっと見る'
            : 'これ以上のデータはありません'}
      </button>
    </div>
  );

};

export default LoadMore