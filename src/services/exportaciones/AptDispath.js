import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"

//Servicio para listar apt-dispatch
export async function AptDispath(id,token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/apt-dispatch/?pk=${id}`,{
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


//Servicio para listar apt-dispatch
export async function AptDispathDocuments(id,token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/apt-program-document/?apt_dispatch_id=${id}`,{
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

export async function AddAptDispath(token,Objeto){
    try{

        const response = await axios.post(`${API}${basePathfindAll}/apt-dispatch/`, Objeto,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

    }catch(error){
        console.error("Error al agregar un Dispath: ",error);
        throw error;
    }
}

export async function AgregarDocumentos(token,apt_dispatch,exportation,document){
    try{
        const formData = new FormData();
        formData.append('apt_dispatch',apt_dispatch);
        formData.append('exportation',exportation);
        formData.append('document',document);

        const response = await axios.post(`${API}${basePathfindAll}/apt-program-document/`, formData,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }catch(error){
        console.error("Error al agregar el pedido: ",error);
    }

}

//actualizar datos de apt
export async function ActualizarAPT(token,id,objeto){
    try{
        const response = await axios.put(`${API}${basePathfindAll}/apt-dispatch/?pk=${id}`, objeto,{
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
