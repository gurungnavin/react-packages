import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { BiError } from "react-icons/bi";


// Function to fetch paginated data
const paginationrquery = (pageId) => {
  return axios.get(`http://localhost:3000/fruits/?_limit=5&_page=${pageId}`)
};
const PaginationRQuery = () => {
  const [page, setPage] = useState(1);

  // Corrected useQuery hook
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['fruits', page], // Include page in the query key for pagination
    queryFn: () => paginationrquery(page), // Pass function reference
    placeholderData : keepPreviousData,
  });

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
          <h2 className='pl-6 text-2xl font-bold text-red-600'>エラーが発生しました.... <br /> <span className='text-lg font-light text-black'>ネットワークまたはURLを直してください!</span></h2>
        </div>
      </div>
    );
  }

  // Data display
return (
  <div className="w-full h-screen flex flex-col items-center justify-center gap-8 p-6">
    {/* Fruits List */}
    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data?.data.map(item => (
        <div
          key={item.id}
          className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-xl font-semibold text-center text-gray-800">{item.name}</h3>
        </div>
      ))}
    </div>

    {/* Pagination Controls */}
    <div className="flex justify-center gap-8">
      <button
        className={`p-3 text-lg font-medium rounded-full transition-all duration-300 ${
          page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-amber-400 hover:bg-amber-500'
        }`}
        onClick={() => setPage(prev => prev - 1)}
        disabled={page === 1} // Disable button on first page
      >
        Previous
      </button>
      <button
        className={`p-3 text-lg font-medium rounded-full transition-all duration-300 ${
          page === 6 ? 'bg-gray-300 cursor-not-allowed' : 'bg-amber-400 hover:bg-amber-500'
        }`}
        onClick={() => setPage(prev => prev + 1)}
        disabled={page === 6} // Disable button on last page
      >
        Next
      </button>
    </div>
  </div>
);

};

export default PaginationRQuery;
