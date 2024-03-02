import NavBar from "./components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";


function App() {
 

  return (
    <>
    <NavBar/>
    <Outlet/>
    </>


  )
}

export default App