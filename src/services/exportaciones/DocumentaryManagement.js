import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"

//Servicio para listar documentary-management
export async function DocumentaryManagement(id,token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/documentary-management/?pk=${id}`,{
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

export async function CrearDocumentos(token,id,packing_list_path,shipment_document_path,fumigation_certificate_path,origin_certificate_path,sunat_invoice_path,other_document_path) {
    try {
        const formData = new FormData();
        formData.append('id',id);
        formData.append('packing_list_path', packing_list_path);
        formData.append('shipment_document_path', shipment_document_path);
        formData.append('fumigation_certificate_path', fumigation_certificate_path);
        formData.append('origin_certificate_path', origin_certificate_path);
        formData.append('sunat_invoice_path', sunat_invoice_path);
        formData.append('other_document_path', other_document_path);


        const response = await axios.put(`${API}${basePathfindAll}/exportations/?id=${id}`, formData, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'multipart/form-data', // Asegúrate de establecer el tipo de contenido adecuado
            },
           
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar los documentos: ", error);
        throw error;
    }
}

export async function FindAllPedidosDocumentary(token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/documentary-management/`,{
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


//Envio de correo

export async function SendDocumentManagement(token, data) {
    try {
      const {
        free_text,
        file_1,
        file_2,
        file_3,
        file_4,
        file_5,
        recipients,
        exportation,
      } = data;
  
      const formData = new FormData();
      formData.append('free_text', free_text);
      
      if (file_1) {
        formData.append('file_1', file_1);
      }
      if (file_2) {
        formData.append('file_2', file_2);
      }
      if(file_2){
        formData.append('file_3',file_3);
      }
      if(file_4){
        formData.append('file_4',file_4);
      }

      if(file_5){
        formData.append('file_5',file_5);
      }
  
      formData.append('recipients', JSON.stringify(recipients));
      formData.append('exportation', exportation);
  
      const response = await axios.post(`${API}${basePathfindAll}/exportation-send-documentary-management/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Error al enviar pre-despacho: ', error);
      throw error;
    }
  }


