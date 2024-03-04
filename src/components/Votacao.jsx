
import { useEffect, useState } from 'react';
import { buscarListaCandidato, buscarListaCargo, criarVoto } from '../services/Requisicoes_Api';
import { Link } from 'react-router-dom';
import Comprovante from './Comprovante';


const Votacao = () => {
    const [cargos, setCargos] = useState([]); // Estado para armazenar os cargos
    const [candidatos, setCandidatos] = useState([]); // Estado para armazenar os candidatos
    const [cargoSelecionado, setCargoSelecionado] = useState(''); // Estado para armazenar o cargo selecionado
    const [idEleitor, setIdEleitor] = useState(''); // Estado para armazenar o ID do eleitor
    const [candidatoSelecionado, setCandidatoSelecionado] = useState(''); // Estado para armazenar o candidato selecionado
    
    useEffect(() => {
        async function receberCargos() {
            try {
                const listaCargos = await buscarListaCargo();
                setCargos(listaCargos); // Atualiza o estado com os cargos obtidos da API
            } catch (error) {
                console.error('Erro ao buscar os cargos:', error);
            }
        }

        // Chama a função para receber os cargos quando o componente é montado
        receberCargos();
    }, []); // O segundo argumento [] garante que essa função seja chamada apenas uma vez, quando o componente é montado

    useEffect(() => {
        async function receberCandidatos() {
            try {
                const listaCandidatos = await buscarListaCandidato();
                // Filtra os candidatos com base no cargo selecionado, se houver
                const candidatosFiltrados = cargoSelecionado ? listaCandidatos.filter(candidato => candidato.cargo.nome === cargoSelecionado) : listaCandidatos;
                setCandidatos(candidatosFiltrados); // Atualiza o estado com os candidatos filtrados
            } catch (error) {
                console.error('Erro ao buscar os candidatos:', error);
            }
        }

        // Chama a função para receber os candidatos quando o componente é montado ou quando o cargo selecionado muda
        receberCandidatos();
    }, [cargoSelecionado]); // O segundo argumento [cargoSelecionado] garante que essa função seja chamada sempre que o cargo selecionado mudar

    // Ouvinte de evento para atualizar o cargo selecionado
    const handleCargoChange = (event) => {
        const cargoSelecionado = event.target.value;
        setCargoSelecionado(cargoSelecionado);
    };


    const IdChange = (event) => {
        const idEleitor = event.target.value;
        setIdEleitor(idEleitor);
    };

    const CandidatoChange = (event) => {
        const candidatoSelecionado = event.target.value;
        setCandidatoSelecionado(candidatoSelecionado);
    };

    async function creatVoto() {
        let obj = {
            candidato: {
                id: ''
            },
            eleitor: {
                id: ''
            }
        };

        for (const candidatoItem of candidatos) {
            if (candidatoItem.nome === candidatoSelecionado) {
                obj.candidato.id = candidatoItem.id;
                obj.eleitor.id = idEleitor;


                console.log("obj:", JSON.stringify(obj, null, 2))
            }
        }

        try {
            const response = await criarVoto(obj, idEleitor);
            console.log("response:", JSON.stringify(response, null, 2));

            if (response.status != 200) {

                window.alert(`
              Deu Erro!
              Status: ${response.status}
              Mensagem: ${JSON.stringify(response.data, null, 2)}`);
            } else {

                window.alert('Deu Certo');

            }
        } catch (error) {

            console.error('Erro na requisição:', error);

        }
    }

    return (
        <>
            <div className="d-flex flex-column justify-content-start shadow-lg rounded p-4 votacao">
                <div className = "d-flex justify-content-end " >
               <div className='comprovante  '> <Comprovante/></div>
                </div>
                <h1 className="text-start mb-4 pb-2 border-bottom border-light">Votação</h1>
                <div className="d-flex justify-content-around">
                    <div className="d-flex flex-column align-items-start">
                        <h1 className="fs-4">Cargo</h1>
                        <select id="cargo" className="form-select form-select-md" aria-label="Escolha um cargo" onChange={handleCargoChange}>
                            <option value="">Escolha um cargo</option>
                            {cargos.map(cargo => (
                                <option key={cargo.id} value={cargo.nome}>{cargo.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <h1 className="fs-4">Candidato</h1>
                        <select id="candidato" className="form-select form-select-md" aria-label="Escolha um candidato" onChange={CandidatoChange}>
                            <option value="">Escolha um candidato</option>
                            {candidatos.map(candidato => (
                                <option key={candidato.id} value={candidato.nome}>{candidato.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <h1 className="fs-4">Eleitor</h1>
                        <input id="ideleitor" type="text" className="form-control" placeholder="id" onChange={IdChange} />
                    </div>
                </div>
                <button id="button" className="btn btn-primary mb-4 mt-4 d-inline-block align-self-start" onClick={creatVoto}>Votar</button>
                <Link to="/cadastro" className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Cadastre-se Aqui!</Link>            </div>
        </>
    );
}

export default Votacao;
