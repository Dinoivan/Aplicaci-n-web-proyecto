import { useState } from 'react';
import "../../styles/modal/CustomModal.css";
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export function MigrarModal({ isOpen, onClose, onMigrarClick }) {

  const [inputPedido, setInputPedido] = useState('');
  const [requestNumbers, setRequestNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [numericInputError, setNumericInputError] = useState('');

  const [society_Value, setSociety_Value] = useState("1000");


  const addRangeToRequestNumbers = () => {

    if (inputPedido.trim() !== '' && requestNumbers.length < 5) {
      if (!/^\d+$/.test(inputPedido)) {
        setNumericInputError('Solo se permiten números.');
        return;
      }

      setRequestNumbers([...requestNumbers, inputPedido]);
      setInputPedido('');
      setErrorMessage('');
      setNumericInputError('');
      if (requestNumbers.length +1 >=5) {
        setFormDisabled(true);
      }
    }
  };

  const removeRequestNumber = (index) => {
    const updatedRequestNumbers = [...requestNumbers];
    updatedRequestNumbers.splice(index, 1);
    setRequestNumbers(updatedRequestNumbers);
    setFormDisabled(false);
  };

  const handleSubmit = async () => {
    if (requestNumbers.length === 0) {
      setErrorMessage("Debes agregar al menos un pedido.");
      return;
    }
    setIsLoading(true);

    try {
      await onMigrarClick(requestNumbers, society_Value);
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
    const truncatedInput = inputValue.slice(0, 8);
  
    setInputPedido(truncatedInput);
  
    if (inputValue.trim() !== '') {
      setErrorMessage('');
  
     if (!/^\d+$/.test(inputValue)) {
        setNumericInputError('Solo se permiten números.');
      }else if(truncatedInput.length === 8 &&  inputPedido.length < 8){
        setNumericInputError('solo se permiten 7 numeros');
      }else {
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

        <div className="form-grouppp-horizontal_">
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
              className={`Migrar ${requestNumbers.length >= 5 ? 'max-reached' : ''} ${inputPedido.length === 7 ? 'valid-input' : ''} ${inputPedido.length === 8 ? 'invalid-length' : ''}`}
              placeholder="Número de pedido"
              value={inputPedido}
              style={{border: "1px solid #D5ECF8"}}
              onChange={handleInputChange}
              disabled={formDisabled}
            />
          </div>

            <button className="btn btn__primary btn--ico ta" onClick={addRangeToRequestNumbers} disabled={formDisabled || inputPedido.length === 8}>
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

        <ul className="contenedor">
          {requestNumbers.map((number, index) => (
            <li className="contenedor-items" key={index}>
              {number}
      
              <button className="signup-btn_agregar_" onClick={() => removeRequestNumber(index)}>
                ❌
              </button>
   
            </li>
          ))}
        </ul>
        <div className="customModal__buttons">
          <button className="btn btn__primary btn--ico" style={{marginTop: "15px"}} onClick={handleSubmit} disabled={isLoading}>    
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

MigrarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onMigrarClick: PropTypes.func,
};