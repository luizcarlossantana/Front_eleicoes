import axios from 'axios';




export async function buscarMunicipios(uf) {
  try {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

var tokenGeral = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlbGVpY2FvLWFwaSIsInN1YiI6InBhdWxvQGdtYWlsLmNvbSIsImV4cCI6MTcxMjYzNDA5MH0.Ch6-PzbqMI6O62ivAA5etJngd5OIpADbdHWPhlA8We8"

export async function login(obj) {  
  try {

    const response = await axios.post(`https://api-eleicoes-production.up.railway.app/auth/logar`, obj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    tokenGeral = response.data.token;
    console.log(tokenGeral)

    
    return response;

  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
}


export async function buscarListaCandidato() {
  const token = tokenGeral

  try {
    
    const response = await axios.get('https://api-eleicoes-production.up.railway.app/candidatos/listar', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export async function buscarListaCargo() {
  try {
    const token = tokenGeral
    console.log(token)
    const response = await axios.get('https://api-eleicoes-production.up.railway.app/cargos/listar', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cargos:', error);
    throw error;
  }
}

export async function buscarVotosCandidatosCargos() {
  try {
    const token = tokenGeral
    const response = await axios.get('https://api-eleicoes-production.up.railway.app/votos/relatorio/candidatos-Cargos', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export async function criarVoto(obj, id) {
  try {
    const token = tokenGeral
    const response = await axios.post(`https://api-eleicoes-production.up.railway.app/votos/eleitor/${id}`, obj, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}


export async function criarEleitor(obj) {
  
    const token = tokenGeral
  
    const response = await axios.post(`https://api-eleicoes-production.up.railway.app/eleitores`, obj, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
        return response.data;
   
  
}
