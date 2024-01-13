import axios from 'axios';
import { API } from '../../constants/env';

const basePathfindAll = "/api"

//Servicio para listar dispatch-program
export async function DispathProgram(id,token){

    try{
        const response = await axios.get(`${API}${basePathfindAll}/dispatch-program/?pk=${id}`,{
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

//Servicio para obtener las fechas de dispath-program por ficha
 export async function DispathProgramFicha(ficha,token){

     try{
         const response = await axios.get(`${API}${basePathfindAll}/dispatch-program/?pk=${ficha}`,{
             headers: {
                 Authorization: `Token ${token}`
             }
         });
         const result =  response.data.result;
         if(result.length > 0){
             const primerDispath = result[0];

             const valueList = {
                 dispathId: primerDispath.id,
             };

             return valueList;
         }
         else{
            return null;
         }
     }catch(error){
         console.error("Error al obtener datos: ",error);
         throw error;
     }   
 }


export async  function DispathProgramLocation(id,token){
    try{
        
        const response = await axios.get(`${API}${basePathfindAll}/dispatch-program-location/?dispatch_program_id=${id}`,{
            headers: {
                Authorization: `Token ${token}`
            }
        });

        //Filtrar los resultados solo para las ubicaciones SJL y TREBOL
        const sjlDates = response.data.result.filter(item => item.location === 'SJL').map(item => item.loading_dates_per_plant);

        const phDates = response.data.result.filter(item => item.location === 'PH').map(item => item.loading_dates_per_plant);

        const millaDates =  response.data.result.filter(item => item.location === 'MILLA').map(item => item.loading_dates_per_plant);

        const trebolDates = response.data.result.filter(item => item.location === 'TREBOL').map(item => item.loading_dates_per_plant);

        //Crear y retornar un objeto con las fechas para SJL y TREBOL
        return {
            sanJuanDeLurigancho: sjlDates.length > 0 ? sjlDates.join(', '): "No existe fecha",
            ph: phDates.length > 0 ? phDates.join(', '): "No existe fecha",
            milla: millaDates.length > 0 ? millaDates.join(', '): "No existe fecha",
            trebol: trebolDates.length > 0 ? trebolDates.join(', '): "No existe fecha",
        };
        
    }catch(error){
        console.error("Error al obtener datos: ",error);
        return error;
    }
}


export async function ParametrizaionZona(token){
    try{
        const response = await axios.get(`${API}${basePathfindAll}/zone/?type=EXPORT`,{
            headers:{
                Authorization: `Token ${token}`
            },
        });
        const NombreZonaParametrizacion = response.data.result.map((NombreZona) => NombreZona.name);
        return NombreZonaParametrizacion;
    }catch(error){
        console.error("Error: ",error);
        return error;
    }
  }


export async function AddDispath(token,Objeto){
    try{
        const response = await axios.post(`${API}${basePathfindAll}/dispatch-program/`, Objeto,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;

    }catch(error){
        console.error("Error al agregar un Dispath: ",error);
        return error;
    }
}


//Versión 2 actualizar
export async function UpdateProgramDispath(token,id,objeto){

    try{
        const response = await axios.put(`${API}${basePathfindAll}/dispatch-program/?pk=${id}`, objeto, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },

        });
        return response.data;
    }catch(error){
        console.error("Error al agregar al actualizar: ",error);
        return error;

    }
}

export async function UpdateDispath(token,Objeto){
    try{
        const response = await axios.put(`${API}${basePathfindAll}/dispatch-program/`, Objeto,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json', 
            },
        });
        return response.data;

    }catch(error){
        console.error("Error al actualizar un Dispath");
        return error;
    }
}

//Fechas múltiples
export async function fechasMultiples(token,Objeto){
    try{
        const response = await axios.post(`${API}${basePathfindAll}/dispatch-program-location/`,Objeto,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }catch(error){
        console.error("Error ingresar fechas multiples");
    }
}


//get fechas múltiples
export async function getFechasMultiples(token,id){
    try{
        const response = await axios.get(`${API}${basePathfindAll}/dispatch-program-location/?dispatch_program_id=${id}`,{
            headers: {
                Authorization: `Token ${token}`,
            }
        });
        return response.data.result;
    }catch(error){
        console.error("Error al listar fechas multiples");
    }
}

//Servicio para actualizar programa de despacho por localidades
export async function UpdateDispathProgram(id,token,objeto){
    try{
        const response = await axios.put(`${API}${basePathfindAll}/dispatch-program-location/?dispatch_program_id=${id}`, objeto,{
            headers: {
                Authorization: `Token ${token}`,
                'Content-type': 'application/json',
            },

        });
        return response.data;
    }catch(error){
        console.error("Error al actualizar fechas mediante un locación");
        return  error;
    }
}

//Eliminar fechas multiples
export async function EliminarFechas(token,id){
    try{
        const response = await axios.delete(`${API}${basePathfindAll}/dispatch-program-location/${id}/`,{
            headers: {
                Authorization: `Token ${token}`
            },
        });
        return response.data;
    }catch(error){
        console.error("Error al eliminar una fecha");
        return error;
    }
}
