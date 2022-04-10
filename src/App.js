import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom"
import Public from './Routes/Public';
import AuthProvider from "./Context/AuthProvider"
function App() {
  return (
    <AuthProvider>
      <Router>
          <Public />
      </Router>
    </AuthProvider>
  );
}
export default App;
