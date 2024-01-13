import { useState } from "react";

export function usePedidosState() {

  const [pedidos, setPedidos] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [orderCreationDataFilter,setOrderCreationDataFilter] = useState('');
  const [orderNumberFilter, setOrderNumberFilter] = useState('');
  const [customerNameFilter, setCustomerNameFilter] = useState('');
  const [sellOrganizationFilter, setSellOrganizationFilter] = useState('');
  const [customerNumberFilter,setCutsomerNumberFilter] = useState('');
  const [has_fileFilter,sethas_fileFilter] = useState('');
  const [hasAppliedFilter, setHasAppliedFilter] = useState(false);
  const [isAssignFichaModalOpen, setIsAssignFichaModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setItemsPerPage] = useState(5);
  const [modalData, setModalData] = useState({title: "",message: "",icon: "",});
  const [modalDataInformation, setModalDatainformation] = useState({title: "",message: "",icon: "",});
  const [modalDataDelete,setModalDataDelete] = useState({title: "",message: "",icon: "",});
  const [modelDatabutton,setModalDatabutton] = useState({title: "",message: "",icon: "",})
  const [modelDatalimpiar,setModalDatalimpiar] = useState({title: "",message: "",icon: "",})
  const [documentPDF, setDocumentPDF] = useState(null); 
  const [isMigrarModalOpen, setIsMigrarModalOpen] = useState(false);

  const [modalRequestNumbers, setModalRequestNumbers] = useState([]);
  const [modalsocietyValue, setModalsociety_Value] = useState([]);
  const [isConfirmationModalOpen,setIsConfirmationModalOpen] = useState(false);
  const [pedidoToDesasociar,setPedidoToDesasociar] =  useState(null);

  const [confirmar,setConfirmar] =  useState(false);
  
  const [isAbierto,setIsAbierto] = useState(false);
  const [selected, setSelected] = useState([]);


  //Estado para controlar el modal
  const [IsConfirmationDeleteModalOpen,setIsConfirmationDeleteModalOpen] = useState(false);
  //Estado para controlador los mensajes que apareceran en el modal
  const [mensajeError, setMensajeError] = useState(null);

  //Estado para Guardar los pedidos seleccionados en un arreglo
  const [selectedPedidoId, setSelectedPedidoId] = useState([]);

  //Estado para controlar si la selección de todos los pedidos se ha establecido
  const [selectAll, setSelectAll] = useState(false);


  //Controlar el mensaje del modal de crear ficha
  const [modalMessage, setModalMessage] = useState({ success: null, message: "",icon: "" });



  return {
    pedidos,setPedidos,isModalOpen,setIsModalOpen,isEditModalOpen,setIsEditModalOpen,showFilter,
    setShowFilter,orderCreationDataFilter,setOrderCreationDataFilter,orderNumberFilter,
    setOrderNumberFilter,customerNameFilter,setCustomerNameFilter,sellOrganizationFilter,setSellOrganizationFilter,
    customerNumberFilter,setCutsomerNumberFilter,has_fileFilter,sethas_fileFilter,hasAppliedFilter,setHasAppliedFilter,
    isAssignFichaModalOpen,setIsAssignFichaModalOpen,startDate,setStartDate,endDate,setEndDate,currentPage,setCurrentPage,
    itemsPerPage,setItemsPerPage,modalData,setModalData,modalDataInformation,setModalDatainformation,modalDataDelete,setModalDataDelete,
    modelDatabutton,setModalDatabutton,modelDatalimpiar,setModalDatalimpiar,documentPDF,setDocumentPDF,
    isMigrarModalOpen,setIsMigrarModalOpen,modalRequestNumbers, setModalRequestNumbers,modalsocietyValue, setModalsociety_Value,
    isConfirmationModalOpen,setIsConfirmationModalOpen,pedidoToDesasociar,setPedidoToDesasociar,confirmar,setConfirmar,
    isAbierto,setIsAbierto,selected, setSelected,IsConfirmationDeleteModalOpen,setIsConfirmationDeleteModalOpen, mensajeError, setMensajeError,
    selectedPedidoId, setSelectedPedidoId,selectAll, setSelectAll,modalMessage, setModalMessage

  };
}