import axios from 'axios';
import authHeader from './authHeader';

const headers = {
  headers : authHeader()
};

class UserService {
  getCategories(userId){
      return axios.get(`/api/categories`);
  }

  addProduct(name, description, price, category){
    const req_data = {
      name : name,
      description : description,
      price : price,
      isBought: 0,
      category : JSON.parse(category),
    }
    return axios.post("/api/item", req_data, headers);
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
    return axios.put(`/api/item/edit`, req_data, headers);
  }

  search(searchInput, type, page){
    return axios.get(`/api/search?type=${type}&searchWord=${searchInput}&page=${page}&size=9`);
  }
  searchUserItems(id,searchInput, type, page){
    return axios.get(`/api/user/${id}/search?type=${type}&searchWord=${searchInput}&page=${page}&size=9`, headers);
  }

  getUserProfile(username){
    return axios.get(`/api/user/${username}`,headers)
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
    return axios.put(`/api/user/edit`, request_data, headers).then(
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
    return axios.get(`/api/item/user/${id}?page=${page}&size=9`,headers);
  }

  deleteProduct(id){
    const headers = {
      headers : authHeader()
    };
    return axios.delete(`/api/item/delete/${id}`,headers);
  }

  getItemDetail(id){
    const headers = {
      headers : authHeader()
    };
    return axios.get(`/api/item/${id}`,headers);
  }

  getLatestProduct(){
    return axios.get(`/api/latestitem`);
  }

  getAllItems(page){
    return axios.get(`/api/items?page=${page}&size=12`);
  }

  getItemsFromCategory(id,page){
    return axios.get(`/api/category/item/${id}?page=${page}&size=9`);
  }

  buyItem(item){
    const req_data = {
      id : item.id,
      name : item.name,
      description : item.description,
      price : item.price,
    }

    return axios.post(`/api/buy`, req_data, headers);
  }
}

export default new UserService();
