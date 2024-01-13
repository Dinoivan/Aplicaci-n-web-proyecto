import { useState } from 'react';
import "../../styles/modal/CustomModal.css";
import PropTypes from 'prop-types';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export function MigrarImportModal ({ isOpen, onClose, onMigrarClick }){
    
    const [startNumber, setStartNumber] = useState('');
    const [endNumber, setEndNumber] = useState('');
    const [requestNumbers, setRequestNumbers] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Nueva variable de estado
  
    const addRangeToRequestNumbers = () => {
      if (startNumber !== '' && endNumber !== '') {
        const start = parseInt(startNumber);
        const end = parseInt(endNumber);
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          const range = Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
          setRequestNumbers([...requestNumbers, ...range]);
          setStartNumber('');
          setEndNumber('');
        }
      }
    };
  
    const removeRequestNumber = (index) => {
      const updatedRequestNumbers = [...requestNumbers];
      updatedRequestNumbers.splice(index, 1);
      setRequestNumbers(updatedRequestNumbers);
    };
  
    const handleSubmit = async () => {
        setIsLoading(true); // Establecer isLoading en true al hacer clic en "Migrar"
        try {
          await onMigrarClick(requestNumbers);
        } catch (error) {
          console.error("Error al migrar datos: ", error);
        } finally {
          setIsLoading(false); // Establecer isLoading en false cuando el servicio se completa
          onClose();
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
            <label className='configurar'>Sociedad</label>
            <input
              type="text"
              className="Migrar"
              value={startNumber}
              onChange={(e) => setStartNumber(e.target.value)}
            />
            </div>
            <div className="form-group-horizontal-item">
            <label className='configurar'>Fecha de inicio</label>
            <input
              type="text"
              className="Migrar"
              placeholder="Desde"
              value={endNumber}
              onChange={(e) => setEndNumber(e.target.value)}
            />
            </div>

            <div className="form-group-horizontal-item">
            <label className='configurar'>Fecha de fin</label>
            <input
              type="text"
              className="Migrar"
              placeholder="Hasta"
              value={endNumber}
              onChange={(e) => setEndNumber(e.target.value)}
            />
            </div>

            
          </div>
  
        
          <div className="customModal__buttons">
            <button className="signup-btn" onClick={handleSubmit} disabled={isLoading}>
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

  MigrarImportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onMigrarClick: PropTypes.func,
};

