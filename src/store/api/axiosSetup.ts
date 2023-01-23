import axios from "axios";
import { GenericResponse } from "./types";

const BASE_URL = "http://localhost:5000/";

export const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';


// {
//   headers: {
//     Authorization: 'Bearer ' + headerAuth //the token is a variable which holds the token
//   }
//  }
  export const loginUserFn = async (user: any) => {
    const response = await authApi.post('user/login', user);
    return response;
  };
  export const logoutuserfunction = async (headerAuth: any) => {
    const response = await authApi.post('user/logOut', {},{
      headers:{
        Authorization: 'Bearer ' + headerAuth //the token is a variable which holds the token
      }
    });
    return response;
  };
  
  export const getTables= async (headerAuth, restaurantId)=> {
    let reId = restaurantId.length != 0 ?restaurantId[0]:"";
    const response = await authApi.get(`restaurant/getTable?restaurantId=${reId}`, {
      headers: {
          Authorization: 'Bearer ' + headerAuth //the token is a variable which holds the token
      }
    });
    return response;
  }
  export const getMenu= async (table, restaurantId)=> {
    let reId = restaurantId.length != 0 ?restaurantId[0]:"";
    const response = await authApi.get(`menu/getAllMenuByRestaurantId?tableId=${table}&restaurantId=${reId}`, {
    });
    return response;
  }
// http://localhost:5000/restaurant/getRestaurant?restaurantId=63cb0c2b3f68cb3a0cd577e7
export const getRestaurantById = async (headerAuth, restaurantId)=>{
  let reId = restaurantId.length != 0 ?restaurantId[0]:"";
  const response = await authApi.get(`restaurant/getRestaurant?restaurantId=${reId}`, {
    headers:{
      Authorization: 'Bearer ' + headerAuth //the token is a variable which holds the token
    }
  });
  return response;
}
export const getCurrentOrderByRestaurantId = async (headerAuth, restaurantId)=>{
  let reId = restaurantId.length != 0 ?restaurantId[0]:"";
  const response = await authApi.get(`order/getCurrentOrder?restaurantId=${reId}`, {
    headers:{
      Authorization: 'Bearer ' + headerAuth //the token is a variable which holds the token
    }
  });
  return response;
}
// order/getOrder?orderId=63cd87dc3d605181ccab6ba2&restaurantId=63cb0c2b3f68cb3a0cd577e7
export const getorderById = async (headerAuth, orderId, restaurantId)=>{
  const response = await authApi.get(`order/getOrder?orderId=${orderId}&restaurantId=${restaurantId}`, {
    headers:{
      Authorization: 'Bearer ' + headerAuth //the token is a variable which holds the token
    }
  });
  return response;
}


export const createOrder = async (details) => {
  const response = await authApi.post('order/createOrder',details.orderDetail,{
    headers:{
      Authorization: 'Bearer ' + details.token //the token is a variable which holds the token
    }
  });
  return response;
};
