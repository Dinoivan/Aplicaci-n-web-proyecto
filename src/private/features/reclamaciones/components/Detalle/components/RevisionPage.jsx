import "../../../../../../styles/global/button.css";
import {  useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../../../../../contexts/Authutils";
 

export function RevisionPage() {

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
            <h3>Revisión y análisis</h3>
			<h4>Nombre: 303100000001</h4>
             <div className="detalle">
                    
                    <div className="detalle__body form">


						<div className="detalle__body__col--dos">
							<label>Fecha de respuesta del proveedor</label>
							<div>
								<input type="text" value="" className="w-100"  />
							</div>
						</div>

						<div className="detalle__body__col--uno">
							<label>Acción</label>
							<div>
								<select>
									<option value={1}>Aceptación</option>
									<option value={2}>Rechazo</option>
								</select>
							</div>
						</div>

						<div className="detalle__body__col--dos">
							<div className=" mb-3">
									<label>Documentos</label>
									<div className="form__file">
										<input type="file" id="packing" />
										<label name="packing" htmlFor="packing" className="btn btn__primary--outline">Adjuntar</label>
									
									</div>
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