import { useState,useEffect } from "react";
import { useAuth } from "../../../../../../contexts/Authutils";
import { Link } from "react-router-dom";
import { Update } from "../../../../../../services/exportaciones/listapedidosServices";
import { CrearDocumentosLiquidacion } from "../../../../../../services/exportaciones/ExportationSettelement";
import { ExportationSettelement } from "../../../../../../services/exportaciones/ExportationSettelement";


 
export function LiquidacionPage() {

  const [data,setData] = useState([]);
  const { accessToken } = useAuth();

  const fichaId = localStorage.getItem('fichaId');
  console.log("Hola soy el id: ",fichaId);
  
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);

  const [mostrarIngreso, setMostrarIngreso] = useState(true); // Nuevo estado para controlar qué sección mostrar

  const handleFileChange = (file, fileType) => {
    // Actualiza el estado correspondiente según el tipo de archivo
    switch (fileType) {
      case "invoiceList":
        setInvoiceFile(file);
        break;
        case "documentList":
          setDocumentFile(file);
        break;
      // Agrega más casos para otros tipos de archivos
      default:
        break;
    }
  };


  const handleSaveClick = async () => {
    // Lógica para manejar la subida del archivo al servidor
    try {
      // Asegúrate de tener exportationId actualizado antes de llamar a CrearDocumentos
      const response = await CrearDocumentosLiquidacion(accessToken,fichaId,invoiceFile,documentFile);
      console.log("Documentos: ",response);

      await Update(accessToken, { id: fichaId, status: 'CLOSE' });
      console.log('Ficha aprobada');

     window.location.href =  "/features/exportaciones/fichas";
    
      // Maneja la respuesta del servidor, actualiza el estado, etc.
      setMostrarIngreso(response.length === 0);
    } catch (error) {
      console.error("Error al subir archivos: ", error);
    }
  }

  useEffect(() => {
    console.log("useEffect - Inicio");
    async function fetchData() {
      try {

        if(!accessToken){
          console.error("No se encontro un token disponible");
          return;
        }
        const fichaData = await ExportationSettelement(accessToken,fichaId);
        setData(fichaData);
        setMostrarIngreso(fichaData.length === 0);
   
        
      } catch (error) {
        console.error("Error al obtener los datos");
      }
    }
    fetchData();
  }, [fichaId,accessToken]);

  console.log("Hola soy la data: ",data);


    
    return(
        <>
				
        
        {mostrarIngreso ? (
          <>


<section>

<div className="headbar__detail_r">
                    <>
                    <h3>Liquidación</h3>
                    </>
                </div>
  </section>

        <section className="gestion_">
					<div className="gestion__formm">
						<div className="formm mb-4">
								<label>Factura</label>
								<div className="form__file">
									<input type="file" id="packing"
                   onChange={(e) => handleFileChange(e.target.files[0], "invoiceList")}
                  />
									<label  htmlFor="packing" className="btn btn__primary--outline">Adjuntar</label>
                  {invoiceFile && <span>{invoiceFile.name}</span>}
								</div>
						</div>



						<div className="form mb-4">
								<label>Documento</label>
								<div className="form__file">
									<input type="file" id="embarque" 
                  onChange={(e) => handleFileChange(e.target.files[0], "documentList")}
                  
                  />
									<label htmlFor="embarque" className="btn btn__primary--outline">Adjuntar</label>
                   {documentFile && <span>{documentFile.name}</span>}
								</div>
						</div>

					</div>
      </section>
				
				<div className="text-center block-center">
               <button className="btn btn__primary" onClick={handleSaveClick}>Guardar</button>
            </div>

            </>

        ): (
          <>
<section>
<div className="headbar__detail_r">
                    <>
                    <h3 style={{textAlign:'center'}}>Liquidación</h3>
                    </>
</div>
  </section>  

                    <section className="gestion_">
                    <div className="gestion__formn">

                    {Array.isArray(data) && data.length > 0 && (
                   <>
                   <div className="formn mb-4">
                          <label>Factura</label>
                           <div>
                            {data[0].invoice_path ? (
                            <Link to={`https://icomex.franco.expert${data[0].invoice_path}`} target="_blank">
                              Descargar
                           </Link>
                          ): (
                            <span>Sin documento adjunto</span>
                          )}
                          </div>
                      </div>

                      <div className="formm mb-4">
                          <label>Documento</label>
                           <div>
                            {data[0].document_path ? (
                            <Link to={`https://icomex.franco.expert${data[0].document_path}`} target="_blank">
                              Descargar
                           </Link>
                          ): (
                            <span>Sin documento adjunto</span>
                          )}
                          </div>
                      </div>
                    </>

                    )}

                    </div>

                    </section>

                    <div className="text-center block-center">
                      <button className="btn btn__primary">Guardar</button>
                    </div>


          </>

        )}



        </>
    );
}
