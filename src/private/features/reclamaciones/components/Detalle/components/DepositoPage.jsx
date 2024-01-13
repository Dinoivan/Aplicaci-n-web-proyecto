import "../../../../../../styles/global/button.css";
import {  useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../../../../../contexts/Authutils";
 

export function DepositoPage() {

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
            <h3>Depósito y compensación</h3>
			<h4>Nombre: 303100000001</h4>
             <div className="detalle">
                    
                    <div className="detalle__body form">


						<div className="detalle__body__col--uno">
							<label>Carga de comprobante</label>
							<div>
								<input type="text" value="434232" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Fecha de pago</label>
							<div>
								<input type="text" value="10/04/2024" className="w-100" readOnly />
							</div>
						</div>

						

						<div className="detalle__body__col--uno">
							<label>Fecha de extorno de la cuenta</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>
 

  
  
                    </div>

            </div>
			<div className="text-center block-center">
				<button className="btn btn__primary">Guardar</button>

			</div>
 
        </>
    );
}