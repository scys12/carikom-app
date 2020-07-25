import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/';

const headers = {
  headers : authHeader()
};

class UserService {
  getCategories(userId){
      return axios.get(API_URL + `categories`);
  }

  addProduct(name, description, price, category){
    const req_data = {
      name : name,
      description : description,
      price : price, 
      isBought: 0,
      category : JSON.parse(category),
    }
    return axios.post(API_URL + "item", req_data, headers);
  }

  editProduct(name, description, price, category,id){
    const req_data = {
      id : id,
      name : name,
      description : description,
      price : price, 
      isBought: 0,
      category : JSON.parse(category),
    }
    return axios.put(`${API_URL}item/${id}`, req_data, headers);
  }

  getUserItems(id,page){
    
    return axios.get(`${API_URL}item/user/${id}?page=${page}&size=9`,headers);
  }

  deleteProduct(id){
    const headers = {
      headers : authHeader()
    };
    return axios.delete(`${API_URL}item/${id}`,headers);
  }

  getItemDetail(id){
    const headers = {
      headers : authHeader()
    };
    return axios.get(`${API_URL}item/${id}`,headers);
  }

  getLatestProduct(){
    return axios.get(`${API_URL}latestitem`);
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', headers);
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', headers);
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', headers);
  }
}

export default new UserService();