import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"

//Servicio para listar mirar pedidos

export async function MigrarSap(token,requestNumbers){

    try{
        const response = await axios.post(`${API}${basePathfindAll}/importation-job/`,{
            request_numbers: requestNumbers},{
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    }catch(error){
        console.error("Error al obtener los datos migrados: ",error);
        throw error;
    }
}