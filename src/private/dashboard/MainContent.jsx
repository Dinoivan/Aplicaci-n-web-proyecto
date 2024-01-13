import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'
import "../../styles/dashboard/MainContent.css"
import { UserInformation } from '../../services/dashboard/DashboardService';
import { useAuth } from '../../contexts/Authutils';
import { useEffect,useState } from 'react';

export function MainContent(){

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

        <main className="principal">

            <section className='texto'>
                <h1>Módulos activos</h1>
            </section> 

            <section className='modulos'>
                <article className="principal__modulos--contenido">

                        <section className="contenido">
            
                            <section className='contenido__i'>
                                <span></span>
                            </section>

                            <h1>Importaciones</h1>
                            <p>Coordinacion, control y optimización</p>

                        </section>

                        <section className="icono">
                        <Link to="/features/importaciones/fichas"><span><FontAwesomeIcon icon={faArrowRight} /></span></Link>
                        </section>

                </article>


                
                <article className="principal__modulos--contenido">

                        <section className="contenido">
        
                            <section className='contenido__e'>
                                <span></span>
                            </section>

                            <h1>Exportaciones</h1>
                            <p>Registro de documentación para venta</p>
                        </section>

                        <section className="icono">
                        {shouldShowLink('Analista Comercial - EXP') ? (
                            <>
                             <Link to="/features/exportaciones/pedidos"><span><FontAwesomeIcon icon={faArrowRight} /></span></Link>
                            </>
                        ):shouldShowLink('Analista comex - EXP') ? (
                            <>
                              <Link to="/features/exportaciones/fichas"><span><FontAwesomeIcon icon={faArrowRight} /></span></Link>
                            </>
                        ):shouldShowLink('Coordinador Comex - EXP') ? (
                            <>
                              <Link to="/features/exportaciones/fichas"><span><FontAwesomeIcon icon={faArrowRight} /></span></Link>
                            </>
                        ):shouldShowLink('Agente de Aduana - EXP') ? (
                            <>
                              <Link to="/features/exportaciones/fichas"><span><FontAwesomeIcon icon={faArrowRight} /></span></Link>
                            </>
                        ): (
                            <>
                            <Link to="/features/exportaciones/pedidos"><span><FontAwesomeIcon icon={faArrowRight} /></span></Link>
                            </>
                        )}
 
                        </section>

                </article>

                <article className="principal__modulos--contenido">
                        <section className="contenido">
            
                            <section className='contenido__r'>
                                <span></span>
                            </section>

                            <h1>Reclamaciones</h1>
                            <p>Inicio y seguimiento</p>
                        </section>

                        <section className="icono">
                        <Link to="/"><span><FontAwesomeIcon icon={faArrowRight} /></span></Link>
                        </section>

                </article>

        </section>
    </main>

    )
}

