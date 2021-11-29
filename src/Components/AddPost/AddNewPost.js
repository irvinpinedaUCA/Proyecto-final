import React from "react";

const AddNewPost = ({ onAdd }) => {

    const handleOnSubmit = (e) => {
        e.preventDefault();
        onAdd(e.target.title.value, e.target.description.value, e.target.image.value);
        e.target.title.value = "";
        e.target.description.value = "";
        e.target.image.value = "";
    }

    return (
        <div>
            <form class="bg-white shadow-md rounded px-8 mt-8 pt-6 pb-8 mb-4" onSubmit={handleOnSubmit} method="POST" >
                <div class="mb-4 w-full">
                    <label class="block text-gray-700 text-sm font-bold mb-2" >
                        Titulo
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Titulo" name="title" minlength="8" maxlength="32" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" >
                        Descripción
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Descripcion" name="description" minlength="8" maxlength="64" />
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" >
                        URL de la imagen
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="url" placeholder="URL de la imagen" name="image" />
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onSubmit={handleOnSubmit}>Agregar post</button>

                </div>
            </form>

        </div>
    );
};

export default AddNewPost;
