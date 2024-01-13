import { findAllpedidolist} from "../../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosService";
import {FiltrarDatosPedidos} from "../Estados-logicas-pedidos/usePedidosService";
import { Migrar,MigrarDispath,MigrarDocumentary } from "../useMigrarProcess";
import { format } from 'date-fns';
// import { finAll } from "../usePreDispathProgram";
import { findAllPreDispathManagement } from "../usePreDispathProgram";
import { findAllDocumentary } from "../useDocumentaryProcess";



//Lógica de filtrado
export async function fetchDataWithFilters(accessToken,setPedidos,startDate, endDate,orderNumberFilter,customerNameFilter,sellOrganizationFilter,customerNumberFilter,has_fileFilter) {
    try {
      if (!accessToken) {
        console.error("No se encontró un token disponible");
        return;
      }

       // Formatea las fechas en el formato "YYYY-MM-DD" y pásalas al servicio.
       const order_creation_date = startDate && endDate ? `${format(startDate, 'yyyy-MM-dd')},${format(endDate, 'yyyy-MM-dd')}` : '';
  
      const filtroParams = {
        order_creation_date,
        order_number: orderNumberFilter,
        customer_name: customerNameFilter,
        sell_organization: sellOrganizationFilter,
        customer_number: customerNumberFilter,
        has_file: has_fileFilter
       
      };
  
      const filteredData = await FiltrarDatosPedidos(filtroParams, accessToken);
      setPedidos(filteredData);
    } catch (error) {
      console.error("Error al aplicar los filtros", error);
      throw error;
    }
  }

  //Lógica de listar todos los pedidos
  export async function fetchDataWithoutFilters(accessToken, setPedidos) {
    try {
      if (!accessToken) {
        console.error("No se encontró un token disponible");
        return;
      }
  
      const pedidosData = await findAllpedidolist(accessToken);
      setPedidos(pedidosData);
    } catch (error) {
      console.error("Error al obtener los datos", error);
      throw error;
    }
  }


  //Logica para listar los apt

 
    //Logica para listar los apt
    //Lógica de listar todos los pedidos
    export async function fetchDataWithoutFiltersDocumentary(accessToken, fichaId,setListarFactura) {
      try {
        if (!accessToken) {
          console.error("No se encontró un token disponible");
          return;
        }
    
        const pedidosData = await findAllDocumentary(fichaId,accessToken);
        setListarFactura(pedidosData);
      } catch (error) {
        console.error("Error al obtener los datos", error);
        throw error;
      }
    }


       //Lógica de listar todos los pedidos
       export async function fetchDataWithoutFiltersPreDispath(accessToken,fichaId, setListar) {
        try {
          if (!accessToken) {
            console.error("No se encontró un token disponible");
            return;
          }
      
          const pedidosData = await findAllPreDispathManagement(fichaId,accessToken);
          setListar(pedidosData);
        } catch (error) {
          console.error("Error al obtener los datos", error);
          throw error;
        }
      }


  //Migrar sap
export async function migrarPedido(accessToken,requestNumbers,society_Value,setModalData,setIsMigrarModalOpen,fetchDataWithoutFilters,setPedidos){
  try{
    const result = await Migrar(accessToken,requestNumbers,society_Value);
   
    if(result.status === 200){
     setModalData({
       title: 'Migración Exitosa',
       message: 'La migración se realizó exitosamente.',
       icon: 'check',
     });
     setIsMigrarModalOpen(false);
     fetchDataWithoutFilters(accessToken, setPedidos);
    }
    else if (result.status === 404){
     setModalData({
       title: 'Error',
       message: 'El pedido no existe.',
       icon: 'times',
     });
     }else{
       console.error("Error desconocido al migrar a SAP. Código de estado: ",result.status);
       setModalData({
         title: 'Error',
         message: 'Ocurrio un error al migra SAP.',
         icon: 'times',
       })
     }
  }catch(error){
   console.error("Error al migrar a SAP: ", error);
  }
}


export async function migraDocument(accessToken,numbers,setModalData,setIsMigrarModalOpen,fetchDataWithoutFiltersDocumentary,fichaId,setDocumentary,setIsLoading){
  try {
    console.log("Entrando a migra");

    for (const number of numbers) {
      console.log("Iteración del bucle para el pedido:", number);

      const result = await MigrarDocumentary(accessToken, number);
      setIsLoading(true);

      if (result.status === 200) {
        console.log("Migración exitosa para el pedido:", number);
      } else if (result.status === 404) {
        console.log("El pedido no existe:", number);
        // Puedes mostrar un mensaje específico para el caso 404 si lo deseas.
        setModalData({
          title: 'Error',
          message: 'El pedido no existe.',
          icon: 'times',
        });
        setIsLoading(false);
        return; // Detener la iteración si hay un problema.
      } else {
        console.error("Error desconocido al migrar a SAP. Código de estado: ", result.status);
        setModalData({
          title: 'Error',
          message: 'Ocurrió un error al migrar a SAP.',
          icon: 'times',
        });
        setIsLoading(false);
        return; // Detener la iteración si hay un problema.
      }
    }

    setIsLoading(false);
    // Si llegamos aquí, todas las migraciones fueron exitosas.
    setModalData({
      title: 'Migración Exitosa',
      message: 'La migración se realizó exitosamente.',
      icon: 'check',
    });
    setIsMigrarModalOpen(false);
    fetchDataWithoutFiltersDocumentary(accessToken,fichaId, setDocumentary);
  } catch (error) {
    console.error("Error al migrar a SAP: ", error);
    setIsLoading(false);
    setModalData({
      title: 'Error',
      message: 'Ocurrió un error al migrar a SAP.',
      icon: 'times',
    });
  }
}


export async function migra(accessToken, numbers, setModalData, setIsMigrarModalOpen, fetchDataWithoutFiltersPreDispath, fichaId,setListar, setIsLoading) {
  try {
    console.log("Entrando a migra");

    for (const number of numbers) {
      console.log("Iteración del bucle para el pedido:", number);

      const result = await MigrarDispath(accessToken, number);
      setIsLoading(true);

      if (result.status === 200) {
        console.log("Migración exitosa para el pedido:", number);
      } else if (result.status === 404) {
        console.log("El pedido no existe:", number);
        // Puedes mostrar un mensaje específico para el caso 404 si lo deseas.
        setModalData({
          title: 'Error',
          message: 'El pedido no existe.',
          icon: 'times',
        });
        setIsLoading(false);
        return; // Detener la iteración si hay un problema.
      } else {
        console.error("Error desconocido al migrar a SAP. Código de estado: ", result.status);
        setModalData({
          title: 'Error',
          message: 'Ocurrió un error al migrar a SAP.',
          icon: 'times',
        });
        setIsLoading(false);
        return; // Detener la iteración si hay un problema.
      }
    }

    setIsLoading(false);
    // Si llegamos aquí, todas las migraciones fueron exitosas.
    setModalData({
      title: 'Migración Exitosa',
      message: 'La migración se realizó exitosamente.',
      icon: 'check',
    });
    setIsMigrarModalOpen(false);
    fetchDataWithoutFiltersPreDispath(accessToken,fichaId,setListar);
  } catch (error) {
    console.error("Error al migrar a SAP: ", error);
    setIsLoading(false);
    setModalData({
      title: 'Error',
      message: 'Ocurrió un error al migrar a SAP.',
      icon: 'times',
    });
  }
}

