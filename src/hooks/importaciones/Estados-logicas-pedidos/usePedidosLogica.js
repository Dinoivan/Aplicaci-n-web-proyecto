import { findAllpedidolist} from "../../../hooks/importaciones/Estados-logicas-pedidos/usePedidosService";
import {FiltrarDatosPedidos} from "../Estados-logicas-pedidos/usePedidosService";
import { format } from 'date-fns';

export async function fetchDataWithFilters(accessToken,setPedidos,startDate, endDate,orderNumberFilter,customerNameFilter,sellOrganizationFilter,customerNumberFilter) {
    try {
      if (!accessToken) {
        console.error("No se encontró un token disponible");
        return;
      }

       // Formatea las fechas en el formato "YYYY-MM-DD" y pásalas al servicio.
       const created_at = startDate && endDate ? `${format(startDate, 'yyyy-MM-dd')},${format(endDate, 'yyyy-MM-dd')}` : '';
  
      const filtroParams = {
        created_at,
        order_number: orderNumberFilter,
        customer_name: customerNameFilter,
        sell_organization: sellOrganizationFilter,
        customer_number: customerNumberFilter
       
      };
  
      const filteredData = await FiltrarDatosPedidos(filtroParams, accessToken);
      setPedidos(filteredData);
    } catch (error) {
      console.error("Error al aplicar los filtros", error);
      throw error;
    }
  }
  
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