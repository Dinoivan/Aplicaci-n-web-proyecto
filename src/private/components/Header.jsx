import { faBars} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../styles/dashboard/Header.css"
import PropTypes from 'prop-types'

export function Header({setMenuOpen,menuOpen,Imagenes,loading,userIniciales,userEmail,showLogoutPopup,handleLogout,setShowLogoutPopup}){



    return(

        <header className='header'>

                <div className='header__menu'>
                    <FontAwesomeIcon icon={faBars} onClick={() => setMenuOpen(!menuOpen)} className='menu-icon'/>
                </div>
                
                <div className="header__imagenes">
                    <img src={Imagenes} className="header__imagen--logotipo" alt="imagenes"/>
                </div>

                <div className='header__contenido'>

                    <div className="header__iniciales">
                        <span className="iniciales">{loading ? '...' : userIniciales}</span>
                    </div>
                
                    <section className="header__texto">
                        <h1 className="header__texto-h1">{loading ? 'Cargando...' : userEmail}</h1>
                        <p className="header__texto-p">Sociedad Cerámica Lima</p>   
                    </section>

                    <div className="header__opcion" onClick={() => setShowLogoutPopup(!showLogoutPopup)}>  
                    <span></span>
                    {showLogoutPopup &&
                    <div className="logout-popup"><button onClick={handleLogout}>Cerrar sesión</button></div>}
                    </div>
                
                </div>


           
    </header>

    )
         
 }

 Header.propTypes = {
    setMenuOpen: PropTypes.func.isRequired,
    menuOpen: PropTypes.bool.isRequired,
    Imagenes: PropTypes.string.isRequired,
    Figura: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    userIniciales: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    showLogoutPopup: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired,
    setShowLogoutPopup: PropTypes.func.isRequired,
  };

