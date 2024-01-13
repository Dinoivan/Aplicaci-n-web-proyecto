import "../../../../styles/features/body.css"
import { useEffect,useCallback,useState,useMemo} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../contexts/Authutils";
import {useFichasState} from "../../../../hooks/exportaciones/Estados-logicas-fichas/useGestionFichasState";
import { fetchDataWithFiltersFichas,fetchDataWithoutFiltersFichas } from "../../../../hooks/exportaciones/Estados-logicas-fichas/useGestionFichasLogica";
import { format } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchDataWithoutFilters } from "../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica";
import { usePedidosState } from "../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { eliminarFicha_ } from "../../../../services/exportaciones/GestionFichas";
// import { fetchDataWithoutFilters } from "../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica";
// import { usePedidosState } from "../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlink  } from "@fortawesome/free-solid-svg-icons"; // Asegúrate de importar el icono correcto

export function ListaFichaPage() {

  const {fichas,setFichas,showFilter,setShowFilter,
  sellOrganizationFilter,setSellOrganizationFilter,responsibleuserFilter,setResponsible,codeRelactionFilter,setCodeRelations,proformaFilter,setProforma,
 setHasAppliedFilter} = useFichasState();


 const [modalData, setModalData] = useState({title: "",message: "",icon: "",});
 const [confirmation,setConfirmation] = useState(false);
 const [eliminarFicha,setEliminarFicha] = useState(false);
 const [fichaseleccionada,setFichaSelecciona] = useState(null);

     // const title = "Pedidos"
     const {setPedidos
   } = usePedidosState();


//  const {pedidos,setPedidos} = usePedidosState();
  const [startDate, setStartDate] = useState(null); // Estado para la fecha de inicio
  const [endDate, setEndDate] = useState(null); // Estado para la fecha final
  const [isFichaCreatedMigrar, setIsFichaCreatedMigrar] = useState(false);

  const { accessToken } = useAuth();

  useEffect(() => {
    fetchDataWithoutFilters(accessToken, setPedidos);
  }, [accessToken, setPedidos]);

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

  
  
  const handleCloseConfirmationMigrar = () =>{
    setIsFichaCreatedMigrar(false);
  }

  useEffect(() => {
    fetchDataWithoutFiltersFichas(accessToken, setFichas);
  }, [accessToken, setFichas]);
  
  const handlerOnClickFiltro = () => {
    setShowFilter(!showFilter);
  }

  const handleEliminarFicha = (id) => {
    setFichaSelecciona(id);
    setConfirmation(true);
  }

  const handleEliminarFichaCancel = () =>{
    setConfirmation(false);
  }


  const handleConfirmar =  async () =>{

    if(fichaseleccionada){
      try{
        await eliminarFicha_(accessToken,fichaseleccionada);
        setModalData({title: "Exito", message: "Ficha eliminada correctamente", icon: "check"})
        fetchDataWithoutFiltersFichas(accessToken, setFichas);
        setConfirmation(false);
        setEliminarFicha(true);
      }catch(error){
        console.error("Error al eliminar la ficha: ",error);
        setModalData({title: "Error", message: "Error al eliminar ficha", icon: "times"})
        setConfirmation(false);
        setEliminarFicha(true);
      }

    }else{
      setModalData({title: "Error", message: "Error al eliminar ficha", icon: "times"})
    }
  };

  const handleApplyFilterClick = useCallback(() => {

    if(!isDateRangeValid(startDate,endDate)){
      console.error("El rango de fechas seleccionado no es valido.");
    }

    fetchDataWithFiltersFichas(accessToken,
      startDate,endDate,
      setFichas,sellOrganizationFilter,
      responsibleuserFilter,codeRelactionFilter,
      proformaFilter
    );
    setHasAppliedFilter(true);
  }, [accessToken, startDate,
    endDate,sellOrganizationFilter,
    responsibleuserFilter,codeRelactionFilter,
    proformaFilter, setFichas,setHasAppliedFilter,
    isDateRangeValid]);

    // useEffect(() => {
    //   fetchDataWithoutFilters(accessToken, setPedidos);
    // }, [accessToken, setPedidos]);


  const limpiarFiltros = () => {
    setStartDate(null);
    setEndDate(null);
    setSellOrganizationFilter('');
    setResponsible('');
    setCodeRelations('');
    setProforma('');
    setHasAppliedFilter(false);
    fetchDataWithoutFiltersFichas(accessToken, setFichas); // Realiza una nueva consulta sin filtros
  };

      return(
            <>
                 <section className="headbar headbar--abierto">

                        <div className="headbar__title">
                            <h3>Exportaciones &rarr; Gestión de fichas</h3>
                            <p>Coordinación, control y optimización</p>
                        </div>
                      
                  </section>
              <section className="bodyFeature">

              <div className="bodyFeature__controls">

                    <div className="bodyFeature__controls__actions">     
                    </div>

                    <div className="bodyFeature__controls__filter">
                        <button value="si" onClick={handlerOnClickFiltro} className="btn btn--simple"><span>Filtro</span> 
                        <em className="icon-element-fitro"></em></button>
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
          
              {showFilter && (
               <div className="bodyFeature__searching form">
               <div className="bodyFeature__searching__input-container">

               <div className="bodyFeature__searching__col">
                  <label>Fecha de inicio de creación</label>
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
                 <label>Organización de venta</label>
                 <input type="text" 
                 className="w-90"
                 value={sellOrganizationFilter}
                 onChange={(e) => setSellOrganizationFilter(e.target.value)}
                 
              />
               </div>
             

             <div className="bodyFeature__searching__col">
                 <label>Nombre de responsable</label>
                 <input type="text" 
                 className="w-90"
                 value={responsibleuserFilter}
                 onChange={(e) => setResponsible(e.target.value)}
               
                />
               </div>


               <div className="bodyFeature__searching__col">
                 <label>Numero de ficha</label>
                 <input type="text" 
                 className="w-90"
                 value={codeRelactionFilter}
                 onChange={(e) => {setCodeRelations(e.target.value); }}
                 
                 />
               </div>


               <div className="bodyFeature__searching__col">
                 <label>Numero de proforma</label>
                 <input type="text" 
                 className="w-90"
                 value={proformaFilter}
                 onChange={(e) => {setProforma(e.target.value); }}
                 
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

               {/* Modal para decidir si desasignar un pedido*/}
               {confirmation && (
                  <div className="confirmation-modal">
                    <div className="confirmation-modal__content">
                    <FontAwesomeIcon icon={faUnlink}   color="#ff0000" style={{marginBottom: "10px",fontSize: "30px"}}/>
                      <p className='error_Tdata'>¿Desea eliminar la ficha?</p>
                      <button style={{backgroundColor: "red", padding: "5px"}} onClick={handleConfirmar}>Sí</button>
                      <button style={{padding: "5px"}} onClick={handleEliminarFichaCancel}>No</button>
                    </div>
                  </div>
                )}

                {/* <Validacion isOpen={true} onConfirm={handleConfirmDesasociar} onCancel={handleCancelDesasociar} data={}/> */}

                {eliminarFicha && (
                  <div className="confirmation-modal">
                    <div className="confirmation-modal__content">
                          {modalData.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: 'auto' }} />} {/* Tamaño y color personalizables */}
                           {modalData.icon === 'times' && <FaTimes size={30} color="red" style={{ margin: 'auto' }}/>} {/* Tamaño y color personalizables */}
                      <p className='error_Tdata'>{modalData.message}</p>
                      <button onClick={() => setEliminarFicha(false)}>Cerrar</button>
                    </div>
                  </div>
                )}

              <div>
                  <table className="tabla" cellSpacing="0" cellPadding="0">
                     <thead>
                        <tr>
                 
                          <th className="thead text-left"> Nº de ficha </th>
                          <th className="thead">Fecha de creación</th>
                          <th className="thead">Organización de venta</th>
                          <th className="thead"> Numero de proforma</th>
                          <th className="thead">Tipo de Contenedor</th>
                          <th className="thead">Usuario responsable COMEX</th>
                          <th className="thead">Total de contenedores</th>
                          <th className="thead">Moneda</th>
                          <th className="thead">Estado</th>
                          <th className="thead">Valor neto</th>
                          <th className="thead"> - </th>
                          <th className="thead">Eliminar</th>
                        </tr> 
                    </thead>
                    <tbody>
                    {Array.isArray(fichas) && fichas.map((ficha) => (

                        <tr key={ficha.id}>
                          {/* Contenido de las filas de la tabla */}
                          
                          <td className="ficha__group text-left" >
                          
                            <strong>{ficha.code_relations}</strong>
                            
                         
                          </td>


                          <td>{format(new Date(ficha.created_at), 'dd/MM/yyyy')}</td>         

                          <td>{ficha.sell_organization}</td>
                          <td>{ficha.proforma_number}</td>
                          <td>{ficha.container_type}</td>
                          <td>{ficha.responsible_user_comex}</td>

                          <td>{ficha.total_containers}</td>


                          <td>{ficha.currency}</td>


                          <td>{ficha.status_display}</td>


                          <td>{ficha.total.toFixed(2)}</td>

                          
                            {ficha.has_detail ? (
                              <>
                              
                              <td>
                              <Link to={`/features/exportaciones/ficha/general/?exportation_id=${ficha.id}`}>
                              Ver detalle
                              </Link>
                            </td>
                            <td>Contiene pedidos</td>

                              </>

                            ) : (

                              <>
                              <td>No contiene pedido</td>
                              <td className="ficha__group">
                                <em className="ico-element-desabilitar" onClick={() => handleEliminarFicha(ficha.id)}></em>      
                            </td>
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
