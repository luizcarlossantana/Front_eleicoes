import axios from 'axios';

const apiUrl = {
  localhost:'https://eleicoes-api-9-1.onrender.com/',
  dev:''
}

axios.defaults.validateStatus = () => {
  return true; // Retorna true para todos os códigos de status
};

var tokenGeral = localStorage.getItem('token')

export function login(obj) {  
  return axios.post(`${apiUrl.localhost}auth/logar`, obj, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      localStorage.setItem('token',response.data.token)
      console.log(tokenGeral);
      return response;
    })
    .catch(error => {
      if (error.response) {
        return error.response;
      } else {
        throw error;
      }
    });
}

export function buscarListaCandidato() {
  const token = tokenGeral;

  return axios.get(`${apiUrl.localhost}candidatos/listar`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
      throw error;
    });
}


export function buscarListaEleitores() {
  const token = tokenGeral;

  return axios.get(`${apiUrl.localhost}eleitores/listar`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
      throw error;
    });
}

export function buscarListaCargo() {
  const token = tokenGeral;
  console.log(token);

  return axios.get(`${apiUrl.localhost}cargos/listar`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Erro ao buscar cargos:', error);
      throw error;
    });
}

export function buscarVotosCandidatosCargos() {
  const token = tokenGeral;

  return axios.get(`${apiUrl.localhost}votos/relatorio/candidatos-Cargos`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
      throw error;
    });
}

export function criarEleitor(obj) {
  const token = tokenGeral;

  return axios.post(`${apiUrl.localhost}eleitores`, obj, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
      throw error;
    });
}

export function buscarMunicipios(uf) {
  return axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
      throw error;
    });
}

export function criarVoto(obj, id) {
  const token = tokenGeral;

  return axios.post(`${apiUrl.localhost}votos/eleitor/${id}`, obj, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    return response;
  })
  .catch(error => {
    console.error("erro ao criar voto", error)
  });
}
