import "../../../../styles/features/body.css"
import { useEffect,useCallback,useMemo} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../contexts/Authutils";
import { CrearFichaImportModal} from "../../../../public/modals/CrearFichaImport";
import { AssignFichaModal} from "../../../../public/modals/AsignarFicha";
import { usePedidosState } from "../../../../hooks/importaciones/Estados-logicas-pedidos/usePedidosState";
import { fetchDataWithFilters,fetchDataWithoutFilters } from "../../../../hooks/importaciones/Estados-logicas-pedidos/usePedidosLogica";
import { useState } from "react";
import { CreateFicha } from "../../../../services/importaciones/listapedidosServices";
import {AssignarPedidoFicha} from "../../../../services/importaciones/listapedidosServices"
import { MigrarSap } from "../../../../services/importaciones/MigrarSap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {eliminarFicha} from "../../../../services/importaciones/GestionFichas"
import { format } from 'date-fns';
import { MigrarImportModal } from "../../../../public/modals/MigrarSapImport";

export function GestionFichaPage() {

  // const title = "Pedidos"
  const {pedidos,setPedidos,isModalOpen,setIsModalOpen,showFilter,setShowFilter,
	 orderNumberFilter,setOrderNumberFilter,customerNameFilter,setCustomerNameFilter,
	sellOrganizationFilter,setSellOrganizationFilter,customerNumberFilter,setCutsomerNumberFilter,
	setHasAppliedFilter
  } = usePedidosState();

  const [selectedPedidoId, setSelectedPedidoId] = useState([]);
  const [documentPDF, setDocumentPDF] = useState(null); 
  const [isAssignFichaModalOpen, setIsAssignFichaModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null); 
  const [isFichaCreated, setIsFichaCreated] = useState(false);
  const [isFichaCreatedMigrar, setIsFichaCreatedMigrar] = useState(false);
  const [isMigrarModalOpen, setIsMigrarModalOpen] = useState(false);
  const [modalRequestNumbers, setModalRequestNumbers] = useState([]);

  const [isConfirmationModalOpen,setIsConfirmationModalOpen] = useState(false);
  const [pedidoToDesasociar,setPedidoToDesasociar] =  useState(null);

  const { accessToken } = useAuth();

  const minDate = useMemo(() => {
	const date = new Date();
	date.setMonth(date.getMonth() - 12);
	return date;
  }, []);

  const maxDate = useMemo(() => new Date(), []);

  const isDateRangeValid = useCallback((startDate, endDate) => {
	const twelveMonthsAgo = new Date(maxDate);
	twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
	return startDate >= twelveMonthsAgo && endDate <= maxDate;
  }, [maxDate]);


   const handleMigrarSap =  async (accessToken,requestNumbers) =>{
	 try{
	   const response = await MigrarSap(accessToken,requestNumbers);
	   fetchDataWithoutFilters(accessToken, setPedidos);
	   setIsFichaCreatedMigrar(true);
	   setIsMigrarModalOpen(false);
	 }catch(error){
	   console.error("Error al migrar a SAP: ", error);
	 }
   }
  
  
  const handlePedidoSeleccionado = (pedidoId,e) => {

	if(e.target.type === 'checkbox'){
	  console.log('Clic en el chekbok. Pedido ID: ',pedidoId);
	if(selectedPedidoId.includes(pedidoId)){
	  setSelectedPedidoId(selectedPedidoId.filter(id => id !== pedidoId));
	}
	else{
	  setSelectedPedidoId([...selectedPedidoId,pedidoId]);
	}
	setDocumentPDF(null);
  }
}

  const onAssignFicha = async (fichaId) => {
	if (selectedPedidoId.length > 0) {
	  try {
		const pedidosSeleccionados = selectedPedidoId.map(pedidoId => ({
		  id: pedidoId,
		  exportation_id: fichaId,
		}));
		for (const pedidoData of pedidosSeleccionados) {
		  const response = await AssignarPedidoFicha(accessToken, pedidoData);
		  console.log("Respuesta del servicio:", response);
		}
		fetchDataWithoutFilters(accessToken, setPedidos);
		setSelectedPedidoId([]);
		setIsModalOpen(false);
	  } catch (error) {
		console.error("Error al asignar pedidos a la ficha: ", error);
	  } 
	} else {
	  alert("Seleccione al menos un pedido");
	}
  }

  const handleDesasociarFicha = (pedidoId) =>{
	setPedidoToDesasociar(pedidoId);
	setIsConfirmationModalOpen(true);
  }

  const handleConfirmDesasociar = async () =>{
	if(pedidoToDesasociar){
	  try{
		await eliminarFicha(accessToken,pedidoToDesasociar);
		fetchDataWithFilters(accessToken,setPedidos);
	  }catch(error){
		console.log("Error al desasociaar el pedido de la ficha:", error);
	  }
	  setIsConfirmationModalOpen(false);
	}else{
	  console.log("Pedido inválido.");
	}
  }

  const handleCancelDesasociar = () =>{
	setIsConfirmationModalOpen(false);
	setPedidoToDesasociar(null);
  }

  useEffect(() => {
	fetchDataWithoutFilters(accessToken, setPedidos);
  }, [accessToken, setPedidos]);


  const crear = async (formData) => {
	if(documentPDF){
	  try{
		const fichaData = {
		  customer_oc_number: formData.customer_oc_number,
		  proforma_number: formData.proforma_number,
		  freight_contract_number: formData.freight_contract_number,
		  container_type: formData.container_type,
		  responsible_user_comex: formData.responsible_user_comex,
		  san_juan_de_lurigancho: formData.san_juan_de_lurigancho,
		  la_milla: formData.la_milla,
		  punta_hermosa: formData.punta_hermosa,
		  trebol_san_martin: formData.trebol_san_martin,
		  total_containers: formData.total_containers,
		  currency: formData.currency,
		  sell_organization: formData.sell_organization,
		  net_value: formData.net_value,
		  status: formData.status,
		  status_comment: formData.status_comment
		};
		const response = await CreateFicha(accessToken,fichaData,documentPDF);
		console.log("Respuesta del servicio de crear: ",response);
		setIsFichaCreated(true);
		setIsModalOpen(false);
	  }catch(error){
		console.error("Error al crear un pedido: ",error);
	  }
	}
  }


  const handleCloseConfirmation = () => {
	setIsFichaCreated(false);
  };

  const handleCloseConfirmationMigrar = () =>{
	setIsFichaCreatedMigrar(false);
  }

  const handlerOnClickFiltro = () => {
	setShowFilter(!showFilter);
  }

  const handleApplyFilterClick = useCallback(() => {

	if(!isDateRangeValid(startDate,endDate)){
	  console.error("El rango de fechas seleccionado no es valido.");
	}
	fetchDataWithFilters(
	  accessToken,setPedidos,
	  startDate,endDate,
	  orderNumberFilter,
	  customerNameFilter,
	  sellOrganizationFilter,
	  customerNumberFilter
	);
	setHasAppliedFilter(true);
  }, [accessToken,startDate,
	endDate,orderNumberFilter,
	customerNameFilter, sellOrganizationFilter, 
	customerNumberFilter , setPedidos,
	setHasAppliedFilter,isDateRangeValid]);


  const limpiarFiltros = () => {
	setStartDate(null);
	setEndDate(null);
	setOrderNumberFilter('');
	setCustomerNameFilter('');
	setSellOrganizationFilter('');
	setCutsomerNumberFilter('')
	setHasAppliedFilter(false);
	fetchDataWithoutFilters(accessToken, setPedidos);
  };

		return(
			<>
				<section className="headbar headbar--abierto">

						<div className="headbar__title">
							<h3>Importaciones &rarr;  Lista de pedidos</h3>
							<p>Coordinación, control</p>
						</div>

						<div className="headbar__acciones">
							<button className="btn btn--ico btn--medium btn__secondary--outline" onClick={() => setIsMigrarModalOpen(true)}>
								<i className="bi bi-arrow-repeat"></i>
								Migrar SAP
							</button>
						</div>
					  
				  </section>


			  <section className="bodyFeature">

			  <div className="bodyFeature__controls">
					<div className="bodyFeature__controls__actions">
					  
						<button
							className="btn btn__primary--outline"
							onClick={() => setIsModalOpen(true)}
							>
							Crear Ficha
						  </button>

						  <button
							className="btn btn__primary--outline"
							onClick={() => setIsAssignFichaModalOpen(true)}
							>
							Asignar pedido
						  </button>

							<button class="btn btn__primary--outline">Registrar Fecha de Alistamiento</button>
							<button class="btn btn__primary--outline">Modificar Doc. de Compra</button>
							<button class="btn btn__primary--outline">Eliminar Doc. de Compra</button>
							<button class="btn btn__primary--outline">Bloquear Doc. de Compra</button>

					
					</div>

					<div className="bodyFeature__controls__filter">
						
						<button value="si" onClick={handlerOnClickFiltro} className="btn btn--simple"><span>Filtro</span> <em className="icon-element-fitro"></em></button>
					</div>
			  </div>

			  {isMigrarModalOpen && (
				<MigrarImportModal 
				isOpen={isMigrarModalOpen}
				onClose={() => setIsMigrarModalOpen(false)}
				onMigrarClick={(numbers) => handleMigrarSap(accessToken,numbers)}
				requestNumbers={modalRequestNumbers}
				setModalRequestNumbers={setModalRequestNumbers}

				/>
			  )}

			  {isFichaCreatedMigrar && (
				<div className="confirmation-modal">
				  <div className="confirmation-modal__content">
				  <p>La migración se realizo exitosamente</p>
				  <button onClick={handleCloseConfirmationMigrar}>Cerrar</button>
				  </div>
				</div>
			  )}

			  {isModalOpen &&  (
			  <CrearFichaImportModal 
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Crear Ficha"
				onSubmit={crear}
				setDocumentPDF={setDocumentPDF}
			  />
			  )}

			  {isFichaCreated && (
					<div className="confirmation-modal">
					  <div className="confirmation-modal__content">
					  <p>La ficha ha sido creada exitosamente.</p>
					  <button onClick={handleCloseConfirmation}>Cerrar</button>
					  </div>
					</div>
			  )}

			  {isAssignFichaModalOpen && (
				  <AssignFichaModal
					isOpen={isAssignFichaModalOpen}
					onClose={() => setIsAssignFichaModalOpen(false)}
					title="Asignar pedido a Ficha"
					onAssignFicha={onAssignFicha}
					pedidosSeleccionados={selectedPedidoId}
					  />
				)}

				{isConfirmationModalOpen && (
				  <div className="confirmation-modal">
					<div className="confirmation-modal__content">
					  <p>¿Desea desasociar el pedido?</p>
					  <button onClick={handleConfirmDesasociar}>Sí</button>
					  <button onClick={handleCancelDesasociar}>No</button>
					</div>
				  </div>
				)}
												  
			  {showFilter && (

			<div className="bodyFeature__searching form">
				<div className="bodyFeature__searching__input-container">
			  <div className="bodyFeature__searching__col">
				<label>Fecha de inicio</label>
				<DatePicker
				  selected={startDate}
				  onChange={(date) => setStartDate(date)}
				  isClearable
				  dateFormat="dd/MM/yyyy"
				  placeholderText="Selecciona fecha de inicio"
				  minDate={minDate}
				  maxDate={endDate || maxDate}
				  
				/>
			  </div>

			  <div className="bodyFeature__searching__col">
				<label>Fecha final</label>
				<DatePicker
				  selected={endDate}
				  onChange={(date) => setEndDate(date)}
				  isClearable
				  dateFormat="dd/MM/yyyy"
				  placeholderText="Selecciona fecha de fin"
				  minDate={startDate || minDate}
				  maxDate={maxDate}
				/>
			  </div>

			  <div className="bodyFeature__searching__col">
				  <label>N° de pedido</label>
				  <input type="text" 
				  className="w-90"
				  value={orderNumberFilter}
				  onChange={(e) => setOrderNumberFilter(e.target.value)}
				
				 />
				</div>


				<div className="bodyFeature__searching__col">
				  <label>Nombre de cliente</label>
				  <input type="text" 
				  className="w-90"
				  value={customerNameFilter}
				  onChange={(e) => {setCustomerNameFilter(e.target.value); }}
				  
				  />
				</div>

				<div className="bodyFeature__searching__col">
				  <label>Organización de venta</label>
				  <input type="text" 
				  className="w-90"
				  value={sellOrganizationFilter}
				  onChange={(e) => setSellOrganizationFilter(e.target.value)}
				  
			   />
				</div>

				<div className="bodyFeature__searching__col">
				<label>Número de cliente</label>
				<input
				type="text"
				className="w-90"
				value={customerNumberFilter}
				onChange={(e) => setCutsomerNumberFilter(e.target.value)}
				/>
			  </div>

			  </div>

			   <div className="bodyFeature__searching__buttons">
				  <div className="bodyFeature__controls__button">
					<button onClick={handleApplyFilterClick} className="btn btn--ico btn__primary--outline">
					  <i className="bi bi-search"></i>
					  Buscar
					</button>
				  </div>

				  <div className="bodyFeature__controls__button">
					<button onClick={limpiarFiltros} className="btn btn--ico btn__primary--outline">
					  <i className="bi bi-eraser"></i>
					  Limpiar
					</button>
				  </div>
				</div>
			</div>
			)}

			  <div>
				  <table className="tabla" cellSpacing="0" cellPadding="0">
					<thead>
						<tr>
							<th class="thead"><input type="checkbox" /> </th>
							<th class="thead text-left">N° de Pedido</th>
							<th class="thead">Fecha de creación</th>
							<th class="thead">Sociedad</th>
							<th class="thead">CI</th>
							<th class="thead">Fecha Incoterms</th>
							<th class="thead">Fecha de Alistamiento</th>
							<th class="thead">Pedidos MK	</th>
							<th class="thead">Doc. compr.	</th>
							<th class="thead">Posición</th>
							<th class="thead"> Contiene ficha</th>
							<th class="thead">-</th>
							<th class="thead">Desasignar</th>
						</tr> 
					</thead>
					<tbody>
					  
					{Array.isArray(pedidos) && pedidos.map((pedido) => (                   
					  <tr key={pedido.id} onClick={(e) => handlePedidoSeleccionado(pedido.id,e)}>
						<td>
						  <input type="checkbox" checked={selectedPedidoId.includes(pedido.id)} disabled={pedido.has_file}/>
						  
						</td>
						<td className="text-left">
						  <strong>{pedido.purchase_document}</strong>
						</td>
						<td>{format(new Date(pedido.created_at), 'dd/MM/yyyy')}</td>
						<td>{pedido.society.code}</td>
						<td>{pedido.document_class}</td>
						<td>{format(new Date(pedido.incoterms_date), 'dd/MM/yyyy')}</td>
						<td>{format(new Date(pedido.accounting_date), 'dd/MM/yyyy')}</td>
						<td>{pedido.mk_orders}</td>
						<td>-</td>
						<td>{pedido.purchase_document_position}</td>
						{pedido.has_file ? (
						  <>
					   <td className="ficha__group">
						  <Link to={`/features/importaciones/ficha/general/?pk=${pedido.id}`}>
							<em className="ico-element-ficha"></em>
						  </Link>
						</td>

						<td>
						  <Link to={`/features/importaciones/pedidos/detalle/?pk=${pedido.id}`}>
							Ver detalle
						  </Link>
						</td>

						<td className="ficha__group">
							<em className="ico-element-desabilitar" onClick={() => handleDesasociarFicha(pedido.id)}></em>
						</td>

						</>

						):(
						  <>
						  <td>No contiene ficha</td>
						  <td>-</td>
						  <td>-</td>
						  </>
						  
						)}
					
					  </tr>
		 
					))}
					</tbody>
				  </table>
				</div>
			  </section>
			</>
		);
	}
