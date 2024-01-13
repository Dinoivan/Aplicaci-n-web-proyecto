import { useState } from 'react';
import "../../styles/modal/CustomModal.css";
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export function MigrarModalPreDispath({ isOpen, onClose, onMigrarClick }) {

    const [inputPedido, setInputPedido] = useState('');
    const [requestNumber, setRequestNumber] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formDisabled, setFormDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [numericInputError, setNumericInputError] = useState('');
  
    const [society_Value, setSociety_Value] = useState("1000");
  
    const addRequestNumber = () => {
      if (inputPedido.trim() !== '') {
        if (!/^\d+$/.test(inputPedido)) {
          setNumericInputError('Solo se permiten números.');
          return;
        }
  
        setRequestNumber(inputPedido);
        setInputPedido('');
        setErrorMessage('');
        setNumericInputError('');
        setFormDisabled(true);
      }
    };
  
    const removeRequestNumber = () => {
      setRequestNumber(null);
      setFormDisabled(false);
    };
  
    const handleSubmit = async () => {
      if (!requestNumber) {
        setErrorMessage("Debes agregar un número de pedido.");
        return;
      }
      setIsLoading(true);
  
      try {
        await onMigrarClick(requestNumber,society_Value);
      } catch (error) {
        console.error("Error al migrar datos: ", error);
      } finally {
        setIsLoading(false);
        onClose();
      }
    };
  
    const handleInputChange = (e) => {
      const inputValue = e.target.value;
    
      // Limitar la longitud a 7 caracteres
      const truncatedInput = inputValue.slice(0, 7);
    
      setInputPedido(truncatedInput);
    
      if (inputValue.trim() !== '') {
        setErrorMessage('');
    
        if (!/^\d+$/.test(inputValue)) {
          setNumericInputError('Solo se permiten números.');
        } else {
          setNumericInputError('');
        }
      } else {
        setNumericInputError('');
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="customModal">
        <div className="customModal__content">
          <div className="direccion">
            <button className="signup-x" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
  
          <h2>Migrar Datos</h2>
  
          <div className="form-grouppp-horizontal">
            <div className="form-group-horizontal-item">
              <label>N° de Sociedad</label>
              <select
                value={society_Value}
                onChange={(e) => setSociety_Value(e.target.value)}
                className='selector'
              >
                <option value="1000">1000</option>
                <option value="2000">2000</option>
              </select>
            </div>
  
            <div className="form-group-horizontal-item">
              <label>Número de pedido</label>
              <input
                type="text"
                className={`Migrar ${inputPedido.length === 7 ? 'valid-input' : ''} ${inputPedido.length === 8 ? 'invalid-length' : ''}`}
                placeholder="Número de pedido"
                value={inputPedido}
                onChange={handleInputChange}
                disabled={formDisabled}
              />
            </div>
  
            <button className="btn btn__primary btn_ico" onClick={addRequestNumber} disabled={formDisabled || inputPedido.length === 8}>
            <i className="bi bi-plus"></i>
              Agregar
            </button>
          </div>
  
          {numericInputError && (
            <div className="error-message">
              <p>{numericInputError}</p>
            </div>
          )}
  
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}

          {requestNumber && (
            <div className="request-number">
              <p>{requestNumber}</p>
              <button className="signup-btn_di" onClick={removeRequestNumber}>
                ❌
              </button>
            </div>
          )}
  
          <div className="customModal__buttons">
            <button className="btn btn__primary btn--ico" onClick={handleSubmit} disabled={isLoading}>
            <i className="bi bi-arrow-repeat"></i>
              {isLoading ? (
                <span>
                  <FontAwesomeIcon icon={faSpinner} spin /> Migrando...
                </span>
              ) : (
                "Migrar"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  MigrarModalPreDispath.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onMigrarClick: PropTypes.func,
  };