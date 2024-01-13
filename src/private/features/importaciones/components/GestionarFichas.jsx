import "../../../../styles/features/body.css"
import { useEffect,useCallback,useMemo} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../contexts/Authutils";
import { CrearFichaModal} from "../../../../public/modals/CrearFicha";
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
import { MigrarModal } from "../../../../public/modals/MigrarSap";

export function GestionarFichas() {


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

        <div class="headbar__title">
            <h3> Gestión de fichas</h3>
            <p>Coordinación, control y optimización</p>
        </div>

         

        </section>
      <section class="bodyFeature">

     

      <div className="bodyFeature__controls">
            <div className="bodyFeature__controls__actions">
            <button
							className="btn btn__primary--outline"
							onClick={() => setIsModalOpen(true)}
							>
							Crear Ficha
						  </button>
            </div>

            <div class="bodyFeature__controls__filter">

                <button  class="btn btn--simple"><span>Filtro</span> <em class="icon-element-fitro"></em></button>
            </div>
      </div>
      

      
 


      <div>
          <table class="tabla" cellSpacing="0" cellPadding="0">
             <thead>
                <tr>
                  <th class="thead"> - </th>
                  <th class="thead"> Nº de ficha </th>
                  <th class="thead">Fecha de creación	</th>
                  <th class="thead">Sociedad</th>
                  <th class="thead">CI.</th>
                  <th class="thead">Ce.</th>
                  <th class="thead">Fecha Incoterms</th>
                  <th class="thead">Fecha Alistamiento</th>
                  <th class="thead">Pedidos MK</th>
                  <th class="thead">Doc.compr.</th>
                  <th class="thead">Pos.</th>

                  <th class="thead"> - </th>
                </tr> 
            </thead>
            <tbody>
            <tr>
                            <td>
                              <input type="checkbox" />
                            </td>
                            <td className="ficha__group">
                              <Link to="/features/importaciones/ficha/general">
                                <em class="ico-element-ficha"></em> 2101230001
                              </Link>
                            </td>
                            <td>02/11/2023</td> 
                            <td>1000	</td> 

                            <td>ZPCI</td> 
                            
                            <td>2010</td> 
                            <td>01/05/2023</td> 
                            <td>19/10/2023</td> 

                            <td>4560002505</td> 
                            <td>4720003600</td> 
                            <td>10</td>

                            <td> <Link to="/features/importaciones/ficha/general">Ver detalle</Link></td>
                        </tr>

              
            </tbody>
          </table>
        </div>
      </section>


    </>
);
}