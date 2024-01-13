import "../../../../styles/features/body.css"
import { useEffect,useCallback,useMemo} from "react";
import { useAuth } from "../../../../contexts/Authutils";
import { usePedidosState } from "../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { fetchDataWithFilters,fetchDataWithoutFilters } from "../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica";
import { useState } from "react";
import { Descargar } from "../../../../services/exportaciones/listapedidosServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {eliminarFicha} from "../../../../services/exportaciones/GestionFichas"
import { Exportar } from "../../../../hooks/exportaciones/useReportProcess";
import { format } from 'date-fns';

export function Reporte() {

  // const title = "Pedidos"
  const {setPedidos,showFilter,setShowFilter,
     orderNumberFilter,setOrderNumberFilter,customerNameFilter,setCustomerNameFilter,
    sellOrganizationFilter,setSellOrganizationFilter,customerNumberFilter,setCutsomerNumberFilter,
    setHasAppliedFilter
  } = usePedidosState();

  const [reporteId,setReportId] = useState([]);
  // const [selectedPedidoId, setSelectedPedidoId] = useState([]);
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null); 
  const [isFichaCreated, setIsFichaCreated] = useState(false);
  const [isFichaCreatedMigrar, setIsFichaCreatedMigrar] = useState(false);
  const [isConfirmationModalOpen,setIsConfirmationModalOpen] = useState(false);
  const [pedidoToDesasociar,setPedidoToDesasociar] =  useState(null);

  //Estado para especificar la extensión del archivo que se descargara
  const [outputType, setOutputType] = useState("xlsx");


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




  const handleExportToExcel = async () => {
    try{
      console.log("Credenciales: ",accessToken);
      const excelData = await Descargar(accessToken, outputType)
      console.log("Resultado: ",excelData);

      // Crear un Blob con los datos del archivo Excel
    const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Crear un enlace para descargar el archivo
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Reporte.xlsx'; // Puedes cambiar el nombre del archivo según tus necesidades

    // Simular un clic en el enlace para iniciar la descarga
    document.body.appendChild(link);
    link.click();

    // Esperar un momento antes de eliminar el enlace
    await new Promise(resolve => setTimeout(resolve, 100));

    document.body.removeChild(link);

    }catch(error){
      console.error("Error al llamar Descargar",error);
    }
  };
  

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
    async function fetchData() {
      try {
        const resultado = await Exportar(accessToken);
        setReportId(resultado);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [setReportId,accessToken]);

  console.log("Hola soy el resultado: ",reporteId);

  

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
                            <h3>Exportaciones &rarr;  Seguimiento</h3>
                            <p>Coordinación, control y optimización</p>
                        </div>
                      
                  </section>


              <section className="bodyFeature">

              <div className="bodyFeature__controls">
                    <div className="bodyFeature__controls__actions">
                      <button 
                        className="btn btn__primary btn--ico" onClick={() => {setOutputType('xlsx'); handleExportToExcel();}}>
                          <i className="bi bi-cloud-arrow-down-fill"></i>
                            Descargar
                      </button>
                    </div>

                    <div className="bodyFeature__controls__filter">
                        <button value="si" onClick={handlerOnClickFiltro} className="btn btn--simple"><span>Filtro</span> <em className="icon-element-fitro"></em></button>
                    </div>
              </div>


              {isFichaCreatedMigrar && (
                <div className="confirmation-modal">
                  <div className="confirmation-modal__content">
                  <p>La migración se realizo exitosamente</p>
                  <button onClick={handleCloseConfirmationMigrar}>Cerrar</button>
                  </div>
                </div>
              )}

              

              {isFichaCreated && (
                    <div className="confirmation-modal">
                      <div className="confirmation-modal__content">
                      <p>La ficha ha sido creada exitosamente.</p>
                      <button onClick={handleCloseConfirmation}>Cerrar</button>
                      </div>
                    </div>
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
                <label>Fecha inicio de creación</label>
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
                <label>Fecha final de creación</label>
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
                  <label>N° de proforma</label>
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
                  <label>Pais</label>
                  <input type="text" 
                  className="w-90"
                  value={sellOrganizationFilter}
                  onChange={(e) => setSellOrganizationFilter(e.target.value)}
                  
               />
                </div>

                <div className="bodyFeature__searching__col">
                <label>Número de BK</label>
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
                          <th className="thead">Número de ficha</th>
                          <th className="thead">Fecha de creación de ficha</th>
                          <th className="thead">Proforma</th>
                          <th className="thead">Cliente</th>
                          <th className="thead">Número de BK</th>
                          <th className="thead">Pais</th>
                          <th className="thead">Fecha despacho</th>
                          <th className="thead">Importe sunat</th>
                          <th className="thead">Status</th>
                        </tr> 
                    </thead>
                    <tbody>
                      
                    {Array.isArray(reporteId) && reporteId.map((reporte) => (
                   
                         
                      <tr key={reporte.id}>
                        <td>{reporte.exportation ? reporte.exportation.code_relations || '-' : '-'}</td>
                        <td>{format(new Date(reporte.created_at), 'dd/MM/yyyy')}</td>
                        <td>{reporte.proforma_number}</td>
                        <td>{reporte.customer_name}</td>
                        <td>{reporte.booking_number}</td>
                        <td>{reporte.country}</td>
                        <td>{reporte.dispatch_date}</td>
                        <td>{reporte.sunat_amount}</td>
                        <td>{reporte.status}</td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
        );
    }
