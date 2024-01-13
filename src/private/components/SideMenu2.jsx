import Proptypes from 'prop-types'
import { Link, NavLink} from 'react-router-dom';
import { faGreaterThan,faTimes,faLessThan} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../styles/dashboard/SideMenu.css"
import { useState } from 'react';
import { UserInformation } from '../../services/dashboard/DashboardService';
import { useAuth } from '../../contexts/Authutils';
import { useEffect } from 'react';

export function SideMenuDos({menuOpen,setMenuOpen})
{

    const [user,setUser] =  useState(null);

    const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación

    useEffect(() => {
        
        const fetchUserInformation = async () => {
          try {
            const userData = await UserInformation(accessToken);
            setUser(userData);
          } catch (error) {
            console.error('Error al obtener información del usuario: ', error);
          }
        };
    
        fetchUserInformation();
      }, [accessToken]);

      const shouldShowLink = (role) => user?.role?.some((r) => r.name === role);
    
     return(
        <section className={`menu__side ${menuOpen ? '' : 'menu__side_move'}`}>

            <section className="options__menu">
        
                    <Link to="/dashboard">
                    <div className={`option ${menuOpen ? "menuOpen" : ""}`}>

                        <section className='option__d'>
                            <span></span>
                        </section>  
                        <h4>Principal</h4>      
                    </div>

                    </Link>
                
                    <NavLink to="/features/importaciones">
                    <div className={`option ${menuOpen ? "menuOpen" : ""}`}>
                        <section className='option__i'>
                            <span></span>
                        </section>
                        <h4>Importaciones</h4>
                    </div>
                    </NavLink>
                    <div className='submenu'>
                        <ul >
                            <li><NavLink exact to='/features/importaciones/pedidos'><span><em className="icon-nav icon-nav--pedido"></em></span> Lista de pedidos</NavLink></li>
                            <li><NavLink exact to='/features/importaciones/fichas'><span><em className="icon-nav icon-nav--pedido"></em></span>  Gestión de fichas</NavLink></li>


                            <li>
                                <NavLink exact to='/features/importaciones/seguimiento'><span><em className="icon-nav icon-nav--pedido"></em></span> Seguimiento de Fechas  y documentación</NavLink>
                                <ul className='sub-submenu'>
                                    <li><NavLink exact to='/features/importaciones/seguimiento/seguimiento-lista-ficha'>Lista de Fichas</NavLink></li>
                                    <li><NavLink exact to='/features/importaciones/seguimiento/seguimiento-pedido-de-compra'>Lista de Posición Pedido de Compra de Ficha</NavLink></li>
                                    <li><NavLink exact to='/features/importaciones/seguimiento/seguimiento-datos-de-ficha'>Seguimiento de Datos Fichas</NavLink></li>
                                    <li><NavLink exact to='/features/importaciones/seguimiento/seguimiento-de-documentos'>Seguimiento de Documentos</NavLink></li>
                                </ul>
                            
                            </li>
                            


                            <li><NavLink exact to='/features/importaciones/condiciones'><span><em className="icon-nav icon-nav--pedido"></em></span> Condiciones de importación</NavLink>
                                <ul className='sub-submenu'>
                                    <li><NavLink exact to='/features/importaciones/condiciones/condiciones-lista-ficha'>Lista de Fichas</NavLink></li>
                                    <li><NavLink exact to='/features/importaciones/condiciones/condiciones-lista-posicion'>Lista de Posición de Pedido de Compra de Fichas</NavLink></li>
                                    <li><NavLink exact to='/features/importaciones/condiciones/condiciones-lista-condicion'>Lista de Condición por Ficha</NavLink></li>
                                </ul>
                            </li>
                            
                            

                            <li><NavLink exact to='/features/importaciones/gestion'><span><em className="icon-nav icon-nav--pedido"></em></span> Gestión EM</NavLink>
                                <ul className='sub-submenu'>
                                    <li><NavLink exact to='/features/importaciones/gestion/gestion-em-lista-ficha'>Lista de Fichas</NavLink></li>
                                    <li><NavLink exact to='/features/importaciones/gestion/gestion-em-lista-posicion'>Lista de Posición de Pedido de Compra Listo para EM</NavLink></li>
                                    <li><NavLink exact to='/features/importaciones/gestion/gestion-em-evidencia'>Evidencia EM</NavLink></li>
                                </ul>
                            </li>
                            
                            
 
                        </ul>
                    </div>
                   

                    <NavLink to='/features/exportaciones'>
                    <div className={`option ${menuOpen ? "menuOpen" : ""}`}>
                        <section className='option__e'>
                            <span></span>
                        </section>
                        <h4>Exportaciones</h4>
                    </div>
                    </NavLink>
                 
                    <div className='submenu'>
                        <ul>
                            {shouldShowLink('Analista Comercial - EXP') ? (
                                <>
                                <li><NavLink exact="true" to='/features/exportaciones/pedidos'><span><em className="icon-nav icon-nav--gficha"></em></span> Lista de pedidos</NavLink></li>
                                
                                </>

                            ) : shouldShowLink('Analista comex - EXP') ? (
                                <>
                                  <li><NavLink exact="true" to='/features/exportaciones/fichas'><span><em className="icon-nav icon-nav--gsficha"></em></span> Gestión de fichas</NavLink></li>
                                
                                </>

                            ): shouldShowLink('Coordinador Comex - EXP') ? (
                                <>
                                 <li><NavLink exact="true" to='/features/exportaciones/fichas'><span><em className="icon-nav icon-nav--gsficha"></em></span> Gestión de fichas</NavLink></li>
                                </>
                            ): shouldShowLink('Agente de Aduana - EXP') ? (
                                <>
                                <li><NavLink exact="true" to='/features/exportaciones/fichas'><span><em className="icon-nav icon-nav--gsficha"></em></span> Gestión de fichas</NavLink></li>    
                                </>

                            ) :  (
                                <>

                                <li><NavLink exact="true" to='/features/exportaciones/pedidos'><span><em className="icon-nav icon-nav--gficha"></em></span> Lista de pedidos</NavLink></li>
                                <li><NavLink exact="true" to='/features/exportaciones/fichas'><span><em className="icon-nav icon-nav--gsficha"></em></span> Gestión de fichas</NavLink></li>
                                <li><NavLink exact="true" to='/features/exportaciones/reporte'><span><em className="icon-nav icon-nav--seguimiento"></em></span>Seguimiento</NavLink></li>
                                
                                </>
                            )}
                           
                        </ul>
                    </div>


                    <NavLink to='/features/reclamaciones'>
                    <div className={`option ${menuOpen ? "menuOpen" : ""}`}>
                        <section className='option__r'>
                            <span></span>
                        </section>
                        <h4>Reclamaciones</h4>
                    </div>
                    </NavLink>
                    <div className='submenu'>
                        <ul>
                            <li><NavLink exact="true" to='/features/reclamaciones/nuevo-registro'><span><em className="icon-nav icon-nav--gficha"></em></span> Nuevo registro</NavLink></li>
                            <li><NavLink exact="true" to='/features/reclamaciones/gestionar-fichas'><span><em className="icon-nav icon-nav--gsficha"></em></span> Gestión de fichas</NavLink></li>
                        </ul>
                    </div>



                    <Link to="#">
                    <div className={`option ${menuOpen ? "menuOpen" : ""}`}>
                        <section className='option__user'>
                            <span></span>
                        </section>
                        <h4>Mantenimiento de usuarios</h4>
                    </div>
                    </Link>

            </section>


            <div>
                <div className={menuOpen ? "icon-menu--open": "icon__menu"}>
                    <FontAwesomeIcon icon={ menuOpen ? faLessThan : faGreaterThan } onClick={() => setMenuOpen(!menuOpen)}/>
                </div>

                <div className="icon__cerrar">
                    <FontAwesomeIcon icon={faTimes} onClick={() => setMenuOpen(!menuOpen)}/>
                </div>
            </div>
            


   </section>
    )
}

SideMenuDos.propTypes = {
    menuOpen: Proptypes.bool.isRequired,
    setMenuOpen: Proptypes.func.isRequired

}