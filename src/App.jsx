import React from 'react'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

function App() {

    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('http://localhost:3000/users').then((res) =>
                res.json(),
            ),
        refetchInterval: 10000
    });

    const removeData = () => {
        queryClient.removeQueries(['repoData']);
    };

    const addNew = (user) => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(user)
        })
        queryClient.invalidateQueries({queryKey: ['repoData']})
    }

    if (isLoading) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;


    return (
        <div className="app">

            <button onClick={()=> {removeData()}}>
                click me
            </button>
            <button className="btn btn-success" onClick={() => {
                addNew(
                    {
                        id: 4,
                        name: "Somebody",
                        email: "somebody@gmail.com",
                        country: "Somewhere"
                    }
                )
            }}>
                add
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
                                                <td>{user.country}</td>
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
