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
        return response.data.result;
    }catch(error){
        console.error("Error al obtener los datos del usuario: ",error);
        throw error;
    }
}

export async function ActualizarFicha(token,objeto){
  try{
    const response = await axios.put(`${API}${basePathfindAll}/exportations/`,objeto,{
      headers: {
        Authorization: `Token ${token}`,
        'Content-type': 'application/json',
      }
    });
    return response.data;
  }catch(error){
    console.error("Error: ",error);
    return error;
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
        queryParams.append("guide_number", code_relations);
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
  
      return response.data.result;
    } catch (error) {
      console.error("Error al obtener el filtro de datos: ", error);
      throw error;
    }
  }

  export async function eliminarFicha(token,id){
    try{
      const response = await axios.delete(`${API}${basePathfindAll}/exportation-detail/${id}/`,{
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

 

  export async function ParametrizaionReprogramacion(token){
    try{
        const response = await axios.get(`${API}${basePathfindAll}/complaint-concept/`,{
            headers:{
                Authorization: `Token ${token}`
            },
        });
        const NombreReprogramacion = response.data.result.map((Nombre) => Nombre.name);
        console.log("Soy el resultado: ",NombreReprogramacion);
        return NombreReprogramacion;
    }catch(error){
        console.error("Error: ",error);
        return error;
    }
  }

  export async function obtenerTipoDeSociedades(token){
    try{
      const response = await axios.get(`${API}${basePathfindAll}/bill-information/`,{
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const tiposDeSociedades = [...new Set(response.data.result.map((sociedad) => sociedad.society.name))];
      console.log("Tipos de sociedades: ",tiposDeSociedades);
      return tiposDeSociedades;
    }catch(error){
      console.error("Error: ",error);
      return error;
    }
  }

  export async function obtenerInformacionPorSociedad(token,sociedadSeleccionada){
    try{
      const response = await axios.get(`${API}${basePathfindAll}/bill-information/`,{
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const facturasFiltradas = response.data.result.filter((factura) => factura.society.name === sociedadSeleccionada);

      //Filtrar y obtener solo la información de bill de cada factura
      const informacionFacturada = facturasFiltradas.map((factura) =>{const primerasPalabras = obtenerPrimeraPalabras(factura.bill,5);
        
        return { 
          primerasPalabrasBill: primerasPalabras,
        };
      });
      console.log(`Facturas para ${sociedadSeleccionada}: `,informacionFacturada);
      return informacionFacturada;

    }catch(error){
      console.error(`Error al obtener facturas para ${sociedadSeleccionada}: `,error);
      return error;
    }
  }

//Función para obtener las primeras palabras de una cadena
 function obtenerPrimeraPalabras(cadena,numeroPalabras){
   const palabras = cadena.split(' ');
   const primeras = palabras.slice(0, numeroPalabras).join(' ');
  return primeras;
}


export async function obtenerInformacionDeFactura(token,facturaSeleccionada){
  try{
    const response = await axios.get(`${API}${basePathfindAll}/bill-information/`, {
      headers:{
        Authorization: `Token ${token}`,
      },
    });

    const primerasPalabrasFacturaSeleccionada = obtenerPrimeraPalabras(facturaSeleccionada,5);

    const factura = response.data.result.find((factura) => obtenerPrimeraPalabras(factura.bill,5) === primerasPalabrasFacturaSeleccionada);

    if(!factura || !factura.bill){
      console.error(`No se encontró la factura ${facturaSeleccionada}`);
      return null;
    }

    const informacionFacturada = {
      consignee: factura.consignee,
      notify: factura.notify,
      payment_condition: factura.payment_condition,
      bulk_declaration: factura.bulk_declaration,
      download_port: factura.download_port,
    };
    console.log(`Información de la factura ${facturaSeleccionada}: `,facturaSeleccionada);
    return informacionFacturada;
  }catch(error){
    console.error(`Error al obtener información de la factura ${facturaSeleccionada}: `,error);
    return error;
  }
}

  export async function eliminarFicha_(token,id){
    try{
      const response = await axios.delete(`${API}${basePathfindAll}/exportations/${id}/`,{
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


  export async function crearInstructivo(token, objeto) {
    try {
      const response = await axios.post(`${API}${basePathfindAll}/exportation-instruction/`, objeto, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-type': 'application/json',
        },
        responseType: 'arraybuffer', // Configuración para manejar respuestas binarias
      });
      return response.data;
    } catch (error) {
      console.error("Error al generar el documento", error);
      throw error;
    }
  }
  


