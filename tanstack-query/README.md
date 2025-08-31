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


