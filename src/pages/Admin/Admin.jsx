import React from 'react'
import { useUserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import programmer from '../../assets/img/programmer.png'
import Logoutimg from '../../assets/img/logoutimg.png'
import Plus from '../../assets/img/plus.png'
import { useState, useEffect } from "react";
import AdminDataPost from '../../Components/Data/AdminDataPost.js'
import AllDataNolike from '../../Components/Data/AllDataNolike'
import AddNewPost from '../../Components/AddPost/AddNewPost'
import ButtonNext from '../../Components/Button/ButtonNext'
import ButtonBack from '../../Components/Button/ButtonBack'
import Swal from 'sweetalert2'

export default function Admin() {

    const [userData, setUserData] = useState([])
    const [adminData, setAdminData] = useState([])
    const navigate = useNavigate()
    const { logout } = useUserContext()
    const [pageAdmin, setPageAdmin] = useState(0)
    const [pageUser, setPageUser] = useState(0)
    const AdminToken = localStorage.getItem('token');
    const [show, setShow] = useState(0)
    const logoutHandler = () => {
        logout()
        navigate("/login")
    }



    {/************************************************************************* 
    --------------------------------PAGINATION------------------------------ 
    ************************************************************************* */ }
    const handlerButton = (text, type) => {
        if (type === "admin") {
            if (text === "back") {
                pageAdmin > 0 ? setPageAdmin(pageAdmin - 1) : setPageAdmin(0);
            } else if (text === "next") {
                setPageAdmin(pageAdmin + 1);
            }

        } else if (type === "user") {

            if (text === "back") {
                pageUser > 0 ? setPageUser(pageUser - 1) : setPageUser(0);
            } else if (text === "next") {
                setPageUser(pageUser + 1);
            }

        }
    }

    const getAdminData = () => {
        setShow(1)
    }


    {/************************************************************************* 
    --------------------------------ADD NEW POST------------------------------ 
    ************************************************************************* */ }

    const [posted, setPosted] = useState([]);
    const onAdd = async (title, description, image) => {
        await fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/create`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${AdminToken}`
            },
            body: JSON.stringify({
                title: title,
                description: description,
                image: image,
            })
        }).then((res) => {
            if (res.status !== 201) {
                return;
            } else {
                return res.json();
            }
        })
            .then((data) => {
                setPosted(posted => [...posted, data?.data]);
                Swal.fire({
                    icon: 'success',
                    title: 'Good job!',
                    text: '¡El post fue agregado con éxito!',
                });
                getAdminData()
                console.log(posted);
            })
            .catch((err) => {
                console.log(err);

            });
    };

    {/************************************************************************* 
    --------------------------------GET ADMIN POST------------------------------ 
    ************************************************************************* */ }
    useEffect(() => {

        fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/owned?limit=3&page=${pageAdmin}`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${AdminToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("this is the data", data.data)
                setAdminData(data.data)
            })
            .catch(err => console.log(err))
        setShow(0)
    }, [pageAdmin, show])





    {/************************************************************************* 
    --------------------------------GET ALL USER POST------------------------------ 
    ************************************************************************* */ }
    useEffect(() => {

        fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=12&page=${pageUser}`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${AdminToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("this is the data", data.data)
                setUserData(data.data)
            })
            .catch(err => console.log(err))
        setShow(0)
    }, [pageUser, show])


    return (
        <div className="flex flex-row h-full">
            <nav className="bg-gray-100 border-2 border-gray-300 w-20   justify-between flex flex-col invisible  md:visible ">
                <div className="mt-10 mb-10">
                    <a href="#">
                        <img
                            src={programmer}
                            className="rounded-full w-10 h-10 mb-3 mx-auto"
                        />
                    </a>
                    <div className="mt-10">
                        <ul>
                            <li className="mb-6">
                                <a href="#formPost">  <spam >
                                    <img className="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-green-500" src={Plus} alt="" />
                                </spam>
                                </a>
                            </li>
                            <li onClick={logoutHandler}>
                                <spam >
                                    <img className="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-green-500" src={Logoutimg} alt="" />
                                </spam>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mb-4">
                </div>
            </nav>

            <div className="md:px-16 py-4 text-gray-700 bg-gray-200  w-screen">
                <div clasName="flex justify-center visible md:invisible">
                    <div className="w-full mb-8 visible md:invisible" onClick={logoutHandler}>
                        <spam >
                            <img className="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-green-500" src={Logoutimg} alt="" />
                        </spam>

                    </div>

                    <div className="mb-6 visible md:invisible">
                                <a href="#formPost">  <spam >
                                    <img className="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-green-500" src={Plus} alt="" />
                                </spam>
                                </a>
                            </div>
                </div>
                {/************************************************************************* 
    --------------------------------SHOW ALL ADMIN POST------------------------- 
    ************************************************************************* */ }

                <div id="misPost" class="md:p-8 flex flex-wrap justify-center gap-4 bg-gray-300  ">
                    <h1 className=" text-2xl md:text-6xl font-bold mb-8">Mis post</h1>
                    <div className="w-full flex justify-center  items-center gap-16  flex-wrap">
                        {
                            adminData.map((adminData) => (
                                <AdminDataPost
                                    id={adminData._id}
                                    active={adminData.active}
                                    tittle={adminData.title}
                                    description={adminData.description}
                                    img={adminData.image}
                                    tokenSession={AdminToken}
                                    getAdminData={() => { getAdminData() }}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="mt-4 w-full">
                    <a href="#misPost">  <div className="w-full px-16 flex justify-between">
                        <ButtonBack onClick={() => { handlerButton("back", "admin") }} />
                        <ButtonNext onClick={() => { handlerButton("next", "admin") }} />
                    </div></a>
                </div>

                {/************************************************************************* 
                --------------------------------SHOW ALL USER POST------------------------- 
                ************************************************************************* */ }

                <div id="todoPost" class="md:p-8 mt-8 flex flex-wrap justify-center gap-4 ">
                    <h1 className="text-2xl md:text-4xl font-bold">Todos los post</h1>
                    <div className="w-full flex justify-center  items-center gap-16  flex-wrap">
                        {
                            userData.map((userData) => (

                                <AllDataNolike
                                    tittle={userData.title}
                                    description={userData.description}
                                    img={userData.image}
                                    likes={userData.likes.length}
                                    group={userData.user.username}
                                    comments={userData.comments}
                                    date={userData.createdAt}
                                />
                            ))
                        }
                    </div>

                </div>
                <a href="#todoPost">  <div className="w-full  flex justify-between px-16 mb-16 mt-8">
                    <ButtonBack onClick={() => { handlerButton("back", "user") }} />
                    <ButtonNext onClick={() => { handlerButton("next", "user") }} />
                </div>
                </a>
                <div className=" w-full">
                    <h1 id="formPost" className="text-center text-3xl md:text-4xl font-bold">Agregar post</h1>
                    <AddNewPost onAdd={onAdd} />
                </div>

            </div>
        </div>

    )

}