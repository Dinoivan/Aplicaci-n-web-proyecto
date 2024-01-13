import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"



export async function FindAllPedidosPreDispath(token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/pre-dispatch-management/`,{
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


//Servicio para listar pre-dispatch-management
export async function PreDispathManagement(id,token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/pre-dispatch-management/?pk=${id}`,{
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


export async function AddPreDispath(token,Objeto){
    try{

        const response = await axios.post(`${API}${basePathfindAll}/pre-dispatch-management/`, Objeto,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

    }catch(error){
        console.error("Error al agregar un Dispath: ",error);
        throw error;
    }
}


export async function UpdatePreDispath(token,Objeto){
    try{

        const response = await axios.put(`${API}${basePathfindAll}/pre-dispatch-management/`, Objeto,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

    }catch(error){
        console.error("Error al agregar un Dispath: ",error);
        throw error;
    }
}