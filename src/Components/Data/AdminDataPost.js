
import Bin from '../../assets/img/bin.png'
import React from 'react'
import { useState } from 'react';
import "./adminpost.css";
import { getAdminData } from '../../pages/Admin/Admin'
import UpdatePost from '../Update/UpdatePost'
import Swal from 'sweetalert2';

const AdminDataPost = ({ id, active, tittle, description, img, tokenSession, getAdminData }) => {

    {/************************************************************************* 
    --------------------------------UPDATE  POST------------------------------ 
    ************************************************************************* */ }

    const [posted, setPosted] = useState([]);
    const updatePost = async (title, description, image) => {
        await fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/update/${id}`, {
            method: "PUT",

            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${tokenSession}`
            },
            body: JSON.stringify({
                title: title,
                description: description,
                image: image,
            })
        }).then((res) => {
            if (res.status !== 200) {
                return;
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Good job!',
                    text: '¡El post fue actualizado con éxito!',
                });
                return res.json();
            }
        }).then((data) => {
            setPosted(posted => [...posted, data?.data]);
            console.log("Pueda de actualizar", posted);
        }).catch((err) => {
            console.log(err);
        });
        getAdminData()
    };


    {/************************************************************************* 
    ---------------------------toggleShow  POST----------------------------- 
    ************************************************************************* */ }

    const toggleShow = async () => {
        await fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/toggle/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${tokenSession}`
            }
        }).then(res => {
            if (res.status !== 200) {
                return
            }
            console.log(`Actualizando ${active}, con id ${id}`);
        }).catch(err => {
            console.log(err);
        })
        getAdminData()
    }


    return (

        <div class="w-72  mx-2 relative bg-white rounded-lg py-2 shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105cursor-pointer">
            <div class="flex items-center mb-2 space-x-4">

                <div className="ml-7">
                    <h1 class="mb-1 h-8 text-md font-bold text-gray-700 overflow-auto"> {tittle}</h1>
                    <div className="h-16 overflow-auto"><p class="text-sm font-normal h-16 text-gray-600  hover:underline"># {description}</p></div>
                </div>

            </div>
            <div className="h-48 overflow-hidden"><img className="w-full" src={img} alt="" /></div>
            <div class="flex justify-between px-10 py-6">
                <div class="flex">
                    <span className=" transition duration-500 transform hover:scale-150 cursor-pointer">
                    </span><p className="pr-24"></p>
                </div>
                <spam className="flex" >


                    <label class="switch">
                        <input type="checkbox" checked={active} onClick={toggleShow} />
                        <span class="slider round"></span>
                    </label>

                </spam>
            </div>
            <div>
            </div>
            <UpdatePost
                updatePost={updatePost}
                tittle={tittle}
                description={description}
                img={img}
            />
        </div>

    )
}

export default AdminDataPost