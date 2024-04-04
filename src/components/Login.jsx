import { useState } from "react";
import {login} from "../services/Requisicoes_Api"



const Login = () => {

    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [token, setToken] = useState();

const obj = {
    login: email,
    senha:senha
}



  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };



    
    async function logar(){

        try {
            const logarSistema = await login(obj)
            setToken(logarSistema.data)
            localStorage.setItem('token', token);
            console.log(JSON.stringify(token,null,2))
        } catch (error) {
            console.error("Erro ao logar",error);       
        }
    }






    return (
      <section className="d-flex justify-content-center align-items-center" style={{ width: '100vw', height: '100vh' }}>
        <div className="col-md-4 p-4 rounded-1 shadow-lg">
          <div className="d-flex justify-content-center">
            <h1>Login</h1>
          </div>
          <div className="mb-4">
            <label className="form-label">Email</label>
            <input placeholder="joao@email.com" type="email" className="form-control" id="validationServerUsername"  onChange={handleEmailChange}/>
          </div>
          <div className="mb-4">
            <label className="form-label">Senha</label>
            <input type="password" className="form-control" id="validationServer03" onChange={handleSenhaChange} />
          </div>
          <div className="d-grid gap-2">
            <button onClick={logar}  className="btn btn-primary">Login</button>
          </div>
        </div>
      </section>
    );
  }
  
  export default Login;
  