import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

class AuthService{
    login(username, password){
        return axios.post(API_URL + "signin",{
            username, password
        }).then( response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout(){
        localStorage.removeItem("user");
    }

    register(username, email, password, nama, lokasi, telepon){
        return axios.post(API_URL + "signup", {
            username : username,
            email : email,
            password : password, 
            nama: nama,
            lokasi : lokasi, 
            telepon : telepon,
            role : ["ROLE_USER"]
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();