import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"

//Servicio para listar pedidos

export async function FindAllPedidos(token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/import/`,{
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

export async function FiltrosPedidos(params, token) {
    try {
      const { created_at, order_number,customer_name, sell_organization,customer_number} = params;

      const queryParams = new URLSearchParams();

      if (created_at) {
        queryParams.append("created_at", created_at);
      }

      if(order_number){
        queryParams.append("order_number",order_number);
      }

      if (customer_name) {
        queryParams.append("customer_name", customer_name);
      }

      if (sell_organization) {
        queryParams.append("sell_organization", sell_organization);
      }
  
      if (customer_number) {
        queryParams.append("customer_number", customer_number);
      }

      const queryString = queryParams.toString();
  
      const apiUrl = queryString ? `${basePathfindAll}/import/?${queryString}` : `${basePathfindAll}/import/`;
  
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


//Servicio para detallar cada pedido de acuerdo al id de una ficha
export async function FindAllPedidosDetailsId(id,token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/import/?pk=${id}`,{
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

export async function UpdateFicha(token,fichaData,documentPDF) {
    try {
        const formData = new FormData();
        formData.append('id', fichaData.id);
        formData.append('proforma_number', fichaData.proforma_number);
        formData.append('freight_contract_number', fichaData.freight_contract_number);
        formData.append('container_type', fichaData.container_type);
        formData.append('responsible_user_comex', fichaData.responsible_user_comex);
        formData.append('document_request', documentPDF);

        const response = await axios.put(`${API}${basePathfindAll}/exportations/`, formData, {
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

export async function CreateFicha(token,fichaData,documentPDF) {
    try {
        const formData = new FormData();
        formData.append('customer_oc_number',fichaData.customer_oc_number); 
        formData.append('proforma_number', fichaData.proforma_number);
        formData.append('freight_contract_number', fichaData.freight_contract_number);
        formData.append('container_type', fichaData.container_type);
        formData.append('responsible_user_comex', fichaData.responsible_user_comex);
        formData.append('san_juan_de_lurigancho',fichaData.san_juan_de_lurigancho);
        formData.append('la_milla',fichaData.la_milla);
        formData.append('punta_hermosa',fichaData.punta_hermosa);
        formData.append('trebol_san_martin',fichaData.trebol_san_martin);
        formData.append('total_containers',fichaData.total_containers);
        formData.append('currency',fichaData.currency);
        formData.append('sell_organization',fichaData.sell_organization);
        formData.append('net_value',fichaData.net_value);
        formData.append('status',fichaData.status);
        formData.append('status_comment',fichaData.status_comment);
        formData.append('document_request', documentPDF);

        const response = await axios.post(`${API}${basePathfindAll}/exportations/`, formData, {
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




//Servicio para detallar cada pedido de acuerdo al id de una ficha
export async function AssignarPedidoFicha(token,Relacion){

    try{

        const formData = new FormData();
        formData.append('id', Relacion.id);
        formData.append('exportation_id', Relacion.exportation_id);

        const response = await axios.put(`${API}${basePathfindAll}/import/`,formData,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }catch(error){
        console.error("Error al obtener los datos del usuario: ",error);
        throw error;
    }
}
