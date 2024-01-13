import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"


//Servicio para agregar datos adicionales
export async function PostAditionalInformation(token,objeto){
    try{
        const response = await axios.post(`${API}${basePathfindAll}/additional-information/`, objeto,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data
    }catch(error){
        console.error("Error al agregar informaición adicional");
        throw error;

    }
}

//Servicio para listar additional-information
export async function AdditionalInformation(id,token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/additional-information/?pk=${id}`,{
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data.result;
    }catch(error){
        console.error("Error al obtener datos: ",error);
        throw error;
    }
}

//Servicio para actualizar

//Servicio para listar additional-information
export async function UpdateAdditionalInformation(token,id,objeto){

    try{
        const response = await axios.put(`${API}${basePathfindAll}/additional-information/?pk=${id}`,objeto,{
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    }catch(error){
        console.error("Error al obtener datos: ",error);
        throw error;
    }
}

//Servicio para filtrar datos adicionales



export async function Agregar(token,Objeto){
    try{

        const response = await axios.post(`${API}${basePathfindAll}/request-ibk/`, Objeto,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

    }catch(error){
        console.error("Error al agregar un ibk: ",error);
        throw error;
    }
}