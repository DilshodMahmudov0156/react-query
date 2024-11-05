import React from 'react'
import { useQuery} from "@tanstack/react-query";

function App() {

  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
        fetch('https://api.github.com/repos/TanStack/query').then((res) =>
            res.json(),
        ),
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="app">

      <button onClick={()=> {console.log(data)}}>
        click me
      </button>

      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>

    </div>
  );
};

export default App
