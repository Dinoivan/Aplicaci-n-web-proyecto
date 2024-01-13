import {AptDispath} from "../../services/exportaciones/AptDispath"

export async function findAllAptDispath(id,token){

    try{
        const Apt = await AptDispath(id,token);
        if(Apt){
            return Apt;
        }
    }catch(error){
        console.error("Error al obtener los datos hola",error);
        return "Algo salio mal";
    }

}