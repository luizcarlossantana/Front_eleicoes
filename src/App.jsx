import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import Form_cadastro from "./routes/Form_cadastro";
import Section_Info_Votar from "./components/Section_Info_Votar";


function App() {


  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Form_cadastro />} />
        <Route path="/home" element={<Section_Info_Votar />} />


      </Routes>

    </BrowserRouter>


  )
}

export default App