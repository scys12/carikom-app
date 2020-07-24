import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/';

class UserService {
  getCategories(userId){
      return axios.get(API_URL + `categories`, {headers: authHeader()});
  }

  addProduct(name, description, price, category, userOwner){
    const req_data = {
        name : name,
        description : description,
        price : price, 
        isBought: 0,
        category : JSON.parse(category),
    }
    return axios.post(API_URL + "item", req_data, {headers: authHeader()});
  }

  getUserItems(id){
    const headers = {
      headers : authHeader()
    };
    return axios.get(`${API_URL}item/user/${id}?page=0`,headers);
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