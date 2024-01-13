import { NavLink, Outlet} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {findAllPedidoId} from "../../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import { useEffect,useState } from 'react';
import { useAuth } from "../../../../../contexts/Authutils";
 
export function DetalleReclamacionPage() {
   return(
            <>

            <section className="headbar headbar--abierto">

             
                <div className="headbar__detail">
                 
                     <div >
                    <em className="ico-element-ficha"></em> 
                      <span><strong>Ficha:</strong> 2101230001</span>
                      </div> 
             
                </div>
            </section>

            <section className="bodyFeature">
                <ul className="bodyFeature__tab">
                    <li>
                        <NavLink exact="true" to={`/features/reclamaciones/ficha/sustentacion`}>
                            Sustentación
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact="true" to={`/features/reclamaciones/ficha/revision`}>
                            Revisión y análisis
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact="true" to={`/features/reclamaciones/ficha/rechazo`}>
                            Rechazo
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact="true" to={`/features/reclamaciones/ficha/confirmacion`}>
                            Confirmación de rechazo
                        </NavLink>  
                    </li>
                    <li>
                        <NavLink exact="true" to={`/features/reclamaciones/ficha/deposito`}>
                            Depósito y compensación
                        </NavLink>  
                    </li>
                    
                </ul>

                <div className="bodyFeature__tabcnt">
                    <Outlet />
                </div>
            </section>      
            </>
        );
    }
