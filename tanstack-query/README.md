## What is React Query?
It is a library for fetching data in a React Application.

## Why?
1. Since React is a UI library, there is no specific pattern for data fetching.
2. We typically use the useEffect hook for data fetching and useState hook to maintain component state like loading, error state or the resulting data.
3. If the dat is needed throughout the app, then we tend to use state management libraries like Redux.
4. Most of the state management libraries are good for working with client state. Example: 'theme' for an application/ whether a modal is open.
5. State Management Libraries are not great for working with asynchronous or server state.

## Client VS Server State

### Client State
Persisted in our app memory and accessing or updation it is snychronous.

### Server State:
Persisted remotely and requires asnychronous APIs for fetching or updation.
Has shared ownership.
Data can be updated by someone else without our knowledge.

UI data may not be in sync with remote server/database data.

Challenging when we have to deal with caching, deduplication of multiple requests for the same data, updating state data in the background, performance optimizations in pagination and lazy-loading etc.



## Project Setup

1. New React project setup using CRA(Create React APP)
   - We can build our React project by our choice. 

2. Set up on API endpoint that serves mock data for use in our Application.
   "Using json-server package"

   -  a. Install json-server on React Project with ```npm install json-server```
   -  b. Create file on root of the React Project name : `db.json` or something else.
   -  c. Command on CLI : `npx json-server db.json`

3. Set up react router and a few routes in the application.

   -  a. Install React Router : `npm i react-router-dom` 
   -  b. Import what we need : `import {BrowerRouter, Link, Routes, Route} from 'react-router-dom'` 
   -  c. Wrap our app in `<BrowserRouter>` To enable routing
   -  d. Wrap our app in `<BrowserRouter>` To enable routing

   ```javascript
      <BrowserRouter>
         {/* Navigation links */}
         <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
         </nav>

         {/* Routing rules */}
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
         </Routes>
      </BrowserRouter>


   ```


4. Fetch data the traditional way using useEffect and useState.
Let's say we want to fetch a list of user from https://jsonplaceholder.typicode.com/users

      ```javascript
            import React, { useEffect, useState } from "react";

            function Users() {
            // State to store users
            const [users, setUsers] = useState([]);
            // State to track loading status
            const [loading, setLoading] = useState(true);
            // State to track errors
            const [error, setError] = useState(null);

            // Fetch data when the component mounts
            useEffect(() => {
               fetch("https://jsonplaceholder.typicode.com/users")
                  .then((response) => {
                  if (!response.ok) {
                     throw new Error("Network response was not ok");
                  }
                  return response.json();
                  })
                  .then((data) => {
                  setUsers(data);
                  setLoading(false);
                  })
                  .catch((err) => {
                  setError(err.message);
                  setLoading(false);
                  });
            }, []); // Empty array → run once when component mounts

            // Loading state
            if (loading) return <p>Loading...</p>;

            // Error state
            if (error) return <p>Error: {error}</p>;

            // Render user list
            return (
               <div>
                  <h2>User List</h2>
                  <ul>
                  {users.map((user) => (
                     <li key={user.id}>
                        {user.name} ({user.email})
                     </li>
                  ))}
                  </ul>
               </div>
            );
            }

            export default Users;

      ```

5. Data Fetching using useQuery(React Query/ Tanstack)

      ## 5.1. Inside `main.jsx`
      - 1a. in `main.jsx`
         ```js
         import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
         ```
         Import QueryClient and QueryClentProvider.

      - 1b. Create Query Client Instance
         ```javascript
         const queryClient = new QueryClient();
         ```

      - 1c. Wrap `<App />` with `<QueryClientProvider>`
         ```javascript
         <QueryClientProvider client={queryClient}>
            <App />
         </QueryClientProvider>
         ```

      ## 5.2. Inside `PQPosts.jsx`

      - 2a. in `PQPosts.jsx`
         ```js
         import { useQuery } from '@tanstack/react-query'
         ```
         Import useQuery from tanstack/react-query.

      - 2b. Data fetch from React Query/Tanstack.

         Use React Query’s useQuery to fetch data by destructuring `data`, `isLoading`, `isError`, and `error`. Pass a `queryKey:`(group name: posts) to identify the query and a queryFn that fetches data (e.g., axios.get) and returns res.data.

         ```javascript   
         const { data, isLoading, isError, error } = useQuery({
         queryKey: ["posts"],
         queryFn: () => {
            return axios.get('http://localhost:3000/posts')
            }
         })
         ```

      - 2c. Map the data and handle loading and error states easily.
         - After fetching data with React Query, use data.map() to render items.
         - Use isLoading to show a loading message while data is fetching.
         - Use isError and error to display errors if the fetch fails.


6. DevTools

   React Query DevTools let us inspect, debug, and manage queries and cached data in real time.

   - Setup DevTools
      1.  install package with command : `npm i @tanstack/react-query-devtools`
      2. Import `ReactQueryDevtools` on `main.jsx`
      3. Inside `<QueryClientProvider>` after `<App />`, `<ReactQueryDevtools initialIsOpen = {false}>` "DONE"




