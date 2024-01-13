import "../../../../styles/features/body.css"
import { useEffect,useCallback,useMemo,useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../contexts/Authutils";
import { CrearFichaModal} from "../../../../public/modals/CrearFicha";
import { AssignFichaModal} from "../../../../public/modals/AsignarFicha";
import { usePedidosState } from "../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { fetchDataWithFilters,fetchDataWithoutFilters } from "../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica";
import { CreateFicha, UpdateFicha } from "../../../../services/exportaciones/listapedidosServices";
import {AssignarPedidoFicha,DesasignarFicha} from "../../../../services/exportaciones/listapedidosServices";
import { eliminarPedido } from "../../../../services/exportaciones/listapedidosServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { MigrarModal } from "../../../../public/modals/MigrarSap";
import { migrarPedido } from "../../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica";
import { FaCheck, FaTimes } from 'react-icons/fa';
// import {CrearGeneralPage} from "../../../../public/modals/ShowGeneralPage";
import { utcToZonedTime } from 'date-fns-tz';
import { ErrorModal} from "../../../../public/modals/ErrorModal";
import { Verificacion} from "../../../../public/modals/ErrorModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore,faUnlink  } from "@fortawesome/free-solid-svg-icons"; // Asegúrate de importar el icono correcto
import { ResponsablesExpertaciones } from "../../../../services/exportaciones/listapedidosServices";
import { UserInformation } from "../../../../services/dashboard/DashboardService";

export function PedidosPage() {

  //Estados
  const {pedidos,setPedidos,isModalOpen,setIsModalOpen,showFilter,setShowFilter,orderNumberFilter,setOrderNumberFilter,customerNameFilter,
    setCustomerNameFilter,sellOrganizationFilter,setSellOrganizationFilter,customerNumberFilter,setCutsomerNumberFilter,has_fileFilter,
    sethas_fileFilter,setHasAppliedFilter,isAssignFichaModalOpen,documentPDF,setDocumentPDF,setIsAssignFichaModalOpen,startDate,setStartDate,endDate,setEndDate,
    currentPage,setCurrentPage,itemsPerPage,setItemsPerPage,modalData,setModalData,modalDataInformation,setModalDatainformation,modalDataDelete,setModalDataDelete,
    modelDatabutton,setModalDatabutton,modelDatalimpiar,setModalDatalimpiar,isMigrarModalOpen, setIsMigrarModalOpen,
    isConfirmationModalOpen,setIsConfirmationModalOpen,pedidoToDesasociar,setPedidoToDesasociar,confirmar,setConfirmar,
    IsConfirmationDeleteModalOpen,setIsConfirmationDeleteModalOpen,mensajeError, setMensajeError,selectedPedidoId, setSelectedPedidoId,
    selectAll, setSelectAll,modalMessage, 
    setModalMessage
  } = usePedidosState();

  const [pedidosRelacionados, setPedidosRelacionados] = useState([]);
  const [pedidoBackgroundColors, setPedidoBackgroundColors] = useState({});
  const [listaUsuarios,setListaUsuarios] = useState([]);

  const [user,setUser] = useState(null);


  //Token para acceder a las funcionales de la aplicación
  const { accessToken } = useAuth();


  useEffect(() => {
        
    const fetchUserInformation = async () => {
      try {
        const userData = await UserInformation(accessToken);
        setUser(userData);
      } catch (error) {
        console.error('Error al obtener información del usuario: ', error);
      }
    };

    fetchUserInformation();
  }, [accessToken]);

  const shouldShowLink = (role) => user?.role?.some((r) => r.name === role);

  //Evento para realizar la paginacion
  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    console.log('Nuevo valor de elementos por página:', value);
    setItemsPerPage(value);
    setCurrentPage(1); // Reinicia la página a la primera cuando se cambia el número de elementos por página
  };

  //Hacer la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pedidos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pedidos.length / itemsPerPage);


  //->
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  //<-
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //Configurar las fechas

  //Fecha mínima
  const minDate = useMemo(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 36);
    return date;
  }, []);

  //Fecha Máxima
  const maxDate = useMemo(() => new Date(), []);

  const isDateRangeValid = useCallback((startDate, endDate) => {
    const twelveMonthsAgo = new Date(maxDate);
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    return startDate >= twelveMonthsAgo && endDate <= maxDate;
  }, [maxDate]);


  //Evento de Migrar Sap
   const handleMigrarSap =  async (requestNumbers,society_Value) =>{
    await migrarPedido(accessToken,requestNumbers,society_Value,setModalData,setIsMigrarModalOpen,fetchDataWithoutFilters,setPedidos);
   };

   //Evento para cerrar el modal y limpiar
   const handleCloseModal = () => {
    setModalData({
      title: "",
      message: "",
      icons: ""
    });
  };

   //Se utiliza datos de pedidos
   useEffect(() => {
    async function fetchData() {
      try {
        const resul = await ResponsablesExpertaciones(accessToken);
        setListaUsuarios(resul);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [setListaUsuarios,accessToken]);

  console.log("Lista de usuarios: ",listaUsuarios);
  
 
  //Seleccionar individualmente un pedido
  const handlePedidoSeleccionado = (pedidoId,e) => {
    if(e.target.type === 'checkbox'){
      console.log('Clic en el chekbok. Pedido ID: ',pedidoId);
      const pedido = pedidos.find((p) => p.id === pedidoId);
      if(pedido && !pedido.has_file){
        if(selectedPedidoId.includes(pedidoId)){
          setSelectedPedidoId(selectedPedidoId.filter(id => id !== pedidoId));
        }
        else{
          setSelectedPedidoId([...selectedPedidoId,pedidoId]);
        }
      }
    
  }
}

//Seleccionar todos los pedidos
const handleSelectAll = () => {
  if (selectAll) {
    setSelectedPedidoId([]);
  } else {
    const selectedPedidos = pedidos.filter((pedido) => !pedido.has_file).map((pedido) => pedido.id);
    setSelectedPedidoId(selectedPedidos);
    console.log("pedidos: ",selectedPedidos);
  }
  setSelectAll(!selectAll);
};


const onAssignFicha = async (fichaId) => {
  if (selectedPedidoId.length === 0) {
    setModalDatainformation({ title: "Error", message: "Seleccione al menos un pedido", icons: "times" });
    return;
  }

  const selectedPedidosInfo = pedidos.filter((pedido) => selectedPedidoId.includes(pedido.id));

  // Establecer el color de fondo para pedidos asignados
  const updatedBackgroundColors = { ...pedidoBackgroundColors };

  selectedPedidoId.forEach((pedidoId) => {
    updatedBackgroundColors[pedidoId] = '#c1f0c1'; // Cambia al color celeste
  });
  setPedidosRelacionados([...pedidosRelacionados,...selectedPedidoId]);
  setPedidoBackgroundColors(updatedBackgroundColors);

  console.log('Pedido IDs:', selectedPedidoId);
  console.log('Updated Background Colors:', updatedBackgroundColors);

  if (selectedPedidoId.length === 1 || new Set(selectedPedidosInfo.map((pedido) => pedido.sell_organization)).size === 1) {

    try {
      const pedidosSeleccionados = {
        bulk: selectedPedidoId,
        exportation_id: fichaId,
      };

      const response = await AssignarPedidoFicha(accessToken, pedidosSeleccionados);
      console.log("Respuesta del servicio: ", response);
      fetchDataWithoutFilters(accessToken, setPedidos);
      setSelectedPedidoId([]);
      setIsModalOpen(false);
      setSelectAll(false);

      setModalDatainformation({ title: "Éxito", message: "Pedidos asignados correctamente",icon: 'check', });
      setConfirmar(true);
 
    } catch (error) {
      console.error("Error al asignar pedidos a la ficha: ", error);
      setModalDatainformation({ title: "Error", message: "Error al asignar pedidos a la ficha", icon: 'times' });
      setConfirmar(true);
    }
  } else {
    setModalDatainformation({
      title: "Error",
      message: "Error existe sociedades diferentes. Vuelva a intertarlo",
      icon: 'times'
    });
    setConfirmar(true);
  }
};


//Desasociar un pedido de una ficha

//Evento para seleccionar un pedido
const handleDesasociarFicha = (pedidoId) =>{
  console.log("numero de pedido: ",pedidoId);
  setPedidoToDesasociar(pedidoId);
  setIsConfirmationModalOpen(true);
}

// const isInProgress = pedidos.some((pedido) => (pedido.exportation.status_display === "Inicio de Exportación"));

//Evento para confirmar
const handleConfirmDesasociar = async () => {

  const pedido = pedidos.find((p) => p.id === pedidoToDesasociar);

  if (pedidoToDesasociar && pedido) {
    const { exportation } = pedido;

  if ((exportation && exportation.status_display === "Inicio de Exportación") || (exportation && exportation.status_display === "Rechazado")) {
    console.log("Resultado: ",pedidoToDesasociar);
    try {
      const pedidosSeleccionados = {
        id: pedidoToDesasociar,
        exportation_id: null,
      };

      console.log("Pedidos: ",pedidosSeleccionados)

      const updatedBackgroundColors = { ...pedidoBackgroundColors };
      updatedBackgroundColors[pedidoToDesasociar] = ''; // Deja el color en blanco
      setPedidoBackgroundColors(updatedBackgroundColors);
    

      const response = await DesasignarFicha(accessToken, pedidosSeleccionados);
      console.log("Respuesta del servicio: ", response);
      fetchDataWithoutFilters(accessToken, setPedidos);
      setSelectedPedidoId([]);
      setIsModalOpen(false);
      setSelectAll(false);
      setIsConfirmationModalOpen(false)
      setModalDatainformation({ title: "Éxito", message: "Pedido Desasignado correctamente",icon: 'check', });
      setConfirmar(true);

 
    } catch (error) {
      console.error("Error al asignar pedidos a la ficha: ", error);
      setModalDatainformation({ title: "Error", message: "Error al desasignar pedidos a la ficha", icon: 'times' });
      setIsConfirmationModalOpen(false);
      setConfirmar(true);


    }
  } else {
    setModalDatainformation({
      title: "Error",
      message: `No se puede desasociar el pedido estado ${ exportation.status_display}`,
      icon: 'times'
    });
    setIsConfirmationModalOpen(false);
    setConfirmar(true);
  }
 }else{
  setModalDatainformation({
    title: "Error",
    message: "Error al recuperar la información del pedido. Vuelva a intentarlo",
    icon: 'times'
  });
  setIsConfirmationModalOpen(false);
  setConfirmar(true);
}
};

//Evento para cancelar
const handleCancelDesasociar = () =>{
  setIsConfirmationModalOpen(false);
  setPedidoToDesasociar(null);
}

  //Evento de Cancelar
  const handleCancelDelete = () =>{
    setIsConfirmationDeleteModalOpen(false);
  };



//Lógica que maneja la eliminación de varios pedidos en conjunto
//Evento la hacer clic
  const handleDeleteClick = () =>{
    if(selectedPedidoId.length>0){
      setIsConfirmationDeleteModalOpen(true);
      setMensajeError(null);
    }else{
      setMensajeError("Seleccione al menos un pedido para eliminar");
    }
  };

//Evento para eliminar todo
 const handleConfirmationDelete = async () =>{
   try{
     const DatosparaEliminar = {
       bulk: selectedPedidoId,
     };
     await eliminarPedido(accessToken,DatosparaEliminar);

     setModalDataDelete({
      title: "Eliminar",
      message: "Se eliminaron los datos exitosamente",
      icon: "check"
     })
 
     fetchDataWithoutFilters(accessToken,setPedidos);
     setSelectedPedidoId([]);
   
     setIsConfirmationDeleteModalOpen(false);
     setSelectAll(false);
  }catch(error){
     console.error("Error al eliminar pedidos: ",error);
 
     setModalDataDelete({
      title: "Error",
      message: "Ocurrio un error de servicio",
      icon: "times"
     })
   }

 };

  const handleClosePrueba = () => {
    setModalDataDelete({
      title: "",
      message: "",
      icons: ""
    });
  };

  const handleCloseModall = () => {
    setModalDatabutton({
      title: "",
      message: "",
      icon: ""
    });
  };

  useEffect(() => {
    fetchDataWithoutFilters(accessToken, setPedidos);
  }, [accessToken, setPedidos]);

  //Crea un ficha
  const crear = async (formData) => {

      try{
        
        formData.status = "START";
        formData.san_juan_de_lurigancho = formData.san_juan_de_lurigancho || "0";
        formData.la_milla = formData.la_milla || "0";
        formData.punta_hermosa = formData.punta_hermosa || "0";
        formData.trebol_san_martin = formData.trebol_san_martin || "0";
        formData.customer_oc_number = formData.customer_oc_number || "0"

        const response = await CreateFicha(accessToken,formData);
        console.log("Hola: ",response);
         // Obtiene el ID de la ficha recién creada
        const fichaId = response.exportation_id;

        console.log("Ficha numero: ",fichaId);

        if(documentPDF){
          await UpdateFicha(accessToken,fichaId,documentPDF);
        }

       // Verifica si hay pedidos seleccionados
       if (selectedPedidoId.length > 0) {
         // Asigna los pedidos seleccionados a la ficha
         const pedidosSeleccionados = {
           bulk: selectedPedidoId,
           exportation_id: fichaId,
         };

         await AssignarPedidoFicha(accessToken, pedidosSeleccionados);
         fetchDataWithoutFilters(accessToken, setPedidos);
         setSelectedPedidoId([]);
         setSelectAll(false);
       }

        console.log("Respuesta del servicio de crear: ",response);
        setModalMessage({success: true, message: "Ficha creada con éxito",icon: 'check'});
        // setIsFichaCreated(true);
        setIsModalOpen(false);
      
      
      }catch(error){
        console.error("Error al crear una ficha desde el evento: ",error);
        setModalMessage({success: false, message: "Error al crear la ficha",icon: 'times'});
    }

}

  const handlerOnClickFiltro = () => {
    setShowFilter(!showFilter);
  }

  const handleApplyFilterClick = useCallback(() => {

    if((startDate || endDate) && !isDateRangeValid(startDate,endDate)){
      setModalDatabutton({
        title: 'Error',
        message: 'Solo puedes ingresar un rango de 365.',
        icon: 'times',
      });
      console.error("Solo puedes ingresar un rango de 365.");
    }

  // Convierte el valor de has_fileFilter a booleano solo si se proporciona un valor específico
  const hasFileValue = has_fileFilter.trim().toLowerCase();
  const hasFile = hasFileValue === 'si' ? true : hasFileValue === 'no' ? false : undefined;

  // Verifica si hay algún filtro ingresado
  if (!startDate && !endDate && !orderNumberFilter && !customerNameFilter && !sellOrganizationFilter && !customerNumberFilter && hasFile === undefined) {
    // Muestra el modal de error
    setModalDatabutton({
      title: 'Error de filtrado',
      message: 'Debes ingresar al menos un dato para filtrar.',
      icon: 'times',
    });
   
    return;
  }

    fetchDataWithFilters(
      accessToken,setPedidos,
      startDate,endDate,
      orderNumberFilter,
      customerNameFilter,
      sellOrganizationFilter,
      customerNumberFilter,
      hasFile

    );
    setHasAppliedFilter(true);
  }, [accessToken,startDate,
    endDate,orderNumberFilter,
    customerNameFilter, sellOrganizationFilter, 
    customerNumberFilter ,has_fileFilter, setPedidos,setModalDatabutton,
    setHasAppliedFilter,isDateRangeValid]);


  const limpiarFiltros = () => {

    // Convierte el valor de has_fileFilter a booleano solo si se proporciona un valor específico
  const hasFileValue = has_fileFilter.trim().toLowerCase();
  const hasFile = hasFileValue === 'si' ? true : hasFileValue === 'no' ? false : undefined;

    if (!startDate && !endDate && !orderNumberFilter && !customerNameFilter && !sellOrganizationFilter && !customerNumberFilter && hasFile === undefined) {
      // Mostrar un mensaje indicando que al menos un filtro debe estar seleccionado
      setModalDatalimpiar({
        title: "Error",
        message: "Tienes que poner al menos un dato para limpiar",
        icon: "times"
      })

      return;
    }

    setStartDate(null);
    setEndDate(null);
    setOrderNumberFilter('');
    setCustomerNameFilter('');
    setSellOrganizationFilter('');
    setCutsomerNumberFilter('')
    setHasAppliedFilter(false);
    sethas_fileFilter('');
    fetchDataWithoutFilters(accessToken, setPedidos);
  };

  const handlelimpiar = () =>{
    setModalDatalimpiar({
      title: "",
      message: "",
      icon: ""
    })
  }
  

        return(
            <>
                <section className="headbar headbar--abierto">

                        <div className="headbar__title">
                            <h3>Exportaciones &rarr;  Lista de pedidos</h3>
                            <p>Coordinación, control y optimización</p>
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
                            className="btn btn__primary btn--ico"
                            onClick={() => setIsModalOpen(true)}
                            >
                            <i className="bi bi-file-plus-fill"></i>
                            Crear Ficha
                          </button>
                          

                          <button
                            className="btn btn__primary btn--ico"
                            onClick={() => setIsAssignFichaModalOpen(true)}
                            >
                            <i className="bi bi-box-arrow-in-down"></i>
                            Asignar pedido
                          </button>

                          <button
                            className="btn btn__primary btn--ico"
                            onClick={handleDeleteClick}
                            >
                            <i className="bi bi-trash"></i>
                            Eliminar
                          </button>

                    </div>

                    <div className="bodyFeature__controls__filter">
                        
                        <button value="si" onClick={handlerOnClickFiltro} className="btn btn--simple"><span>Filtro</span> <em className="icon-element-fitro"></em></button>
                    </div>
              </div>


             {/* Llamando al modal Migrarsap y validando */}

              {isMigrarModalOpen && (
                <MigrarModal
                isOpen={isMigrarModalOpen}
                onClose={() => setIsMigrarModalOpen(false)}
                onMigrarClick={handleMigrarSap}
                />
              )}

              {/*Manejo de errores del modal Migrarsap*/}
              <Verificacion
              isOpen={true} onClose={handleCloseModal} data={modalData}/>

            
              {isModalOpen &&  (
              <CrearFichaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Crear Ficha"
                onSubmit={crear}
                setDocumentPDF={setDocumentPDF}
                pedidosSeleccionados={selectedPedidoId}
                pedidosmodal={pedidos}
              />
              )}

               {/* // Mostrar el modal basado en el valor de success */}
                {modalMessage.success !== null && (
                  <div className={modalMessage.success ? 'confirmation-modal success-message' : 'confirmation-modal error-message'}>
                    <div className="confirmation-modal__content">
                    {modalMessage.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: '0 auto' }}  />}
                    {modalMessage.icon === 'times' && <FaTimes size={30} color="red"  style={{ margin: '0 auto' }} />}
                      <p className="error_Tdata">{modalMessage.message}</p>
                      <button onClick={() => {
                        setModalMessage({ success: null, message: "",icon: "" });
                        setIsModalOpen(false);
                      }}>Cerrar</button>
                    </div>
                  </div>
                )}

              <Verificacion isOpen={true} onClose={handleCloseModall} data={modelDatabutton}/>
              <Verificacion isOpen={true} onClose={handlelimpiar} data={modelDatalimpiar}/>
              <Verificacion isOpen={true} onClose={handleClosePrueba} data={modalDataDelete}/>
              
              {/* {isAbierto && (
                <CrearGeneralPage
                 isOpen={isAbierto}
                 onClose={() => setIsAbierto(false)}
                 title="Información General"
                 pedidoId={selected[0]}
                 
                />
                )} */}
                  
              {isAssignFichaModalOpen && (
                  <AssignFichaModal
                    isOpen={isAssignFichaModalOpen}
                    onClose={() => setIsAssignFichaModalOpen(false)}
                    title="Asignar pedido a Ficha"
                    onAssignFicha={onAssignFicha}
                    pedidosSeleccionados={selectedPedidoId}
                    pedidosmodal={pedidos}
                      />
                )}


                {/* Modal para decidir si desasignar un pedido*/}
                {isConfirmationModalOpen && (
                  <div className="confirmation-modal">
                    <div className="confirmation-modal__content">
                    <FontAwesomeIcon icon={faUnlink}   color="#ff0000" style={{marginBottom: "10px",fontSize: "30px"}}/>
                      <p className="error_Tdata">¿Desea desasociar el pedido?</p>
                      <button style={{backgroundColor: "red", padding: "5px"}} onClick={handleConfirmDesasociar}>Sí</button>
                      <button style={{padding: "5px"}} onClick={handleCancelDesasociar}>No</button>
                    </div>
                  </div>
                )}

                {/* <Validacion isOpen={true} onConfirm={handleConfirmDesasociar} onCancel={handleCancelDesasociar} data={}/> */}

                {confirmar && (
                  <div className="confirmation-modal">
                    <div className="confirmation-modal__content">
                          {modalDataInformation.icon === 'check' && <FaCheck size={30} color="green" style={{ margin: 'auto' }} />} {/* Tamaño y color personalizables */}
                           {modalDataInformation.icon === 'times' && <FaTimes size={30} color="red" style={{ margin: 'auto' }}/>} {/* Tamaño y color personalizables */}
                      <p className="error_Tdata">{modalDataInformation.message}</p>
                      <button onClick={() => setConfirmar(false)}>Cerrar</button>
                    </div>
                  </div>
                )}

                

                {
                  /* Modal para controlar los mensajes de exito o error del evento eliminar pedidos*/
                }
                  {mensajeError ? (
                    <div className="confirmation-modal">
                      <div className="confirmation-modal__content">
                      <ErrorModal isOpen={true} onClose={() => setMensajeError(null)} message={mensajeError} />
                      </div>
                    </div>
                  ) : (
                    IsConfirmationDeleteModalOpen && (
                      <div className="confirmation-modal">
                        <div className="confirmation-modal__content">
                        <FontAwesomeIcon icon={faTrashRestore} size="3x"   color="#ff0000" style={{marginBottom: "10px"}}/>
                        <p className="error_Tdata">¿Desea eliminar los pedidos seleccionados?</p>
                          <button style={{backgroundColor: "red"}} onClick={handleConfirmationDelete}>Sí</button>
                          <button  onClick={handleCancelDelete}>No</button>
                        </div>
                      </div>
                    )
                  )}
   
              {showFilter && (

            <div className="bodyFeature__searching form">
                <div className="bodyFeature__searching__input-container">
                    <div className="bodyFeature__searching__col">
                      <label>Fecha inicio</label>
                      <DatePicker
                        selected={startDate}
                        isClearable
                        onChange={(date) => setStartDate(date)}
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
                        isClearable
                        onChange={(date) => setEndDate(date)}
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
                        <label>Nombre cliente</label>
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

                  <div className="bodyFeature__searching__col">
                        <label>Pedidos ficha [si] o [no]</label>
                          <select className="selec"
                            value={has_fileFilter}
                            onChange={(e) => sethas_fileFilter(e.target.value)}
                          >
                            <option value="">Seleccionar</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                          </select>
                    </div>


              </div>

               <div className="bodyFeature__searching__buttons">
                  <div className="bodyFeature__controls__button">
                    <button onClick={handleApplyFilterClick} className="btn btn__primary btn--ico">
                      <i className="bi bi-search"></i>
                      Buscar
                    </button>
                  </div>

                  <div className="bodyFeature__controls__button">
                    <button onClick={limpiarFiltros} className="btn btn__primary btn--ico">
                      <i className="bi bi-eraser"></i>
                      Limpiar
                    </button>
                  </div>
                </div>
            </div>
            )}

              <div>
                  <table className="tabla list-pedido" cellSpacing="0" cellPadding="0">
                    <thead>
                        <tr>
                          {/* Activar la seleccion de todos los pedidos*/}
                          <th className="thead">
                              <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={() => handleSelectAll()}
                                disabled={Array.isArray(currentItems)&& currentItems.every((pedido) => pedido.has_file)}
                              />
                          </th>
                          <th className="thead">Nº de pedido</th>
                          <th className="thead">Fecha de creación</th>
                          <th className="thead">Organización de venta</th>
                          <th className="thead">Nº de cliente</th>
                          <th className="thead text-left">Nombre de cliente</th>
                          <th className="thead text-left">Dirección de cliente</th>
                          <th className="thead">Condición de pago</th>
                          <th className="thead">Moneda</th>
                          <th className="thead">Precio total</th>
                          <th className="thead"> - </th>
                          <th className="thead">Contiene ficha </th>
                          {/* <th className="thead">Contiene ficha</th> */}
                          <th className="thead">Desasignar
                          
                          </th>
                        </tr> 
                    </thead>
                    <tbody>
                      
                      {/* Activda la seleccion individual de cada pedido y utiliza el evento de seleccion individual*/}
                    {Array.isArray(currentItems) && currentItems.map((pedido) => (                

                      <tr key={pedido.id} onClick={(e) => handlePedidoSeleccionado(pedido.id,e)} style={{ backgroundColor:
                        selectedPedidoId.includes(pedido.id) ? '#0000' : pedidoBackgroundColors[pedido.id] || '', }} 
                      >
                        <td >
                          <input type="checkbox" checked={selectedPedidoId.includes(pedido.id)} disabled={pedido.has_file} />
                          
                        </td>
                        <td>
                          <strong>{pedido.order_number}</strong>
                        </td>
                        <td>{format(utcToZonedTime(new Date(`${pedido.order_creation_date}T00:00:00`), 'UTC'), 'dd/MM/yyyy')}</td>
                        <td>{pedido.sell_organization}</td>
                        <td>{pedido.customer_number}</td>
                        <td className="text-left">{pedido.customer_name}</td>
                        <td className="text-left">{pedido.customer_address}</td>
                        <td>{pedido.payment_condition}</td>
                        <td>{pedido.currency}</td>

                        <td>{pedido.total_price}</td>

                        <td>
                          <Link to={`/features/exportaciones/pedidos/detalle/?exportation_detail_id=${pedido.id}`}>
                            Ver posiciones
                          </Link>
                        </td>

                        {pedido.has_file ? (
                          <>


                          {shouldShowLink('Analista Comercial - EXP') ? (
                            <>

                         <td className="ficha__group">
                            <Link to={`/features/exportaciones/ficha/general/?exportation_id=${pedido.exportation.id}`}>
                               <em className="ico-element-ficha"></em>
                              </Link>
                          </td>

                            </>

                          ) : (
                            <>

                          <td className="ficha__group">
                            <Link to={`/features/exportaciones/ficha/general/?exportation_id=${pedido.exportation.id}`}>
                               <em className="ico-element-ficha"></em>
                              </Link>
                          </td>

                            
                            </>

                          )}


                          {/* <td className="ficha__group">
                            <Link to={`/features/exportaciones/ficha/general/?exportation_id=${pedido.exportation.id}`}>
                               <em className="ico-element-ficha"></em>
                              </Link>
                          </td> */}



                       {/* <td > */}
                          {/* <Link to={`/features/exportaciones/ficha/general/?exportation_id=${pedido.exportation.id}`}>
                            <em className="ico-element-ficha"></em>
                          </Link> */}
                          {/* <em className="ico-element-ficha"></em> */}
                        {/* </td> */}

                        <td>
                             <button className="color_a">
                              <em className="ico-desasignar bi bi-file-earmark-x colors" onClick={() => handleDesasociarFicha(pedido.id)}></em>
                            </button>                           
                        </td>

                        </>
                        ):(
                          <>
                          {/* <td>
                            <button className="button-like-link" onClick={() => handleVerDetalleClic(pedido.id)}>
                                Ver detalle
                            </button>
                          </td> */}
                          <td>-</td>
                          <td>-</td>
                          </>
                          
                        )}

                      </tr>
         
                    ))}
                    </tbody>
                  </table>
                </div>

             
                 <div className="ubicacion">
                    <label className="label_select">Selecciona paginación</label>
                    <select className="select_items" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                      <option value={2}>2</option>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                      {/* Otras opciones */}
                    </select>
                  </div>
               
                <div>
                  <div className="texto_p">
                    <p className="paginacion">
                      Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, pedidos.length)} de {pedidos.length} pedidos
                    </p>
                    </div>
                    <div className="modificar">
                    <button className={`btn btn__m  ${currentPage === 1 ? 'btn-disabled' : 'btn-enabled'}`} onClick={handlePrevPage} disabled={currentPage === 1}>
                      Anterior
                    </button>
                    <button className={`btn btn__m  ${currentPage === totalPages ? 'btn-disabled' : 'btn-enabled'}`} onClick={handleNextPage} disabled={currentPage === totalPages}>
                      Siguiente
                    </button>

                    </div>
                    
                  </div>
              </section>
            </>
        );
    }
