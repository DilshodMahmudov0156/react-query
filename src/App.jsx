import React from 'react'
import { useQuery} from "@tanstack/react-query";

function App() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
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

            <br/><br/>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 border rounded p-3">
                        <table className="table table-bordered">
                            <tbody>
                                {
                                    data.map((user, index) => {
                                        return(
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default App
