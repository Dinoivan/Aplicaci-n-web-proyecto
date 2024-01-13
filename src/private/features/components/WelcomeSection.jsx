import Proptypes from 'prop-types';
import "../../styles/dashboard/WelcomeSection.css"

export function WelcomeSection({menuOpen,loading,userEmail,Lupa}){
    return(

        <section className="bienvenido">

                <section className={menuOpen ? "bienvenido__texto--abierto ": "bienvenido__texto" }>
                    <h1 >Bienvenido {loading ? 'Cargando...': userEmail}</h1>
                    <p>Opciones disponibles para acceder</p>
                </section>

                <form className="bienvenido__formulario">
                    <label htmlFor="buscar"><span></span></label>
                    <input type="text" name="buscar" placeholder="Buscar" id="buscar"/>
                    <img src={Lupa} alt="ícono de buscar" className="input-lupa"/>
                </form>
                
            </section>

    )
}

WelcomeSection.propTypes = {
    menuOpen: Proptypes.bool.isRequired,
    loading: Proptypes.bool.isRequired,
    userEmail: Proptypes.string.isRequired,
    Lupa: Proptypes.string.isRequired
}