7. Query Cache

   `Query Cache` is React Query's built-in `storage` that saves server `data`. It makes apps faster by instantly showing cached content when users return the same pages, cutting load times and network use, while silently updating if the server data changes.

   ### Two important cache settings in React Query
   
   1. staleTime

      `staleTime` is used to define how long fetched data is considered fresh, preventing unnecessary refetches during that period.

   - How long cached data is considered usable without refetching.
   - While fresh → React Query **does not request the server**.
   - After it expires → data becomes **stale**, and the next query may trigger a **background refetch**.

   2. cacheTime
   - How long unused cached data stays in memory before being removed.
   - Even stale data is kept until **cacheTime** ends.
   - After that → the next query triggers a **full reload**.

   ```javascript
   const { data, isLoading } = useQuery(["users"],
    () => axios.get("/api/users").then(res => res.data),
      {
         staleTime: 10000,  // 10 seconds
         cacheTime: 60000,  // 1 minute
      }
    );

   ```

   - staleTime = prevent unnecessary automatic requests
   - cacheTime = how long data is stored in memory

8. Polling  

   `Polling` in React Query means automatically refetching data from the server at regular intervals. It is useful for real-time applications like trading dashboards or live result displays.

   React Query offers two key options for polling:

   1. `refetchInterval` – Sets how often data should be refetched (e.g. every 5 seconds). It only works while the app is in the foreground (i.e., the tab is active).

   2. `refetchIntervalInBackground`: true – Keeps polling active even when the app is in the background (e.g., user switches tabs or minimizes the browser).


   ```javascript
   const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get('http://localhost:3000/posts')
    },
    refetchInterval: 4000, // 4 seconds
    refetchIntervalInBackground: true, // refetch even when the window is not focused
    })
   ```

9. USEQUERY on Click 

   To fetch data only when a user triggers an event (e.g., clicking a button), you can configure useQuery like this:

   Set **enabled: false** – This prevents the query from running automatically when the component mounts.

   Manually trigger the query using the **refetch()** function returned by useQuery.

   ```javascript
    // Number 2, 👇use refetch function to fetch data on button click
   const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get('http://localhost:3000/posts')
    },
    enabled: false // 👈 Number 1, disable automatic query on mount
   })
   ```
   Add a button to trigger refetching through a click event.
   ```HTML
   <button onClick={() => refetch()}>
      Fetch Data on Click
   </button>
   ```


10. QUERY by ID 

      A `Query by ID` means we use a unique identifier to fetch a specific item's details. It's a simple way to get exact the data we need for one partificular items.

   - How to Setup Query by ID
   1. `Create the Detail page` : Make a page that shows the details for a single item

      ```javascript
      const { postId } = useParams(); // get id of every items
      const navigate = useNavigate();  // Initialize useNavigate hook for use back.

      const fetchPostDetails = () => axios.get(`http://localhost:3000/posts/${postId}`);
      const { data, isLoading, isError, error } = useQuery({
      queryKey: ['posts', postId],
      queryFn: fetchPostDetails,      
      });

      const { title = "No Title", image = "" } = data?.data || {};
      // destructing titile and image from data

      return (
      <button
        onClick={() => navigate(-1)}  // Navigate back to the previous page
      >
        Go Back
      </button>

         // Rest of the codes.....
      )

      ```
   2. `Setup the Route` : Add a route like *** /posts/postId *** so each item has its own URL.

      ```javascript
      <Route path='/rqposts/:postId' element= {<PostDetailsRQ />}/>
      ```

   3. `Link with an anchor tag` : Wrap it in a clickable link so when users click, they can go straight to that detail page.

      ```javascript
      {data?.data.map((e) => (
          <Link to={`/rqposts/${e.id}`} key={e.id}>
         // Wrap content in a clickable link to take users directly to the detail page.
         <div key={e.id} className=' bg-white rounded-bl-xl rounded-br-2xl h-full p-2'>
            <img src={e.image} alt="" />
            <h3 className='uppercase font-bold text-center py-4'>{e.title}</h3>
         </div>
         </Link>
      ))
      }
      ```

---

11. Infinite Scroll(Load More) 

      Infinite Scroll in React Query loads data in pieces and fetches more when you scroll or click a button.

      For infinite scrolling, we are using useInfiniteQuery instead of useQuery. The useInfiniteQuery hook allows us to use:

      `1. hasNextPage`: To check if there’s more data to load.

      `2. isFetchingNextPage`: To check if the next page is currently being fetched.

      `3. fetchNextPage`: Function to trigger fetching the next page.
      
      `4. data`: Contains the paginated data (usually in pages).
      
      `5. getNextPageParam`: To determine the next page's pageParam.

      `6. initialPageParam`: Sets the initial pageParam (e.g., starting at 1).


      ```javascript
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
      ```
   - This code fetches a paginated list of fruits from a local server using useInfiniteQuery from React Query. It starts from page 1 and loads 5 items at a time. When the user triggers fetchNextPage, it loads the next set of fruits, stopping after 4 pages. The function manages loading, errors, and tracks if there's more data to fetch, making it easy to implement an infinite scroll or "Load More" button.

      ---
      Return the Data with JSX.

      ```HTML

      <div>
        {data?.pages?.flatMap(page =>
          page.data.map(fruit => (
            <div key={fruit.id}>
              <span>{fruit.id}.</span>
              <span>{fruit.name}</span>
            </div>
          ))
        )}

        {isFetchingNextPage && (
          <div>
            <ImSpinner9 />
            <span>Loading more...</span>
          </div>
        )}
      </div>

      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage
          ? 'データ抽出中です...'
          : hasNextPage
            ? 'もっと見る'
            : 'これ以上のデータはありません'}
      </button>
      ```

12. Infinite Scroll(While Scrolling: Data will fetch)


