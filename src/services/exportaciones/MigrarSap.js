import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"

//Servicio para listar mirar pedidos

export async function MigrarSap(token,requestNumbers,society_Value){

    try{
        const response = await axios.post(`${API}${basePathfindAll}/exportation-job/`,{
            society_value: society_Value,
            request_numbers: requestNumbers
            
        },{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            }
        });
        console.log("Resultado del servicio: ",response.data);
        return response.data;
    }catch(error){
        console.error("Error al realizar la socicitud: ",error.response.status);
        return error.response;  
    }
}

export async function MigrarSapDispathProgram(token,Number){
    
    try{
        const response = await axios.post(`${API}${basePathfindAll}/exportation-income-job/`,{
            // society_value: society_Value,
            ip_lbelv: Number
            
        },{
            headers: {
                Authorization: `Token ${token}`
            }
        });
        console.log("Resultado del servicio: ",response.data);
        return response.data;
    }catch(error){
        console.error("Error al realizar la socicitud: ",error.response.status);
        return error.response;  
    }
}



export async function MigrarSapDocumentary(token,Number){
    
    try{
        const response = await axios.post(`${API}${basePathfindAll}/exportation-bill-job/`,{
            // society_value: society_Value,
            ip_lbelv: Number
            
        },{
            headers: {
                Authorization: `Token ${token}`
            }
        });
        console.log("Resultado del servicio: ",response.data);
        return response.data;
    }catch(error){
        console.error("Error al realizar la socicitud: ",error.response.status);
        return error.response;  
    }
}