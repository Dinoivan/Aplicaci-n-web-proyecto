import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"

//Servicio para listar pedidos

export async function GestionFichas(token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/exportations/`,{
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    }catch(error){
        console.error("Error al obtener los datos del usuario: ",error);
        throw error;
    }
}

export async function Filtros(params, token) {
    try {
      const { created_at,sell_organization,responsible_user_comex,code_relations, proforma_number } = params;

      const queryParams = new URLSearchParams();
  
      if (created_at) {
        queryParams.append("created_at", created_at);
      }
  
      if (sell_organization) {
        queryParams.append("sell_organization", sell_organization);
      }
  
      if (responsible_user_comex) {
        queryParams.append("responsible_user_comex", responsible_user_comex);
      }

      if (code_relations) {
        queryParams.append("code_relations", code_relations);
      }

      if (proforma_number) {
        queryParams.append("proforma_number", proforma_number);
      }
  
      const queryString = queryParams.toString();
  
      const apiUrl = queryString ? `${basePathfindAll}/exportations/?${queryString}` : `${basePathfindAll}/exportations/`;
  
      const response = await axios.get(`${API}${apiUrl}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error al obtener el filtro de datos: ", error);
      throw error;
    }
  }

  export async function eliminarFicha(token,id){
    try{
      const response = await axios.delete(`${API}${basePathfindAll}/import/${id}/`,{
        headers: {
          Authorization: `Token ${token}`
        }
      });
      if(response.status === 200){
        console.log(`La ficha con id: ${id} eliminado exitosamente.`);
      }
      }catch(error){
        console.error('Error al realizar la solicitud de eliminación: ',error);
        throw error;
      }
  }
  


