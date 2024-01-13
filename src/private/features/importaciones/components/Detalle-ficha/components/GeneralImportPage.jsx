import "../../../../../../styles/global/button.css";
import {  useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from "../../../../../../contexts/Authutils";
 

export function GeneralImportPage() {

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
            <h3>Información general</h3>
             <div className="detalle">
                    
                    <div className="detalle__body form">


						<div className="detalle__body__col--uno">
							<label>Sociedad</label>
							<div>
								<input type="text" value="3000" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>CI</label>
							<div>
								<input type="text" value="ZIMP" className="w-100" readOnly />
							</div>
						</div>

						

						<div className="detalle__body__col--uno">
							<label>Ce.</label>
							<div>
								<input type="text" value="ZIMP" className="w-100" readOnly />
							</div>
						</div>

						<div className="detalle__body__col--uno">
							<label>Fecha Incoterms</label>
							<div>
								<input type="text" value="19/01/2024" className="w-100" readOnly />
							</div>
						</div>



						<div className="detalle__body__col--uno">
							<label>Fecha de Alistamiento</label>
							<div>
								<input type="text" value="10/05/2023" className="w-100" readOnly />
							</div>
						</div>

						<div className="detalle__body__col--uno">
							<label>Pedidos MK</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Doc. Compr.</label>
							<div>
								<input type="text" value="4720004264" className="w-100" readOnly />
							</div>
						</div>

						<div className="detalle__body__col--uno">
							<label>Posición</label>
							<div>
								<input type="text" value="10" className="w-100" readOnly />
							</div>
						</div>

						<div className="detalle__body__col--uno">
							<label>Fecha doc.</label>
							<div>
								<input type="text" value="03/12/2023" className="w-100" readOnly />
							</div>
						</div>


						

						<div className="detalle__body__col--tres">
							<label>Proveedor</label>
							<div>
								<input type="text" value="200407 TANGSHAN MONOPY CERAMIC CO. LTD" className="w-100" readOnly />
							</div>
						</div>

						
						<div className="detalle__body__col--uno">
							<label>Sol. Pedido</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>

						<div className="detalle__body__col--uno">
							<label>Pos. Solped.</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Material</label>
							<div>
								<input type="text" value="000000000610005537" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Texto breve</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>UMP</label>
							<div>
								<input type="text" value="Administrador" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Cantidad</label>
							<div>
								<input type="text" value="143" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Precio neto</label>
							<div>
								<input type="text" value="10439.0" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Moneda</label>
							<div>
								<input type="text" value="USD" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Estado</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>País</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Incoterms</label>
							<div>
								<input type="text" value="FOB" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Fecha pick up</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>

						<div className="detalle__body__col--uno">
							<label>Vía</label>
							<div>
								<input type="text" value="Transporte marítimo" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Tipo</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Bulto</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>


						<div className="detalle__body__col--uno">
							<label>Tipo / Peso</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>

						<div className="detalle__body__col--uno">
							<label>Liberación</label>
							<div>
								<input type="text" value="-" className="w-100" readOnly />
							</div>
						</div>

 
  
                    </div>

            </div>
			 
 
        </>
    );
}