import { NavLink, Outlet} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
 import { useEffect,useState } from 'react';
  
export function DetalleFichaPage() {
  

        return(
            <>

            <section className="headbar headbar--abierto">

             
                <div className="headbar__detail">
                     <>
                     <div>
                    <em className="ico-element-ficha"></em> 
                      <span><strong>Ficha:</strong> 2101230001</span>
                      </div> 
                    </>
                
                </div>
            </section>

            <section className="bodyFeature">
                <ul className='bodyFeature__tab'>
                    <li><NavLink exact="true" to={`/features/importaciones/ficha/general`}>
                        General
                        </NavLink></li>
                    
                     
                </ul>

                <div className="bodyFeature__tabcnt">
                    <Outlet />
                </div>
            </section>      
            </>
        );
    }
