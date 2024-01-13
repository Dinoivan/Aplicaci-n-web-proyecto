import { Link } from "react-router-dom";
import {findAllRequestibk} from "../../../../hooks/exportaciones/useRequestIbkProcess";
import { useState,useEffect } from "react";
import { useAuth } from "../../../../contexts/Authutils";


export function SolicitudIbk() {

  const [fichasibk,setFichasibk] = useState([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    console.log("useEffect - Inicio");
    async function fetchData() {
      try {

        if(!accessToken){
          console.error("No se encontro un token disponible");
          return;
        }
        const fichaData = await findAllRequestibk(accessToken);
        setFichasibk(fichaData);
   
        
      } catch (error) {
        console.error("Error al obtener los datos");
      }
    }

    fetchData();
    console.log("useEffect - Fin");
  }, [accessToken]);

  return(
    <>
    
      <section className="bodyFeature">

     

      <div className="bodyFeature__controls">
          <div className="bodyFeature__controls__actions">
              <input className="lupa" type="text" placeholder="Buscar por palabra clave"></input>
           </div>


            <div className="bodyFeature__controls__filter">

                <button  className="btn btn--simple"><span>Filtro</span> <em className="icon-element-fitro"></em></button>
            </div>
      </div>
    
      <div>
          <table className="tabla" cellSpacing="0" cellPadding="0">
             <thead>
                <tr>
                  <th className="thead"> - </th>
                  <th className="thead">Linea Naviera</th>
                  <th className="thead">Agente de Carga </th>
                  <th className="thead"> Nº de Booking</th>
                  <th className="thead">Fecha máxima </th>
                  <th className="thead">Nombre de Nave</th>
                  <th className="thead"> Fecha preliminar </th>
                  <th className="thead"> Puerto de destino</th>
                  <th className="thead"> - </th>
                </tr> 
            </thead>
            <tbody>

            {fichasibk.map((ficha) => (
                      <tr key={ficha.id}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>
                          <strong>{ficha.shipping_line}</strong>
                        </td>
                        <td>{ficha.cargo_agent}</td>
                        <td>{ficha.booking_number}</td>
                        <td>{ficha.vgm_matrix_date}</td>
                        <td>{ficha.ship_name}</td>
                        <td>{ficha.preliminary_matrix_date}</td>
                        <td>{ficha.destination_port}</td>
                        <td>
                          <Link to="/features/exportaciones/pedidos/detalle" state={{servicio: ficha}}>
                            Ver detalle
                          </Link>
                        </td>
                      </tr>
              ))}
                 
            </tbody>
          </table>
        </div>
      </section>


    </>
);
}