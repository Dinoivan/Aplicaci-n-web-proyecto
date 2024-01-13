import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { obtenerNombreUsuario,obtenerIniciales } from './useDashboardService';

//Función para cerrar sesión
export function useDasboarProcess(setShowLogoutPopup){


    const navigate = useNavigate();
    
    const handleLogout = () => {
        setShowLogoutPopup(false);
        navigate('/');
      };

      return handleLogout;

}

//Refrescar el nombre de usuario
 export function useFectchUserData(accessToken, setLoading, setUserEmail, setUserIniciales) {
   useEffect(() => { 
     const fetchData = async () => {
       if (accessToken) {
         try {
           const userName = await obtenerNombreUsuario(accessToken); 
           setLoading(false); 
          setUserIniciales(prevIniciales => obtenerIniciales(userName) || prevIniciales); 
          setUserEmail(userName); 
         } catch (error) { 
           console.error('Error al obtener el nombre de usuario:', error);
         }
       }
     }; 

     fetchData();
  }, [accessToken, setLoading, setUserEmail, setUserIniciales]);
 } 








