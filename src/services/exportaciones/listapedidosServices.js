import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"

//Servicio para listar pedidos

export async function FindAllPedidos(token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/exportation-detail/`,{
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

export async function FiltrosPedidos(params, token) {
    try {
      const { order_creation_date, order_number,customer_name, sell_organization,customer_number,has_file} = params;

      const queryParams = new URLSearchParams();

      if (order_creation_date) {
        queryParams.append("order_creation_date", order_creation_date);
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

        if (has_file !== undefined && (has_file === true || has_file === 'true' || has_file === false || has_file === 'false')) {
            queryParams.append("has_file", has_file.toString());
          }

      const queryString = queryParams.toString();
  
      const apiUrl = queryString ? `${basePathfindAll}/exportation-detail/?${queryString}` : `${basePathfindAll}/exportation-detail/`;
  
      const response = await axios.get(`${API}${apiUrl}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
  
      return response.data.result;
    } catch (error) {
      console.error("Error al obtener el filtro de datos: ", error);
      throw error;
    }
  }


//Servicio para detallar cada pedido de acuerdo con ficha
 export async function FindAllPedidosDetailsIdFicha(id,token){

     try{
        const response = await axios.get(`${API}${basePathfindAll}/exportation-detail/?exportation_id=${id}`,{
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


 //Servicio para detallar cada pedido con SJL y Trebol
 export async function FindAllPedidosSJandTrebol(id,token){

    try{
       const response = await axios.get(`${API}${basePathfindAll}/exportation-detail/?exportation_id=${id}`,{
           headers: {
               Authorization: `Token ${token}`
           }
       });
        const result = response.data.result;

        if(result.length > 0){

            //Tomar el primer objeto de la lista
            const primerPedido = result[0];

            //Extraer la data del primero elemento
            const valueList = {
                sanJuanDeLurigancho: primerPedido.exportation.san_juan_de_lurigancho || "0",
                ph: primerPedido.exportation.punta_hermosa || "0",
                milla: primerPedido.exportation.la_milla || "0",
                trebolSanMartin: primerPedido.exportation.trebol_san_martin || "0",
            };

            return valueList;
        }
    
    }catch(error){
        console.error("Error al obtener los datos del usuario: ",error);
       throw error;
   }
}


//Servicio para detallar cada pedido por posición de al id del pedido
export async function FindAllPedidosDetailsId(id,token){
    try{
        const response = await axios.get(`${API}${basePathfindAll}/exportation-detail-position/?exportation_detail_id=${id}`,{
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

export async function UpdateFicha(token,id,document_request) {
     try {
         const formData = new FormData();
         formData.append('id',id)
         formData.append('document_request', document_request);

         const response = await axios.put(`${API}${basePathfindAll}/exportations/?id=${id}`, formData, {
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


//Crear Ficha
export async function CreateFicha(token,fichaData) {
    try {

        const response = await axios.post(`${API}${basePathfindAll}/exportations/`, fichaData, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },

        });
        return response.data;
    } catch (error) {
        console.error("Error al crear una ficha desde el servicio: ", error);
        return error;
    }
}

//Actualizar documento

//Actualizar ficha
export async function Update(token,actualizar){

    try{

        const response = await axios.put(`${API}${basePathfindAll}/exportations/`,actualizar,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json'             }
        });
        return response.data;
    }catch(error){
        console.error("Error al obtener los datos del usuario: ",error);
        throw error;
    }
    
}


// //Servicio para desasignar una ficha relacionado a un pedido pasando el id del pedido con null en el id de la ficha
 export async function DesasignarFicha(token,Relacion){

     try{

         const response = await axios.put(`${API}${basePathfindAll}/exportation-detail/`,Relacion,{
             headers: {
                 Authorization: `Token ${token}`,
                 'Content-Type': 'application/json'             }
         });
         return response.data;
     }catch(error){
         console.error("Error al obtener los datos del usuario: ",error);
         throw error;
     }
 }


//Servicio para Asignar un pedido a una ficha pasando un arreglo de id de pedidos con el id de la ficha
export async function AssignarPedidoFicha(token,Relacion){
    try{
      
        const response = await axios.put(`${API}${basePathfindAll}/exportation-detail/`,Relacion,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }catch(error){
        console.error("Error al obtener los datos del usuario: ",error);
        throw error;
    }
}

//Listar correos

export async function Correos(token){
    try{

        const response = await axios.get(`${API}${basePathfindAll}/user-list/`,{
            headers: {
                Authorization: `Token ${token}`,
            },

        });
        return response.data;
    }catch(error){
        console.error("Error al obtener el listado de los correos: ",error);
        return error;
    }
}

// // //Eliminar pedido
//  export async function eliminarPedido(token,id){
//      try{

//        const response = await axios.delete(`${API}${basePathfindAll}/exportation-detail/${id}/`,{
//          headers: {
//            Authorization: `Token ${token}`
//          }
//        });
      
//        if(response.status === 200){
//          console.log(`La ficha con id: ${id} eliminado exitosamente con mensaje`);
//        }
//        }catch(error){
//          console.error('Error al realizar la solicitud de eliminación: ',error);
//              throw error;
//        }
//    }

// //Eliminar Pedido
 export async function eliminarPedido(token,eliminar){
     try{
         const response = await axios.delete(`${API}${basePathfindAll}/exportation-detail/`,{
            headers: {
                 Authorization: `Token ${token}`,
                 'Content-Type': 'application/json',
             },
            data: eliminar
         });
         
         if(response.status === 200){
             console.log(`Las siguientes fichas fueron eliminados: ${eliminar}`);
         }
     }catch(error){
         console.error("Error al realizar la solicitud de eliminación: ",error);
     }
 }

  export async function GeneralPagePedidos(token,id){
    try{

        const response = await axios.get(`${API}${basePathfindAll}/exportation-detail/?pk=${id}`,{
            headers: {
                Authorization: `Token ${token}`
            }
        });
         return response.data.result;

    }catch(error){
        console.error("Error al obtener los datos del usuario: ",error);
    }
  }


  export async function EnviarCorreo(token,enviar){
    try{
        const response = await axios.put(`${API}${basePathfindAll}/exportations/`,enviar,{
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    }catch(error){
        console.error("Error al actualizar al enviar el correo: ",error);
        return error;
    }
  }


  //Excel
  export async function Descargar(token,outputType){
    try{
        const response = await axios.get(`${API}${basePathfindAll}/exportation-target/`,{
            params: {
                output: outputType
            },
            headers: {
                Authorization: `Token ${token}`
            },
            responseType: 'arraybuffer', // Configuración para manejar respuestas binarias
        });

        if(response.status === 200){
            return response.data;
        }
    }catch(error){
        console.error("Error: ",error);
        return error;
    }
  }

  export async function ResponsablesExpertaciones(token){
    try{
        const response = await axios.get(`${API}${basePathfindAll}/responsable/?type=REGULAR`,{
            headers:{
                Authorization: `Token ${token}`
            },
        });
        const responsableNombres = response.data.result.map((usuario) => usuario.name);
        console.log("Soy el resultado: ",responsableNombres);
        return responsableNombres;
    }catch(error){
        console.error("Error: ",error);
        return error;
    }
  }


  export async function SendPreDispatch(token, data) {
    try {
      const {
        free_text,
        client,
        country_port,
        cnts,
        sap_order_number,
        booking,
        ship_name,
        full_containers,
        parent_deadline,
        file_1,
        file_2,
        file_3,
        file_4,
        file_5,
        file_6,
        file_7,
        file_8,
        file_9,
        file_10,
        recipients,
        proforma_invoice,
        exportation_id,
      } = data;
  
      const formData = new FormData();
      formData.append('free_text', free_text);
      formData.append('client', client);
      formData.append('country_port', country_port);
      formData.append('cnts', cnts);
      formData.append('sap_order_number', sap_order_number);
      formData.append('booking', booking);
      formData.append('ship_name', ship_name);
      formData.append('full_containers', full_containers);
      formData.append('parent_deadline', parent_deadline);
    if (file_1) {
        formData.append('file_1', file_1);
      }
      if (file_2) {
        formData.append('file_2', file_2);
      }
      if(file_3){
        formData.append('file_3',file_3);
      }
      if(file_4){
        formData.append('file_4',file_4);
      }
      if(file_5){
        formData.append('file_5',file_5);
      }
      if(file_6){
        formData.append('file_6',file_6);
      }
      if(file_7){
        formData.append('file_7',file_7);
      }
      if(file_8){
        formData.append('file_8',file_8);
      }
      if(file_9){
        formData.append('file_9',file_9);
      }
      if(file_10){
        formData.append('file_10',file_10);
      }
  
      formData.append('recipients', JSON.stringify(recipients));
  
      formData.append('proforma_invoice', proforma_invoice);
      formData.append('exportation_id', exportation_id);
  
      const response = await axios.post(`${API}${basePathfindAll}/exportation-send-pre-dispatch/`,
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
  
