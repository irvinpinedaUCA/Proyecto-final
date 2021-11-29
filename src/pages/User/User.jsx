import React from 'react'
import { useUserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import programmer from '../../assets/img/programmer.png'
import Logoutimg from '../../assets/img/logoutimg.png'
import Favorite from '../../assets/img/favorite.png'
import { useState, useEffect } from "react";
import DataPost from '../../Components/Data/DataPost.js'
import ButtonNext from '../../Components/Button/ButtonNext'
import ButtonBack from '../../Components/Button/ButtonBack'


export default function User() {

  const [userData, setUserData] = useState([])
  const [pageUser, setPageUser] = useState(0)
  const [like, setLike] = useState(0)
  const [favoriteData, setFavoriteData] = useState([])
  const [idFavorite, setIdFavorite] = useState([])
  const [tokenFavorite, setTokenFavorite] = useState(0)
  const navigate = useNavigate()
  const { logout } = useUserContext()
  const logoutHandler = () => {
    logout()
    navigate("/login")
  }

  const userToken = localStorage.getItem('token');
  const handlerButton = (text, type) => {
    if (type === "user") {
      if (text === "back") {
        pageUser > 0 ? setPageUser(pageUser - 1) : setPageUser(0);
      } else if (text === "next") {
        setPageUser(pageUser + 1);
      }
    }
  }

  const getUserData = () => {
    setLike(1)
  }

  const getFavoriteData = () => {
    setTokenFavorite(1);
  }

  useEffect(() => {
    fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=9&page=${pageUser}`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${userToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("this is the data", data.data)
        setUserData(data.data)
      })
      .catch(err => console.log(err))
    setLike(0);

  }, [pageUser, like])

  useEffect(async () => {
    await fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/fav`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${userToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("id Favoritos", data.favorites)
        setIdFavorite(data.favorites)
      })
      .catch(err => console.log(err))

    const promisesFavorite = idFavorite.map(async id => {
      const response = await fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/one/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${userToken}`
        }
      })
      const data = await response.json();
      return data;
    })

    const arrayFavorite = await Promise.all(promisesFavorite);
    const filterFavorite = arrayFavorite.filter(post => post._id)
    setFavoriteData(filterFavorite);
    setTokenFavorite(0);
    setLike(0);
  }, [tokenFavorite, like])



  return (


    <div className="flex flex-row h-full">

      <nav className="bg-gray-100 border-2 border-gray-300 w-20  justify-between flex flex-col visible md:invisible ">
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

                <a href="#favoritesPost"><spam onClick={getFavoriteData}>
                  <img className="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-green-500" src={Favorite} alt="" />
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

        {/* SHOW ALL THE POST */}
        <div clasName="flex justify-center invisible  md:visible">
        <div className="w-full mb-8 visible md:invisible" onClick={logoutHandler}>
                <spam >
                  <img className="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-green-500" src={Logoutimg} alt="" />
                </spam>

              </div>

              <div className="mb-6 w-full visible md:invisible">

                <a href="#favoritesPost"><spam onClick={getFavoriteData}>
                  <img className="fill-current h-5 w-5 text-gray-300  mx-auto hover:text-green-500" src={Favorite} alt="" />
                </spam>
                </a>
              </div>
        </div>
        
        <div id="welcomeid" class="p-8 flex flex-wrap justify-center gap-4 ">
          <div className="text-xl mb-8 underline font-bold md:text-4xl">Welcome to JINBook</div>
          <div className="w-full flex justify-center  items-center gap-16  flex-wrap">
            {
              userData.map((userData) => (

                <DataPost
                  id={userData._id}
                  tittle={userData.title}
                  description={userData.description}
                  img={userData.image}
                  likes={userData.likes.length}
                  group={userData.user.username}
                  tokenSession={userToken}
                  getUserData={() => { getUserData() }}
                  getFavoriteData={() => { getFavoriteData() }}
                  comments={userData.comments}
                  date={userData.createdAt}
                />
              ))
            }

          </div>
        </div>



        <div className=" w-full">
          <a href="#welcomeid">
          <div className="w-full px-16 flex justify-between">
            <ButtonBack onClick={() => { handlerButton("back", "user") }} />
            <ButtonNext onClick={() => { handlerButton("next", "user") }} />
          </div>
          </a>
        </div>

        <div className="p-8 my-8 flex flex-wrap justify-center gap-8 ">
          <h1 className="text-xl md:text-4xl font-bold">Post Favoritos</h1>
          <div id="favoritesPost" className="w-full flex justify-center  items-center gap-16  flex-wrap">

            {
              favoriteData.map((favo) => (

                <DataPost
                  id={favo._id}
                  tittle={favo.title}
                  description={favo.description}
                  img={favo.image}
                  likes={favo.likes.length}
                  group={favo.user.username}
                  tokenSession={userToken}
                  getUserData={() => { getUserData() }}
                  getFavoriteData={() => { getFavoriteData() }}
                  comments={favo.comments}
                  date={favo.createdAt}
                />
              ))
            }

          </div>
        </div>

      </div>
    </div>

  )
}