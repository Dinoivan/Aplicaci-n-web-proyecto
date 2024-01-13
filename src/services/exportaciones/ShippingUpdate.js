import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"

//Servicio para listar shipping-update

export async function ShippingUpdate(id,token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/shipping-update/?pk=${id}`,{
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data.result;
    }catch(error){
        console.error("Error al obtener los datos del usuario: ",error);
        throw error;
    }
}

export async function ShippingGet(fichaId,token ){
    try{
        const response = await axios.get(`${API}${basePathfindAll}/shipping-update/?pk=${fichaId}`,{
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data.resul;
    }catch(error){
        console.error("Error al obtener los datos de Zarpe: ",error);
        return error;
    }
}


export async function AddZarpe(token,objeto){
    try{
        const response = await  axios.post(`${API}${basePathfindAll}/shipping-update/`,objeto,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',

            }
        });
        return response.data.resul;
    }catch(error){
        console.error("Error al agregar datos: ",error);
        return error;
    }
}

export async function actualizateZarte(token,id,objeto){

    try{
        const response = await axios.put(`${API}${basePathfindAll}/shipping-update/?pk=${id}`, objeto,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    }catch(error){
        console.error("Error algo salio mal: ",error);
        return error;
    }
}