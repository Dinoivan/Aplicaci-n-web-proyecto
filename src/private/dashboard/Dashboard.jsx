    import Lupa from "../../assets/imagenes/lupa.png"
    import { useDasboarState } from "../../hooks/dashboard/useDashboarState";
    import { useDasboarProcess } from "../../hooks/dashboard/useDashboardProcess";
    import Imagenes from "../../assets/imagenes/logo.png";
    import Figura from "../../assets/imagenes/Figura.png";
    import { useFectchUserData } from "../../hooks/dashboard/useDashboardProcess";
    import { useAuth } from "../../contexts/Authutils";
    import { Header } from "../components/Header";
    import { WelcomeSection } from "./WelcomeSection";
    import { MainContent } from "./MainContent";
    import { Footer } from "./../components/Footer";
    // import { useEffect } from "react";
    import "../../styles/dashboard/Dashboard.css"

export function Dashboard() {

        const {  menuOpen, setMenuOpen,
                 showLogoutPopup, setShowLogoutPopup,userEmail,setUserEmail,
                 loading,setLoading,userIniciales,setUserIniciales
              } = useDasboarState();

            const { accessToken } = useAuth();

            const handleLogout  = useDasboarProcess(setShowLogoutPopup);

            useFectchUserData(accessToken,setLoading,setUserEmail,setUserIniciales);


            console.log("Nombre: ",userEmail);

            console.log("token: ",accessToken);

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

             <WelcomeSection
                menuOpen={menuOpen}
                loading={loading}
                userEmail={userEmail}
                Lupa={Lupa}
             />

            
            <div className={menuOpen ? "menu-overlay--abierto": "menu-overlay"}></div>

            <div className={menuOpen ? "main--abierto": "main"}>
             <MainContent/>
            </div>

           <Footer/>

            </>
        );
    }
