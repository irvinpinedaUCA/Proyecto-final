
import Favorite from '../../assets/img/favorite.png'
import React from 'react'
import { getUserData } from '../../pages/User/User'
import Swal from 'sweetalert2';

const DataPost = ({ id, tittle, description, img, likes, group, tokenSession, getUserData, getFavoriteData, comments, date }) => {
    
    const newDate = date.substring(0, 10);

    const toggleLike = async () => {
        await fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${tokenSession}`
            }
        }).then(res => {
            if (res.status !== 200) {
                return
            }
            console.log(`Actualizando ${tittle}, con id ${id}`);
        }).catch(err => {
            console.log(err);
        })
        getUserData()

        let svg = document.getElementById(`${id}`);
        if(svg.classList.contains("text-red-500")){
            svg.classList.remove("text-red-500")
            svg.classList.add("text-gray-500")
        }else{
            svg.classList.remove("text-gray-500")
            svg.classList.add("text-red-500")
        }

    }

    const toggleFavorite = async () => {
        await fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/fav/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${tokenSession}`
            }
        }).then(res => {
            if (res.status !== 200) {
                return
            }
            console.log(`Editando favorito ${tittle}, con id ${id}`);

        }).catch(err => {
            console.log(err);
        })
        
        getFavoriteData()
    };

    const postComments = comments.map((commentSelected) => {
        return <li className="pl-4 py-2"><p className="text-sm text-left pr-4   text-gray-500"></p> <strong>Comentario:</strong> {commentSelected.description} </li>
    });

    const makeComment = async () => {
        const commentMade = document.getElementById(`${id}A`).value;
        if (commentMade.length < 9) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El comentario debe tener por lo menos 8 caracteres',
            });
            return;
        } else {
            await fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${tokenSession}`
                },
                body: JSON.stringify({
                    description: commentMade
                })
            })
                .then(res => {
                    if (res !== 200) {
                        return;
                    }
                    console.log(`comment added to ${id}`)
                })
                .catch(err => {
                    console.log(err);
                    return;
                })
            Swal.fire({
                icon: 'success',
                title: 'Good job!',
                text: `El comentario fue agregado con exito al post \"${tittle}\"!`,
            });
            document.getElementById(`${id}A`).value = '';
        }
        getUserData();
    }
    return (
        <div className="w-72  mx-2 relative bg-white rounded-lg py-2 shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center mb-2 space-x-4">

                <div className="mx-5">

                    <h1 className=" h-12 text-md font-bold text-gray-700"> {tittle}</h1>

                    <div className="h-20 w-64 overflow-auto"><p class="text-sm font-normal  h-16 text-gray-600 ">{description} </p></div>

                </div>

            </div>
            <div className="h-48 overflow-hidden"><img className="w-full" src={img} alt="" /></div>
            <div className="flex justify-between px-10 py-6">
                <div className="flex">
                    <span onClick={toggleLike}>
                        <svg id={id} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                        </svg>
                    </span>
                    <p className="pr-24">{likes}</p>
                </div>
                <span className="flex">{comments.length}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </span>
                <spam onClick={toggleFavorite}>
                    <img className="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-green-500" src={Favorite} />
                </spam>
            </div>
            <h2 class="mb-1 h-4 text-sm text-right pr-4  text-gray-500"> By: {group}</h2>
            <div>
                {/* COMENTARIO SECCION */}


                <details >
                    <summary className="flex ml-4 text-gray-500 mb-2"> Ver Comentaios</summary>
                    <div className="w-full h-64 overflow-auto bg-gray-200">
                        <ul className="w-full pt-4 text-sm">
                            {postComments}
                        </ul>
                    </div>
                </details>
                <div class=" flex">
                    <input id={`${id}A`} className=" w-full text-sm font-thin  px-5 py-2 mb-2 bg-gray-50 outline-none rounded-full border-1" type="text" placeholder="Enter your comment" />
                    <span onClick={makeComment} className="text-sm text-gray-500 bg-gray-50 p-2 rounded-full px-2 py-2 transition duration-100 hover:text-blue-400 cursor-pointer">Send</span>
                </div>
                <p className="pl-4 text-sm font-bold text-gray-400" >Publicado: {newDate}</p>
            </div>
        </div>

    )
};

export default DataPost;