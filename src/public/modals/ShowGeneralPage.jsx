import  PropTypes from "prop-types";
import "../../styles/modal/CustomModal.css";
import { faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import { useEffect,useState } from 'react';
import { useAuth } from "../../contexts/Authutils";
import {GeneralPagePedidos} from "../../services/exportaciones/listapedidosServices";



export function CrearGeneralPage({ isOpen, onClose, title,pedidoId}) {

  
    const [data, setData] = useState([]);

    const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación
  
    useEffect(() => {
      async function fetchData() {
        try {
          const resultado = await GeneralPagePedidos(accessToken,pedidoId);
          setData(resultado);
        } catch (error) {
          console.log("Error al obtener los datos");
        }
      }
      fetchData();
    }, [setData,accessToken,pedidoId]);
  
    console.log("Hola soy el resultado: ",data);
    

    if (!isOpen) return null;

 
                       
    return (
        <div className="customModal">
          <div className="customModal__content">
            <div className="direccion">
            <button  className="signup-x" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes}/>
            </button>
            </div>
        
            <h2>{title}</h2>
            <form>

            <div className="form-row">

             {Array.isArray(data) && data.length > 0 && data.map((datos) => (
                <>
      

                    <div className="form-grouppp">
                        <label htmlFor="proforma_number">Organización de venta</label>
                        <input style={{backgroundColor: '#d3d3d3'}} className="h" type="text"  value={datos.sell_organization} readOnly/>
                    </div>

                    <div className="form-grouppp">
                        <label htmlFor="container_type">Tipo de moneda</label>
                        <input style={{backgroundColor: '#d3d3d3'}} className="h"type="text" value={datos.currency} readOnly/>
                    </div>

                    <div className="form-grouppp">  
                        <label htmlFor="freight_contract_number">Valor neto</label>
                        <input style={{backgroundColor: '#d3d3d3'}} className="h" type="text" value={datos.total_price} readOnly/>
                    </div>

                    </>
             ))}
            </div>

            </form>
          </div>
        </div>
      );
    }
    
    CrearGeneralPage.propTypes = {
      isOpen: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
      pedidoId: PropTypes.number.isRequired
    
    };