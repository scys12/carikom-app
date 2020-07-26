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

  editProduct(name, description, price, category, id){
    const req_data = {
      id : id,
      name : name,
      description : description,
      price : price, 
      isBought: 0,
      category : JSON.parse(category),
    }
    return axios.put(`${API_URL}item/edit`, req_data, headers);
  }

  search(searchInput, type, page){
    return axios.get(`${API_URL}search?type=${type}&searchWord=${searchInput}&page=${page}&size=9`);
  }
  searchUserItems(id,searchInput, type, page){
    return axios.get(`${API_URL}user/${id}/search?type=${type}&searchWord=${searchInput}&page=${page}&size=9`, headers);
  }

  getUserProfile(username){
    return axios.get(`${API_URL}user/${username}`,headers)
  }

  editProfile(username, email, nama, lokasi, telepon, password){
    const request_data = {
      username : username,
      email : email,
      nama: nama,
      lokasi : lokasi,
      telepon : telepon,
      password : password
    }
    return axios.put(`${API_URL}user/edit`, request_data, headers).then(
      response => {
        if (response.data.token) {
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      }
    );
  }

  getUserItems(id,page){    
    return axios.get(`${API_URL}item/user/${id}?page=${page}&size=9`,headers);
  }

  deleteProduct(id){
    const headers = {
      headers : authHeader()
    };
    return axios.delete(`${API_URL}item/delete/${id}`,headers);
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

  getAllItems(page){
    return axios.get(`${API_URL}items?page=${page}&size=12`);
  }

  getItemsFromCategory(id,page){
    return axios.get(`${API_URL}category/item/${id}?page=${page}&size=9`);
  }

  buyItem(item){
    const req_data = {
      id : item.id,
      name : item.name,
      description : item.description,
      price : item.price,
    }

    return axios.post(`${API_URL}buy`, req_data, headers);
  }
}

export default new UserService();