import { useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/modal/CustomModal.css";
import { faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../contexts/Authutils";
// import { fetchDataWithoutFilters } from "../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosLogica";
import { usePedidosState } from "../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import { Link } from "react-router-dom";
import {FindAllPedidosDetailsIdFicha} from "../../services/exportaciones/listapedidosServices";

export function VisualizarPedidos({ isOpen, onClose, title }) {
  const { pedidos, setPedidos } = usePedidosState();
  const { accessToken } = useAuth();

  const fichaId = localStorage.getItem('fichaId');
  console.log("Soy la ficha: ",fichaId);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await FindAllPedidosDetailsIdFicha(fichaId, accessToken);
        console.log("Hola soy el id: ",fichaId)
        setPedidos(resultado);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [fichaId,setPedidos,accessToken]);

  console.log("Hola soy el resultado: ",pedidos);

  if (!isOpen) return null;

  const customStyles = {
    maxHeight: '100px',
    overflowY: 'auto',
  };

  const listItemStyles = {
    borderBottom: '1px solid #ccc',
    padding: '10px',
    listStyle: 'none',
    textAlign: "center"
  };

  return (
    <div className="customModal">
      <div className="customModal__content">
        <div className="direccion">
          <button className="signup-x" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <h2>{title}</h2>

        <div style={{ ...customStyles, marginTop: '10px' }}>
          <ul className="center" style={{ padding: 0 }}>
            {pedidos.map((pedido) => (
              <li key={pedido.id} style={listItemStyles}>
                <Link to={`/features/exportaciones/pedidos/detalle/?exportation_detail_id=${pedido.id}`}>
                  {`${pedido.order_number}`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

VisualizarPedidos.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};