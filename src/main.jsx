import ReactDOM from 'react-dom/client'
import App from './router/Router'
import "./styles/global/Index.css"
import "./styles/global/button.css"
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
         <App/>
    </AuthProvider>

)
