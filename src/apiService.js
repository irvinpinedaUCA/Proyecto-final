

const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";
const services = {};

services.login = async (username, password) => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    return {};
}

services.verifyToken = async (token) => {
    const response = await fetch(`${BASE_URL}/auth/whoami`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }

    return {};
}


const userToken =localStorage.getItem('userToken');
fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/all`,{
method: "GET",
headers: {
    "Content-Type":'application/json',
    "Authorization": `Bearer `+ userToken
}
})
.then(res=>res.json())
.then(data=>console.log(data.data))
.catch(err=> console.log(err))


export default services;