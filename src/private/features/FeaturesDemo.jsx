
import { useDasboarState } from "../../hooks/dashboard/useDashboarState";
import { useDasboarProcess } from "../../hooks/dashboard/useDashboardProcess";
import Imagenes from "../../assets/imagenes/logo.png";
import Figura from "../../assets/imagenes/Figura.png";
import { useEffect } from "react";
import {obtenerNombreUsuario} from "../../hooks/dashboard/useDashboardService";
import {obtenerIniciales} from "../../hooks/dashboard/useDashboardService";
import { useAuth } from "../../contexts/Authutils";
import { Header } from "../components/Header";
import { Footer } from "./../components/Footer";
import "../../styles/dashboard/Dashboard.css";
import "../../styles/features/features.css";
import { SideMenuDos } from "../components/SideMenu2";
import { Outlet } from "react-router-dom";


export function FeaturesDemo() {

        const {  menuOpen, setMenuOpen,
                 showLogoutPopup, setShowLogoutPopup,userEmail,setUserEmail,
                 loading,setLoading,userIniciales,setUserIniciales
              } = useDasboarState();

              const { accessToken } = useAuth();
             
            const handleLogout  = useDasboarProcess(setShowLogoutPopup);

            useEffect(() => {
                if (accessToken) {
                    obtenerNombreUsuario(accessToken)
                      .then(userName => {
                        setLoading(false);
                        const iniciales = obtenerIniciales(userName);
                        setUserIniciales(iniciales);
                        setUserEmail(userName);
                      })
                      .catch(error => {
                        console.error('Error al obtener el nombre de usuario:', error);
                      }); 
                }
            
              }, [accessToken,setLoading,setUserEmail,setUserIniciales]);

        return(
            <>

        
            <Header 
                setMenuOpen={setMenuOpen}
                menuOpen={menuOpen} 
                Imagenes={Imagenes}
                Figura={Figura}
                loading={loading}
                userIniciales={userIniciales} 
                userEmail={userEmail}
                showLogoutPopup={showLogoutPopup} 
                handleLogout={handleLogout} 
                setShowLogoutPopup={setShowLogoutPopup}
             />
          
              <SideMenuDos
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
             />

             <section>
                  <Outlet />
              </section>
    
           <Footer/>

            </>
        );
    }
