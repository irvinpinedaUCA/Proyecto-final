
import Favorite from '../../assets/img/favorite.png'
import React from 'react'


const AllDataNolike = ({ tittle, description, img, likes, group, comments, date }) => {
    const newDate = date.substring(0, 10);
    const postComments = comments.map((commentSelected) => {
        return <li className="pl-4 py-2"><p className="text-sm text-left pr-4   text-gray-500"></p> <strong>Comentario:</strong> {commentSelected.description} </li>
    });

    return (
        <div class="w-72  mx-2 relative bg-white rounded-lg py-2 shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
            <div class="flex items-center mb-2 space-x-4">

                <div className="mx-5">

                    <h1 class="h-12 text-md overflow-auto font-bold text-gray-700"> {tittle}</h1>

                    <div className="h-20 w-64 overflow-auto"><p class="text-sm font-normal h-16 text-gray-600  hover:underline">{description}</p></div>

                </div>

            </div>
            <div className="h-48 overflow-hidden"><img className="w-full" src={img} alt="" /></div>
            <div class="flex justify-between px-10 py-6">
            


            </div>
            <h2 class="mb-1 h-4 text-sm text-right pr-4  text-gray-500"> By: {group}</h2>
            <div>
                {/* COMENTARIO SECCION */}


                <details >
                    <summary className="flex ml-4"> <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        
                    </span><p>{comments.length}</p>
                    <div className="flex">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                        </svg>
                    </span>
                    <p className="pr-24">{likes}</p>
                </div></summary>
                    <div className="w-full h-64 overflow-auto bg-gray-200">
                        <ul className="w-full pt-4 text-sm">
                            {postComments}
                        </ul>
                    </div>
                </details>

            </div>
            <p className="pl-4 mt-4 text-sm font-bold text-gray-400" >Publicado: {newDate}</p>
        </div>

    )
};

export default AllDataNolike;