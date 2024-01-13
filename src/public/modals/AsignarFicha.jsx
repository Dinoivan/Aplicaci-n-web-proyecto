import { useState,useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/modal/CustomModal.css";
import { faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../contexts/Authutils";
import { fetchDataWithoutFiltersFichas } from "../../hooks/exportaciones/Estados-logicas-fichas/useGestionFichasLogica";
import {useFichasState} from "../../hooks/exportaciones/Estados-logicas-fichas/useGestionFichasState";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import {components} from "react-select";
import {ErrorModal} from "../modals/ErrorModal";

export function AssignFichaModal({ isOpen, onClose, title, onAssignFicha,pedidosSeleccionados,pedidosmodal}) {

  const selectedPedidosInfo = pedidosmodal.filter((pedido) => pedidosSeleccionados.includes(pedido.id));

  const [selectedFicha, setSelectedFicha] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nueva variable de estado
  const {fichas,setFichas,} = useFichasState();
  const { accessToken } = useAuth();

  useEffect(() => {
    fetchDataWithoutFiltersFichas(accessToken, setFichas);
  }, [accessToken, setFichas]);
  


  const handleAssignFicha = async () => {
    if (selectedFicha) {
      setIsLoading(true); // Establecer isLoading en true antes de asignar la ficha
      try {
        await onAssignFicha(selectedFicha);
        setSelectedFicha(null);
        onClose();
      } catch (error) {
        console.error("Error al asignar la ficha: ", error);
      } finally {
        setIsLoading(false); // Establecer isLoading en false después de asignar la ficha
      }
    }
  };

  console.log("Mostrando fichas dentro del modal: ",fichas);
  console.log("Mostrando longitud de ficha: ",fichas.length);

  const options = fichas.map((ficha)  => ({
    value: ficha.id,
    label: `${ficha.code_relations} `,

  }));

  if (!isOpen) return null;

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: '150px',
      overflowY: 'auto',
    })
  }

  const IconoOption = (props) => (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center'}}>
      <em className="ico-element-ficha"  style={{ marginRight: '8px' }}></em>
        {props.label}
      </div>
    </components.Option>
  );

  return (
    <div className="customModal">
      <div className="customModal__content">
      
        {pedidosSeleccionados.length === 0 ? (

            <ErrorModal isOpen={true} onClose={onClose} message="Selecciona al menos un pedido para asignar a una ficha." /> 
          
        ): pedidosSeleccionados.length === 1 || (new Set(selectedPedidosInfo.map((pedido) => pedido.sell_organization)).size ===1) ? (
          <>

            <div className="direccion">
                      <button className="signup-x" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
             </div>

              <h2>{title}</h2>


              <div>
                    <Select
                      options={options}
                      value={options.find((option) => option.value === selectedFicha)}
                      onChange={(selectedOption) => setSelectedFicha(selectedOption.value)}
                      isSearchable={true}
                      placeholder="Selecciona una ficha"
                      styles={customStyles}
                      components={{Option:IconoOption}}
                    />
                      <div className="customModal__buttons">
                      <button className="btn btn__primary" onClick={handleAssignFicha} disabled={isLoading}>
                      {isLoading ? (
                            <span>
                              <FontAwesomeIcon icon={faSpinner} spin />
                              </span>
                              ) : (   
                              "Asignar Ficha"
                              )}
                      </button>
                    </div>
              </div>

          
          </>
        ): fichas.length === 0 ? (
          <>
            <ErrorModal isOpen={true} onClose={onClose} message="No se puede abri el modal porque no hay fichas creadas" /> 
          </>

        ): (

        <>

        <ErrorModal isOpen={true} onClose={onClose} message="Error organizaciones de venta diferentes." /> 
      
        </>
          )}
      </div>
    </div>
  );
}

AssignFichaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onAssignFicha: PropTypes.func,
  pedidosSeleccionados: PropTypes.array.isRequired,
  pedidosmodal: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};
