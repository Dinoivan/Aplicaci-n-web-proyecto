import {AdditionalInformation} from "../../services/importaciones/AdditionalInformation";

export async function findAllAditional(id,token){

    try{
        const Apt = await AdditionalInformation(id,token);
        if(Apt){
            return Apt;
        }
    }catch(error){
        console.error("Error al obtener los datos hola",error);
        return "Algo salio mal";
    }

}