import { useEffect, useState, useRef } from 'react';
import { buscarListaCargo, buscarVotosCandidatosCargos } from '../services/Requisicoes_Api';
import Chart from 'chart.js/auto';

const Grafico = () => {
  const [cargos, setCargos] = useState([]); 
  const [cargoSelecionado, setCargoSelecionado] = useState('');
  const chartRef = useRef(null); // Referência para o canvas do gráfico

  useEffect(() => {
    async function carregarCargos() {
      try {
        const listaCargos = await buscarListaCargo();
        setCargos(listaCargos);
      } catch (error) {
        console.error('Erro ao buscar os cargos:', error);
      }
    }

    carregarCargos();
  }, []);

  const handleCargoChange = async (event) => {
    const cargo = event.target.value;
    setCargoSelecionado(cargo);
  };

  useEffect(() => {
    async function renderizarGrafico() {
      

      const ListaDeCandidatosPorCargo = await buscarVotosCandidatosCargos();

      const dataFromEndpoint = ListaDeCandidatosPorCargo
      .flat()
      .filter(candidato => candidato.nomeCargo === cargoSelecionado)
      .map(candidato => ({
        votos: candidato.votos,
        nomeCandidato: candidato.nomeCandidato,
        nomeCargo: candidato.nomeCargo
      }));
    

      const votos = dataFromEndpoint.map(item => item.votos);
      const candidatos = dataFromEndpoint.map(item => item.nomeCandidato);

      // Destruir o gráfico anterior se existir
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('barChart').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: candidatos,
          datasets: [{
            label: 'Número de Votos',
            data: votos,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Número de Votos'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Candidatos'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.dataset.label + ': ' + context.parsed.y + ' ' + candidatos[context.dataIndex];
                }
              }
            }
          }
        }
      });
    }

    renderizarGrafico();
  }, [cargoSelecionado]);

  return (
    <div id="grafico" className="col-lg-5 col-auto p-2 rounded-1 shadow-lg">
      <div id="div-grafico">
        <canvas id="barChart"></canvas>
      </div>
      <div className="col-4">
        <select className="form-select" value={cargoSelecionado} onChange={handleCargoChange}>
          <option value="">Escolha um cargo</option>
          {cargos.map(cargo => (
            <option key={cargo.id} value={cargo.nome}>{cargo.nome}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Grafico;
