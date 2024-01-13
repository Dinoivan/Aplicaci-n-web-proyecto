import axios from 'axios';
import {API} from "../../constants/env"

const basePath = "/api"

export async function UserInformation(token){
    try{
        const response = await axios.get(`${API}${basePath}/user/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    }catch(error){
        console.error("Error al obtener los datos del usuario: ",error);
    }
}




