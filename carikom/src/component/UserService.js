import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/';

class UserService {
  getCategories(userId){
      return axios.get(API_URL + `categories`, {headers: authHeader()});
  }

  addProduct(name, description, price, category){
    const req_data = {
      name : name,
      description : description,
      price : price, 
      isBought: 0,
      category : JSON.parse(category),
    }
    return axios.post(API_URL + "item", req_data, {headers: authHeader()});
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
    return axios.put(`${API_URL}item/${id}`, req_data, {headers: authHeader()});
  }

  getUserItems(id,page){
    const headers = {
      headers : authHeader()
    };
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