import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"

//Servicio para listar pedidos

export async function ExportationTarget(token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/exportation-target/`,{
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