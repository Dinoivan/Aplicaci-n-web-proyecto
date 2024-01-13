import "../../../../../../styles/global/button.css";
import {  useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../../../../../contexts/Authutils";
 

export function SustentacionPage() {

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
            <h3>Sustentación de reclamo</h3>
			<h4>Nombre: 303100000001</h4>
             <div className="detalle">
                    
                    <div className="detalle__body form">


						<div className="detalle__body__col--uno">
							<label>Nº de ficha</label>
							<div>
								<input type="text" value="434232" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Nº de Booking</label>
							<div>
								<input type="text" value="9854" className="w-100" readOnly />
							</div>
						</div>

						

						<div className="detalle__body__col--uno">
							<label>Línea Naviera</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>

						<div className="detalle__body__col--tres">
							<label>Cliente / Proveedor</label>
							<div>
								<input type="text" value="MERCADO Y BODEGA DE AZULEJOS" className="w-100" readOnly />
							</div>
						</div>



						<div className="detalle__body__col--uno">
							<label>Agente de Carga</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>

						<div className="detalle__body__col--uno">
							<label>Concepto del reclamo</label>
							<div>
								<input type="text" value="INCONFORMIDAD" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Analista Comex</label>
							<div>
								<input type="text" value="Administrador" className="w-100" readOnly />
							</div>
						</div>

						<div className="detalle__body__col--tres">
							<label>Observaciones</label>
							<div>
								<textarea rows={4} className="w-100"></textarea>
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