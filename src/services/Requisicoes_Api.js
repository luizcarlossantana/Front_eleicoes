import axios from 'axios';

export async function buscarListaCandidato() {
  try {
    const response = await axios.get('https://api-eleicoes-production.up.railway.app/candidatos/listar');
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export async function buscarListaCargo() {
  try {
    const response = await axios.get('https://api-eleicoes-production.up.railway.app/cargos/listar');
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export async function buscarVotosCandidatosCargos() {
  try {
    const response = await axios.get('https://api-eleicoes-production.up.railway.app/votos/relatorio/candidatos-Cargos');
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export async function criarVoto(obj, id) {
  try {
    const response = await axios.post(`https://api-eleicoes-production.up.railway.app/votos/eleitor/${id}`, obj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
}

export async function buscarMunicipios(uf) {
  try {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

export async function criarEleitor(obj) {
  try {
    const response = await axios.post(`https://api-eleicoes-production.up.railway.app/eleitores`, obj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
}
