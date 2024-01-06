import axios from "axios";
import callAPI from "../config";
import { CheckoutTypes } from "./data-types";
import { log } from "console";
 const ROOT_API = process.env.NEXT_PUBLIC_API;
 const API_VERSION = 'api/v1';
export async function getFeaturedGame() {
   
    const URL = 'players/landingPage';

    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
    const axiosResponse = response.data;
    
    return axiosResponse.data;
    
}

export async function getDetailVoucher(id: string) {

  
    const URL = `players/${id}/detail`;

    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
    const axiosResponse = response.data;
    
    return axiosResponse.data;
    
}

export async function getGameCategory() {
    const URL = 'players/category'
     const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
    const axiosResponse = response.data;
    
    return axiosResponse.data;
}

export async function paymentMidtrans(data: { gross_amount: any; order_id: any; }) {

    const url = `${ROOT_API}/${API_VERSION}/midtrans/payment`;
    console.log(data)
    return callAPI({
        url,
        method:"POST",
        data,
        token:true
    });
}
export async function setCheckout(data:CheckoutTypes) {
    const url = `${ROOT_API}/${API_VERSION}/players/checkout`;
   
    return callAPI({
        url,
        method:"POST",
        data,
        token:true
    });
}
