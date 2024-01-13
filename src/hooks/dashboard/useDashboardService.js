import { UserInformation } from '../../services/dashboard/DashboardService';


export async function obtenerNombreUsuario(token){
    const userData = await UserInformation(token)
    if(userData.first_name){
      return userData.first_name;
    }
    else{
      return "Usuario Desconocido";
    }
}

export const obtenerIniciales = (nombreCompleto) => {
  const nombreArray = nombreCompleto.split(' ');
  return nombreArray.map(nombre => nombre.charAt(0)).join('');
};


