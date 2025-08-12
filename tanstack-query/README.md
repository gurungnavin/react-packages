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
2. Set up on API endpoint that serves mock data for use in our Application.
3. Set up react router and a few routes in the application.
4. Fetch data the traditional way using useEffect and useState.
