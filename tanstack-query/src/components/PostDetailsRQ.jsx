import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from "react-icons/im";
import { BiError } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";





const PostDetailsRQ = () => {
  const { postId } = useParams();
  const navigate = useNavigate();  // Initialize useNavigate hook

  const fetchPostDetails = () => axios.get(`http://localhost:3000/posts/${postId}`);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', postId],
    queryFn: fetchPostDetails,
  });

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

  const { title = "No Title", image = "" } = data?.data || {};

  return (
    <div className="w-full h-screen p-8 flex items-center justify-center flex-col">
      <button
        onClick={() => navigate(-1)}  // Navigate back to the previous page
        className="mt-12 mb-2 bg-gray-500 text-black py-2 px-3 rounded-lg hover:bg-black  hover:text-white transition-all duration-150 self-start"
      >
        <IoChevronBackOutline />
      </button>
      <div className="w-xs flex justify-center items-center flex-col bg-amber-50 p-3 rounded-lg shadow-md">
        {image && (
          <img src={image} alt={title} className="w-xs h-auto rounded-lg shadow-lg" />
        )}
      <h2 className="text-center text-3xl font-bold my-4">{title}</h2>
      <p className="text-center text-sm max-w-2xl">
        {data?.data?.description || "No Description Available."}
      </p>
      </div>
    </div>
  );
};

export default PostDetailsRQ;
