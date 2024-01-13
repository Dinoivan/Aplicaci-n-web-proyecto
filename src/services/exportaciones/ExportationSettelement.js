import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"

//Servicio para listar exportation-settlement
export async function ExportationSettelement(token,fichaId){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/exportation-settlement/?pk=${fichaId}`,{
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


export async function CrearDocumentosLiquidacion(token,exportation_id,invoice_path,document_path) {
    try {
        const formData = new FormData();
        formData.append('exportation_id',exportation_id)
        formData.append('invoice_path', invoice_path);
        formData.append('document_path', document_path);

        const response = await axios.post(`${API}${basePathfindAll}/exportation-settlement/`, formData, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'multipart/form-data', // Asegúrate de establecer el tipo de contenido adecuado
            },
           
        });
        return response.data;
    } catch (error) {
        console.error("Error al agregar el pedido: ", error);
        throw error;
    }
}
