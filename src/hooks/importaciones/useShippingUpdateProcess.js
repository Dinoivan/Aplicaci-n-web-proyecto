import { ShippingUpdate} from "../../services/importaciones/ShippingUpdate";

export async function findAllRequestShipping(id,token){

    try{
        const gestionfichas = await ShippingUpdate(id,token);
        if(gestionfichas){
            return gestionfichas;
        }
    }catch(error){
        console.error("Error al obtener los datos hola",error);
        return "Algo salio mal";
    }

}