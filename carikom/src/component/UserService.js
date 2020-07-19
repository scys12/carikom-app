import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/';

class UserService {
  getCategories(userId){
      return axios.get(API_URL + `carikom/categories`, {headers: authHeader()});
  }

  addProduct(name, description, price, category, userOwner){
    let id = 2;
    if (userOwner.roles[0] === "ROLE_USER") {
        id = 1;
    }
    const req_data = {
        name : name,
        description : description,
        price : price, 
        isBought: 0,
        userOwner : {
            id : userOwner.id,
            email : userOwner.email,
            lokasi : userOwner.lokasi,
            nama : userOwner.nama,
            username : userOwner.username,
            telepon : userOwner.telepon,
            password : null,
            roles : [
                {
                    id : id,
                    name : userOwner.roles[0]
                }
            ]
        },
        category : JSON.parse(category),
    }
    console.log(req_data)
    return axios.post(API_URL + "carikom/item", req_data, {headers: authHeader()});
}

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();