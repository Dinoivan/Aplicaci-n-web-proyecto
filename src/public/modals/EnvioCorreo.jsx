import PropTypes from "prop-types";
import "../../styles/modal/CustomModal.css";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export function EnvioCorreo({ isOpen, onClose, title, onSubmit}) {


  const [formData, setFormData] = useState({
    to: "",
    content: "",
  });

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [email,setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSubmitClicked) {
      setIsSubmitClicked(false);
    }
  }, [isSubmitClicked]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEmailsChange = (e) => {
    const { value } = e.target;
    setEmail(value.trim());
    setErrorMessage("");
    
  };

  const isValidEmail = (email) =>{
    return email.includes("@");
  }

  const handleAddEmail = () => {
    if (isValidEmail(email)) {
      const trimmedEmail = email.trim();
      if (!formData.to.split(",").map((e) => e.trim()).includes(trimmedEmail)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          to: prevFormData.to ? `${prevFormData.to.trim()}, ${trimmedEmail}` : trimmedEmail,
        }));
        setEmail("");
      } else {
        setErrorMessage("El correo electrónico ya está agregado");
      }
    } else {
      setErrorMessage("Ingresa un correo electrónico válido");
    }
  };

 const handleRemoveEmail = (index) => {
    const updateEmail = formData.to.split(",").map((email) => email.trim());
    updateEmail.splice(index, 1);
    setFormData((prevFormData) => ({ ...prevFormData, to: updateEmail.join(", ") }));
  };

  const handleRemoveAllEmails = () => {
    setFormData((prevFormData) => ({ ...prevFormData, to: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit({
        to: formData.to,
        content: formData.content,
      });
    } catch (error) {
      console.error("Error al enviar el correo: ", error);
    } finally {
      setIsLoading(false);
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

        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>

        <div className="form-grouppp-horizontal">
                <div className="form-grouppp">
                      <label htmlFor="to">Para</label>
                      <input className={`w ${errorMessage && "error-input"}`} type="email" id="to" name="to" value={email} onChange={handleEmailsChange}/>
                      {errorMessage && (
                        <div className="error-message">
                          <p>{errorMessage}</p>
                        </div>
                      )}
                </div>
                <button type="button" className="btn btn__primary btn--ico" onClick={handleAddEmail}>
                <i className="bi bi-plus"></i>
                    Agregar
                </button>

                <button type="button" className="btn btn__primary btn--ico" onClick={handleRemoveAllEmails}>
                <i className="bi bi-trash"></i>
                    Eliminar todo
                </button>
        </div>

            <ul className="tag-list">
              {formData.to && formData.to.split(",").map((email, index) => (
                <li key={index} className="tag">
                  {email.trim()}
                    <button
                    type="button"
                    className="signup-btn_a"
                    onClick={() => handleRemoveEmail(index)}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>

           <div className="form-grouppp">
            <label htmlFor="content">Motivo</label>
            <textarea
              className="area"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
            
          </div>


          <div className="customModal__buttons">
            <button className="btn btn__primary btn--ico" type="submit" disabled={isLoading}>
            <i className="bi bi-envelope-fill"></i>
              {isLoading ? (
                <span>
                  <FontAwesomeIcon icon={faSpinner} spin /> Enviando Correo...
                </span>
              ) : (
                "Enviar Correo"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EnvioCorreo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};