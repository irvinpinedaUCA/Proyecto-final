import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

export default function Login() {
    const { login, token } = useUserContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);


    const onChange = (e, saveimput) => {
        saveimput(e.target.value);
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const log = await login(username, password);
        setError(!log);
        setUsername("");
        setPassword("");
    }
    if (token) {
        console.log("todo ok")

        return <Navigate replace to="/redirect" />
    }

    return (
        <section className="flex flex-col md:flex-row h-screen items-center">

            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                <img src="https://source.unsplash.com/random" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="bg-white w-full md:max-w-md lg:max-w-full  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
                flex items-center justify-center">

                <div className="w-full h-100">


                    <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Iniciar sección</h1>

                    <form onSubmit={onSubmitHandler} className="mt-6" action="#" method="POST">
                        <div>

                            {error && <p className="w-full rounded p-3 text-center text-red-500 font-roboto  border-2 border-red-500 select-none">
                                Usuario o contraseña incorrecta
                            </p>}

                            <label className="block text-black">Nombre de usuario</label>
                            <input className="font-medium w-full text-black focus:outline-none focus:ring focus:ring-green-500 p-2 rounded"
                                type='text'
                                value={username}
                                placeholder='Usuario'
                                onChange={(e) => onChange(e, setUsername)}
                            />

                        </div>

                        <div className="mt-4">
                            <label className="block text-black">Contraseña</label>
                            <input className="font-medium w-full text-black focus:outline-none focus:ring focus:ring-green-500 p-2 rounded"
                                type="password"
                                placeholder="******************"
                                onChange={(e) => onChange(e, setPassword)}
                                value={password}
                            />
                        </div>



                        <button className="mt-6 w-full py-2 px-2 transition rounded border border-green-500 duration-300 text-xl text-bold uppercase bg-green-500 hover:bg-green-400  text-gray-100">Iniciar sesion </button>
                    </form>

                    <hr className="my-6 border-gray-300 w-full" />




                </div>
            </div>

        </section>
    );
}



