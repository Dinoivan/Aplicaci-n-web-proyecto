import {findAllGestionFichas,FiltrarDatos} from "../../../hooks/exportaciones/Estados-logicas-fichas/useGestionFichasServices";
import { format } from 'date-fns';

export async function fetchDataWithFiltersFichas(accessToken,startDate, endDate,setFichas,sellOrganizationFilter,responsible_user_comexFilter,code_relationsFilter,proforma_numberFilter) {
    try {
      if (!accessToken) {
        console.error("No se encontró un token disponible");
        return;
      }

      // Formatea las fechas en el formato "YYYY-MM-DD" y pásalas al servicio.
      const created_at = startDate && endDate ? `${format(startDate, 'yyyy-MM-dd')},${format(endDate, 'yyyy-MM-dd')}` : '';
  
      const filtroParams = {
        created_at,
        sell_organization: sellOrganizationFilter,
        responsible_user_comex: responsible_user_comexFilter,
        code_relations: code_relationsFilter,
        proforma_number: proforma_numberFilter
      };
  
      const filteredData = await FiltrarDatos(filtroParams, accessToken);
      setFichas(filteredData);
    } catch (error) {
      console.error("Error al aplicar los filtros", error);
      throw error;
    }
  }
  
  export async function fetchDataWithoutFiltersFichas(accessToken, setFichas) {
    try {
      if (!accessToken) {
        console.error("No se encontró un token disponible");
        return;
      }
  
      const fichasData = await findAllGestionFichas(accessToken);
      setFichas(fichasData);
    } catch (error) {
      console.error("Error al obtener los datos", error);
      throw error;
    }
  }