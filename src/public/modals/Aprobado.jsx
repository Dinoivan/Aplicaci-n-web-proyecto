import PropTypes from "prop-types";
import "../../styles/modal/CustomModal.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export function AprobacionModal({ isOpen, onClose, onConfirm, onCancel, title }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Puedes agregar lógica adicional si es necesario al abrir o cerrar el modal
  }, [isOpen]);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      // Puedes agregar lógica de confirmación aquí antes de llamar a onConfirm
      await onConfirm();
      onClose(); // Cierra el modal después de confirmar
    } catch (error) {
      console.error("Error al confirmar la ficha: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="customModal">
      <div className="customModal__content">
        

        <h2>{title}</h2>
        <h4 className="TextCentro">¿Estás seguro de confirmar la ficha?</h4>

        <div className="customModal__buttons">
          <button 
            className="btn btn__primary m-2"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>
                <FontAwesomeIcon icon={faSpinner} spin /> Confirmando...
              </span>
            ) : (
              "Sí"
            )}
          </button>
          <button className="btn btn__primary m-2" onClick={onCancel} disabled={isLoading}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

AprobacionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};