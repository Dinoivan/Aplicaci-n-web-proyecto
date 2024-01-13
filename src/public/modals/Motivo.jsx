import { useEffect,useState } from "react";
import PropTypes from "prop-types";
import "../../styles/modal/CustomModal.css";
import { faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../contexts/Authutils";
import { usePedidosState } from "../../hooks/exportaciones/Estados-logicas-pedidos/usePedidosState";
import {FindAllPedidosDetailsIdFicha} from "../../services/exportaciones/listapedidosServices";
import { ParametrizaionReprogramacion } from "../../services/exportaciones/GestionFichas";

export function MotivoReprogramacion({ isOpen, onClose, title, onReasonSelected,setIsEditing}) {

  const { pedidos, setPedidos } = usePedidosState();
  const { accessToken } = useAuth();
  const [selectedReason, setSelectedReason] = useState("");
  const [reasons, setReasons] = useState([]);

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

  const handleAccept = () => {
    console.log("Selected Reason: ", selectedReason);
    setIsEditing(true); // Establecer setIsEditing como true
    onReasonSelected(selectedReason);
    onClose(); // Close the modal after accepting
  };

   //Se utiliza datos de pedidos
   useEffect(() => {
    async function fetchData() {
      try {
        const resul = await ParametrizaionReprogramacion(accessToken);
        setReasons(resul);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    fetchData();
  }, [setReasons,accessToken]);

  console.log("Lista de usuarios: ",reasons);


  console.log("Hola soy el resultado: ",pedidos);

  if (!isOpen) return null;

  return (
    <div className="customModal">
      <div className="customModal__content">
        <div className="direccion">
          <button className="signup-x" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <h2>{title}</h2>
            <div className="flex">
                <select
                    className="select"
                    id="reasonSelector"
                    onChange={(e) => setSelectedReason(e.target.value)}
                    value={selectedReason}
                >
                    <option value="" disabled>
                    Seleccione una opcion
                    </option>
                    {reasons.map((reason) => (
                    <option key={reason} value={reason}>
                        {reason}
                    </option>
                    ))}
                </select>

                <button className="btn btn__primary" onClick={handleAccept} 
                >Aceptar</button>

            </div>

      </div>
    </div>
  );
}

MotivoReprogramacion.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onReasonSelected: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired
};