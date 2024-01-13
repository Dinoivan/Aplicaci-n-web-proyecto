import { useAuth } from "../../../../../../../../contexts/Authutils";
import { useEffect,useState}  from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { AptDispath } from "../../../../../../../../services/exportaciones/AptDispath";
import { AgregarDocumentos } from "../../../../../../../../services/exportaciones/AptDispath";  
import { AptDispathDocuments } from "../../../../../../../../services/exportaciones/AptDispath";
import { Update } from "../../../../../../../../services/exportaciones/listapedidosServices";


export function ArchivosPage(){

  const fichaId = localStorage.getItem('fichaId');
  console.log("Soy la ficha: ",fichaId);


  const { accessToken } = useAuth(); // Obtiene el Token del contexto de autenticación

  const [data, setData] = useState(null);
  const [datosArreglo,setDatosArreglo] = useState([]);


  const [mostrarIngreso, setMostrarIngreso] = useState(true); // Nuevo estado para controlar qué sección mostrar

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };
 
   useEffect(() => {
    async function fetchData() {
       try {
         const resultado = await AptDispath(fichaId, accessToken);
         console.log("Hola soy el id: ",fichaId)
        //  setDatosArreglo(resultado);
          // Verifica si resultado[0] existe antes de intentar acceder a sus propiedades
          const firstResult = resultado.length > 0 ? resultado[0] : null;
         // Accede al valor de la propiedad 'id' dentro del objeto en la posición 0
          const idValue = firstResult ? firstResult.id : null;
         setData(idValue);
       } catch (error) {
         console.error("Error al obtener los datos: ",error)
       }
     }
     fetchData();
   }, [fichaId,setData,accessToken]);

   console.log("Datos: ",data);

   useEffect(() => {
    async function fetchData() {
       try {
        if(data){
         const resultado = await AptDispathDocuments(data, accessToken);
         setMostrarIngreso(resultado.length === 0);
         setDatosArreglo(resultado);
        }
       } catch (error) {
         console.error("Error al obtener los datos: ",error)
       }
     }
     fetchData();
   }, [data,setDatosArreglo,accessToken]);

   console.log("Datoss: ",datosArreglo);



   const handleGuardarClick = async () => {
    try {
      // Lógica para enviar la lista de archivos al servicio
      for (const file of selectedFiles) {
      const resultado =   await AgregarDocumentos(accessToken, data, fichaId, file);
      console.log("Resultado: ",resultado);
  
      }

      await Update(accessToken, { id: fichaId, status: 'SENT' });

      window.location.href = `/features/exportaciones/ficha/documentaria?exportation_id=${fichaId}`;

      console.log('Archivos guardados con éxito');
      // Restablece el estado o realiza otras acciones después de guardar
      setSelectedFiles([]); // Limpiar la lista de archivos seleccionados después de guardar
    } catch (error) {
      console.error('Error al guardar archivos:', error);
      // Maneja el error según tus necesidades
    }
  };


    return(
        <>
          
    {mostrarIngreso ? (
          <>

    <section className="gestion_">
                <div className="gestion__formm">
                  <div className="formm mb-4">
                    <label>Carga de Fotos OEA/BASC</label>
                    <div className="form__file">
                      <input
                        type="file"
                        id="packing"
                        onChange={handleFileChange}
                        multiple // Permite la selección de múltiples archivos
                        accept="*/*" // Aceptar cualquier tipo de archivo

                      />
                      <label htmlFor="packing" className="btn btn__primary--outline">Adjuntar</label>
                    </div>
                  </div>
                </div>
              </section>
              {selectedFiles.length > 0 && (
                <div className="centro">
                  <p>Archivos Seleccionados:</p>
                  <ul>
                    {selectedFiles.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-center block-center">
                <button className="btn btn__primary" onClick={handleGuardarClick}>Guardar</button>
              </div>
            </>
    ): (
      <>

            {datosArreglo.length > 0 && (
              <>
                <p className="centroo_" style={{display: 'flex' ,justifyContent: 'center'}}>Documentos Adjuntos:</p>
                <div className="centroo" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {datosArreglo.map((documento, index) => {
                    const fileName = documento.document.split('/').pop();

                    return (
                      <div key={documento.id} className="archivo-container" style={{ width: '300px', margin: '10px', padding: '10px', border: '1px solid #ccc', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span>{/* Número y flecha */}
                          {index + 1}.&nbsp; 
                        </span>
                        <div className="archivo-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <img
                            src={`https://icomex.franco.expert${documento.document}`}
                            alt={fileName}
                            style={{ width: '100%', marginBottom: '10px', cursor: 'pointer' }}
                            onClick={() => {
                              window.open(`https://icomex.franco.expert${documento.document}`, '_blank');
                            }}
                          />
                          <a href={`https://icomex.franco.expert${documento.document}`} target="_blank" rel="noopener noreferrer">
                            Descargar Archivo
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
      </>

    )}

   

        </>
    );
}

