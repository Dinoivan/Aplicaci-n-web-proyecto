import "../../../../../../styles/global/button.css";
import {  useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../../../../../contexts/Authutils";
 

export function RechazoPage() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pk = searchParams.get('pk');

  if (pk !== localStorage.getItem('fichaId')) {
   localStorage.setItem('fichaId', pk);
 }
  const fichaId = localStorage.getItem('fichaId');
  const [data, setData] = useState([]);
  const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación
 
 
    return(
        <>
            <h3>Rechazo</h3>
			<h4>Nombre: 303100000001</h4>
             <div className="detalle">
                    
                    <div className="detalle__body form">


					 
						<div className="detalle__body__col--tres">
						<label>Motivo del rechazo</label>
							<div>
								<textarea rows={4} className="w-100"></textarea>
							</div>
						</div>

						
							

   

					 
						<div className="text-center block-center">
				<button className="btn btn__primary">Guardar</button>

			</div>
  
  
                    </div>

            </div>
			 
 
        </>
    );
}