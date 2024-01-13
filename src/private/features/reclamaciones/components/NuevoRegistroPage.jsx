import { Link } from "react-router-dom";
import { HeadTitleSection } from "../../../components/Head-Title";

export function NuevoRegistroPage() {



  return(
    <>
        <section className="headbar headbar--abierto">

        <div class="headbar__title">
            <h3> Nuevo registro</h3>
            <p>Cree una nueva solicitud de reclamación</p>
        </div>

        <div class="headbar__acciones">
            <button class="btn btn--ico btn--medium btn__secondary--outline">
                <i class="bi bi-arrow-repeat"></i>
                Migrar SAP
            </button>
        </div>

        </section>
      <section class="bodyFeature">
 
 
      <div>
           <div className="detalle">
		 		<h3>Información general</h3>
            	<div className="detalle__body form">
						
                  	<div className="detalle__body__col--uno">
                        <label>Nº de pedido</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>

					<div className="detalle__body__col--uno">
                        <label>Nº de Booking</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>


					<div className="detalle__body__col--uno">
                        <label>Fecha de Booking</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>


					<div className="detalle__body__col--uno">
                        <label>Cliente</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>


					<div className="detalle__body__col--uno">
                        <label>Cliente destinatario</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>

					<div className="detalle__body__col--uno">
                        <label>País destino</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>


					<div className="detalle__body__col--uno">
                        <label>RUC del proveedor</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>


					<div className="detalle__body__col--dos">
                        <label>Razón social del proveedor</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>


					<div className="detalle__body__col--uno">
                        <label>Línea Naviera</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>


					<div className="detalle__body__col--uno">
                        <label>Agente de carga</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>



            	</div>

				<h3>Datos de comprobante de pago</h3>
				<div className="detalle__body form">
					<div className="detalle__body__col--uno">
                        <label>Documento en reclamo</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>
					<div className="detalle__body__col--uno">
                        <label>Tipo de documento</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>

					<div className="detalle__body__col--uno">
                        <label>Moneda</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>


					<div className="detalle__body__col--uno">
                        <label>Subtotal</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>

					<div className="detalle__body__col--uno">
                        <label>IGV</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>

					<div className="detalle__body__col--uno">
                        <label>Importe total</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>

					<div className="detalle__body__col--uno">
                        <label>Fecha de documento</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>

					<div className="detalle__body__col--uno">
                        <label>Adjuntar de documento</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>

				</div>


				<h3>Especificación de reclamo</h3>
				<div className="detalle__body form">
					<div className="detalle__body__col--tres">
                        <label>Concepto de reclamo</label>
						<div>
							<textarea className="w-100"></textarea>
						</div>
                    </div>
					<div className="detalle__body__col--uno">
                        <label>Tipo de reclamo</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>
					<div className="detalle__body__col--uno">
                        <label>Analista comex a cargo</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>
					<div className="detalle__body__col--uno">
                        <label>Observaciones</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>

					<div className="detalle__body__col--uno">
                        <label>Moneda</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>

					<div className="detalle__body__col--uno">
                        <label>Importe</label>
						<div>
							<input type="text" value="" className="w-100" />
						</div>
                    </div>


					<div className="text-center block-center">
								<button className="btn btn__primary">Guardar</button>

					</div>

				</div>
           </div>

        </div>
      </section>


    </>
);
}