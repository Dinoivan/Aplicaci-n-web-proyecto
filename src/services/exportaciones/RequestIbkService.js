import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"

//Servicio para listar Requestibk
export async function Requestibk(id,token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/request-ibk/?pk=${id}`,{
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


export async function UpdateIBKFicha(token,id,RequestibkData) {
    try {

        RequestibkData.exportation = id;
        
        const response = await axios.put(`${API}${basePathfindAll}/request-ibk/`, RequestibkData, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json', // Asegúrate de establecer el tipo de contenido adecuado
            },
            
        });
        return response.data;
    } catch (error) {
        console.error("Error al agregar el pedido: ", error);
        throw error;
    }
}

//Versión 2 actualizar
export async function ActualizarIBK(token,id,objeto){
    try{
        const response = await axios.put(`${API}${basePathfindAll}/request-ibk/?pk=${id}`, objeto,{
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