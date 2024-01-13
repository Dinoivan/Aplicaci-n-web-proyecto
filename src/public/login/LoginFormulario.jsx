import PropTypes from 'prop-types';
import celimaLogo from "../../assets/imagenes/Celima-logo.png"
import LLave from "../../assets/imagenes/llave.png"
import Arroba from "../../assets/imagenes/arroba.png"
import Show from "../../assets/imagenes/show.ico"
import Esconder from "../../assets/imagenes/esconder.ico"
import "../../styles/login/LoginFormulario.css"
import { Link } from 'react-router-dom';

export function LoginFormulario({username, setUsername,password, setPassword,showPassword, setShowPassword,handleSubmit,usernameLabel = "ID Cliente",
                               sectionclassName = "input-container name",nombre = "fname",usernamePlaceholder = "Analista 01",inputType = "email",
                               showArrobaIcon = true,validarclassName = "contraseña",linkclassName = "contraseña-link",buttonclassName = "button-container",
                               buttonclassNamed = "signup-btn custom-btn",inpclassName = "niden",labelpassword = "Contraseña",linkTo = "./validar", 
                               linkText = "Olvidé mi contraseña",buttonText = "Ingresar",hidePassword = false,hideparrafo = false,
                               ptexto = "Crédenciales únicas del proveedor"}) {
    return (
        <form onSubmit={handleSubmit}>
            <section className="copy">
                <picture className="image-container">
                    <img src={celimaLogo} alt="Logo de celima" />
                </picture>
                <div className="texto-container">
                    <h2>iComex</h2>
                    <p>Accede a la plataforma con sus credenciales</p>
                </div>
            </section>

            <section className={sectionclassName}>
                <label htmlFor={nombre}>{usernameLabel}</label>
                <input className={inpclassName} id={nombre} name={nombre} placeholder={usernamePlaceholder} autoFocus type={inputType} maxLength="30" value={username} onChange={e => setUsername(e.target.value)} />
                {showArrobaIcon && <img src={Arroba} alt="ícono del usuario" className="input-arroba" />}
                {!hideparrafo && (
                <p>{ptexto}</p>)}
            </section>

            {!hidePassword && (
            <section className="input-container password">
                <label htmlFor="password">{labelpassword}</label>
                <input id="password" name="password" placeholder="........" type={showPassword ? 'text' : 'password'} maxLength="28" value={password} onChange={e => setPassword(e.target.value)} className={showPassword ? 'has-icon' : ''}/>
                <img src={LLave} alt="ícono de password" className="input-icon" />
                <img src={showPassword ? Show : Esconder} alt="Mostrar/Ocultar contraseña" className="toggle-password-icon" onClick={() => setShowPassword(!showPassword)} />
            </section>
            )}

            <section className={validarclassName}>
                <Link to={linkTo}className={linkclassName}>{linkText}</Link>
            </section>

            <section className={buttonclassName}>
                <button className={buttonclassNamed} type="submit">{buttonText}</button>
            </section>
            <section className="footer-formulario">
                <p>Desarrollado por CSTI</p>
            </section>
        </form>
    )
}

LoginFormulario.propTypes = {username: PropTypes.string.isRequired,setUsername: PropTypes.func.isRequired,password: PropTypes.string,
                             setPassword: PropTypes.func,showPassword: PropTypes.bool,setShowPassword: PropTypes.func.isRequired,
                             handleSubmit: PropTypes.func.isRequired,usernameLabel: PropTypes.string,sectionclassName: PropTypes.string,nombre: PropTypes.string,
                             usernamePlaceholder: PropTypes.string,inputType: PropTypes.string,showArrobaIcon: PropTypes.bool,hidePassword: PropTypes.bool,
                             hideparrafo: PropTypes.bool,validarclassName: PropTypes.string,linkclassName: PropTypes.string,buttonclassName: PropTypes.string,
                             buttonclassNamed: PropTypes.string,inpclassName: PropTypes.string,linkTo: PropTypes.string, linkText: PropTypes.string,buttonText: PropTypes.string,labelpassword: PropTypes.string,ptexto: PropTypes.string

};