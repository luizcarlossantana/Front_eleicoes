import { useState, useEffect } from "react";
import {buscarMunicipios,criarEleitor} from "../services/Requisicoes_Api"
import NavBar from "./NavBar";


const Form_cadastro = () => {

  const listaEstados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
];




const [nome, setNome] = useState('');
const [cpf, setCpf] = useState('');
const [email, setEmail] = useState('');
const [whatsapp, setWhatsapp] = useState('');
const [cidade, setCidade] = useState('');

const [municipios, setMunicipio] = useState([]); 
const [estados, setEstados] = useState([]); 
const [estadoSelecionado, setEstadoSelecionado] = useState('');




useEffect(() => {
  async function receberEstados() {
      try {
          setEstados(listaEstados);
      } catch (error) {
          console.error('Erro ao buscar os Estados:', error);
      }
  }

  receberEstados();
}, []); 



 

useEffect(() => {
  async function carregarMunicipios() {
    try {
      const listaMunicipios = await buscarMunicipios(estadoSelecionado);
      setMunicipio(listaMunicipios);
    } catch (error) {
      console.error('Erro ao buscar os Municipios:', error);
    }

    
  } 
  carregarMunicipios(); 
}, [estadoSelecionado]);


console.log(JSON.stringify(municipios,null,2))

const handleMunicipioChange = async (event) => {
  const estado = event.target.value;
  setEstadoSelecionado(estado);
  
};

const handleNomeChange = (event) => {
  setNome(event.target.value);
};

const handleCpfChange = (event) => {
  setCpf(event.target.value);
};

const handleEmailChange = (event) => {
  setEmail(event.target.value);
};

const handleWhatsappChange = (event) => {
  setWhatsapp(event.target.value);
};


const handleCidadeChange = (event) => {
  setCidade(event.target.value);
};


async function createEleitor() {
  let obj = {
    nome: nome,
    cpf: cpf,
    whatsapp: whatsapp,
    estado: estadoSelecionado,
    cidade: cidade,
    email: email
  };

  try {

    const response = await criarEleitor(obj);

    JSON.stringify(response.data, null, 2)

    if (response.status == 200) {
      window.alert(`
      Deu Certo !
      Status: ${response.status}`);
     
  } else {

    window.alert(`
    Deu Erro!
    Status: ${response.status}
    Mensagem: ${JSON.stringify(response.data, null, 2)}`);

  }
  } catch (error) {
    console.error('Erro ao criar eleitor:', error);
  }

  
}


  return (
    <>
  
<NavBar/>
 <section className="  mt-4 d-flex flex-column align-items-center" >
  
  <div className=" col-md-4 p-4 r  rounded-1  shadow-lg">


   <div className="">
     <label  className="form-label">Nome Completo</label>
     <input  placeholder="João da Silva" type="text" className="form-control" id="validationCustom01" onChange={handleNomeChange}  />
   </div>

   <div className="">
     <label  className="form-label">CPF</label>
     <input placeholder="000.000.000-00" type="text" className="form-control " id="validationServer02" onChange={handleCpfChange}  />
   </div>

   <div className="">
     <label  className="form-label">Email</label>
       <input placeholder="joao@email.com" type="email" className="form-control" id="validationServerUsername" onChange={handleEmailChange}  />
   </div>

   <div className="">
     <label  className="form-label">Whatsapp</label>
     <input placeholder="(99)99999-9999" type="text" className="form-control " id="validationServer03" onChange={handleWhatsappChange}  />
   </div>

   <div className="">
     <label  className="form-label">Senha</label>
     <input  type="password" className="form-control " id="validationServer03" onChange={handleWhatsappChange}  />
   </div>

   <div className="d-flex justify-content-between ">
   <div className="col-md-6">
   <label className="form-label">Estado</label>
     <select className="form-select " id="validationServer04" onChange={handleMunicipioChange}  >
     <option value="">estado</option>
       {estados.map(estado => (
         <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>
         ))}
     </select>
   </div>
  

   <div className="col-md-6">
   <label className="form-label">Cidade</label>
     <select className="form-select " id="validationServer04" onChange={handleCidadeChange} >
       <option value="">cidade</option>
       {municipios.map(municipio => (
            <option key={municipio.id} value={municipio.nome}>{municipio.nome}</option>
          ))}
     </select>
   </div>

   </div>
  

   
     <div className="form-check pt-2 ">
       <label className="form-check-label">
       <input className="form-check-input" type="checkbox" value="" id="invalidCheck3"   />
         <p className="fs-6 fw-normal">Concordo com os Termos e Condições.</p>
       </label>
     </div>
  


  
    <div className="d-grid gap-2  ">
    <button className="btn btn-primary"  onClick={createEleitor}>Cadastrar</button>
    </div>

   </div>
 

 </section>



    </>
  )
}

export default Form_cadastro


