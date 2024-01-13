import {FindAllPedidos,FindAllPedidosDetailsId,FindAllPedidosDetailsIdFicha,CreateFicha} from "../../../services/exportaciones/listapedidosServices";
import {FiltrosPedidos,eliminarPedido} from "../../../services/exportaciones/listapedidosServices";

export async function findAllpedidolist(token){

    try{
        const pedidolist = await FindAllPedidos(token);
        if(pedidolist){
            return pedidolist;
        }
    }catch(error){
        console.error("Error al obtener los datos hola",error);
        return "Algo salio mal";
    }

}

export async function FiltrarDatosPedidos(params, token) {
    try {
      const resultado = await FiltrosPedidos(params, token);
      if (resultado) {
        return resultado;
      }
    } catch (error) {
      console.log("Error al filtrar los datos específicos");
      return "Algo salió mal";
    }
  }

export async function findAllPedidosFichaId(id,token){
    try{
        const resultado = await FindAllPedidosDetailsIdFicha(id,token);
        if(resultado){
            return resultado;
        }
    }catch(error){
        console.log("Error no se puede filtrar los datos");
        return "Algo salio mal";
    }
}


export async function findAllPedidoId(id,token){
    try{
        const resultado = await FindAllPedidosDetailsId(id,token);
        if(resultado){
            return resultado;
        }
    }catch(error){
        console.log("Error no se puede filtrar los datos");
        return "Algo salio mal";
     }
}



// export async function UpdatePedidos(token, pedidosData,documentPDF) {
//     try {
//         const response = await UpdateFicha(token, pedidosData,documentPDF);
//         return response; // Devuelve la respuesta del servicio de creación
//     } catch (error) {
//         console.error("Error al acrualizar una ficha: ", error);
//         throw error;
//     }
// }

export async function CreateFichas(token,fichaData,documentPDF){
    try{
        const response = await CreateFicha(token,fichaData,documentPDF);
        return response;
    }catch(error){
        console.error("Error al crear un ficha",error);
    }
}


//Lógica para eliminar pedido
export async function EliminarPedido(token,eliminar){
    try{
        await eliminarPedido(token,eliminar);
        return {success: true,message: "Pedido eliminado con éxito"};
    }catch(error){
        console.error("Error al eliminar un pedido",error);
        throw error;

    }
}















