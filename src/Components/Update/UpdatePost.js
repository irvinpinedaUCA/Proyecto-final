import React from "react";
import Edit from '../../assets/img/editing.png'
const UpdatePost = ({ updatePost, tittle, description, img }) => {


    const handleOnSubmit = (e) => {
        e.preventDefault();
        updatePost(e.target.title.value, e.target.description.value, e.target.image.value);

        if (!!!e.target.title.value) {
            e.target.title.value = tittle
        } else {
            e.target.title.value = "";
        }
        if (!!!e.target.description.value) {
            e.target.description.value = description
        } else {
            e.target.description.value = "";
        }
        if (!!!e.target.image.value) {
            e.target.image.value = img
        } else {
            e.target.image.value = "";
        }
    }

    return (
        <details className="px-1" ontoggle={handleOnSubmit}>
            <summary className="flex"> <img className="" src={Edit} alt="" /></summary>
            <h1 className="font-bold text-2xl text-center">Editar</h1>
            <form class="bg-white shadow-md rounded px-8  pt-4 pb-8 mb-4" onSubmit={handleOnSubmit} method="PUT" >

                <div class="mb-4 w-full">
                    <label class="block text-gray-700 text-sm font-bold mb-2" >
                        Titulo
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={tittle} name="title" minlength="8" maxlength="32" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" >
                        Descripción
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={description} name="description" minlength="8" maxlength="64" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" >
                        URL de la imagen
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="url" placeholder={img} name="image" />
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onChange={handleOnSubmit}>Editar post</button>
                    <button class=" font-bold  rounded" onChange={handleOnSubmit}>Default Data</button>

                </div>

            </form>

        </details>
    );
};

export default UpdatePost;
