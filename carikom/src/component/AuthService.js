import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

class AuthService{
    login(username, password){
        return axios.post(API_URL + "signin",{
            username, password
        }).then( response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout(){
        localStorage.removeItem("user");
    }

    register(username, email, password, nama, lokasi, telepon){
        const request_data = {
            username : username,
            email : email,
            password : password, 
            nama: nama,
            lokasi : lokasi, 
            telepon : telepon,
            roles : ["user"]
        }
        console.log(request_data);
        return axios.post(API_URL + "signup", request_data);
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();