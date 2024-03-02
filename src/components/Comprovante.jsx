import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import logoPdf from "../assets/print.svg"
import logoTse from "../assets/logo_TSE.png"


const Comprovante = (props) => {



  const doc = new jsPDF;
  const margemHorizontal = 20;
  const margemYPrimeiroTitulo = 50;
  const primeiroTitulo = "Comprovante Nacional de Voto"
  const inicioXLinha = 20;
  const inicioY_PrimeiraLinha = 55;
  const finalCumprimentoLinha = doc.internal.pageSize.width - inicioY_PrimeiraLinha;
  const opcoes = {
    align: 'left',
  };

  const eleitor = "Nome: Luiz Carlos Santana"
  const margemY_Eleitor = 80;

  const id = "id: 77cc97f2-32de-4ed3-87_fb-91dde0716481"
  const margemY_Id = 88;

  const segundoTitulo = "Informações do Eleitor"
  const margemYSegundoTitulo = 70;
  const inicioY_SegundaLinha = 95;

  const titulo_Info_Votos = "Informações do Voto"
  const margemY_Info_Votos = 110;

  const cargo = "Cargo: Presidente"
  const margemY_Cargo = 118;

  const candidato = "Candidato: Jair Messias Bolsonaro"
  const margemY_Candidato = 126;

  const img = new Image();
  img.src = logoTse;
  const larguraImagem = 30;
  const alturaImagem = 12;
  const margemX_Imagem = (doc.internal.pageSize.width - larguraImagem - 10) /2;


  doc.addImage(logoTse, 'PNG', margemX_Imagem, 20,larguraImagem,alturaImagem);
  doc.text(primeiroTitulo, margemHorizontal, margemYPrimeiroTitulo, opcoes);
  doc.line(inicioXLinha, inicioY_PrimeiraLinha, finalCumprimentoLinha, inicioY_PrimeiraLinha);
  doc.text(segundoTitulo, margemHorizontal, margemYSegundoTitulo, opcoes)
  doc.text(eleitor, margemHorizontal, margemY_Eleitor, opcoes)
  doc.text(id, margemHorizontal, margemY_Id, opcoes)
  doc.line(inicioXLinha, inicioY_SegundaLinha, finalCumprimentoLinha, inicioY_SegundaLinha);
  doc.text(titulo_Info_Votos, margemHorizontal, margemY_Info_Votos, opcoes)
  doc.text(cargo, margemHorizontal, margemY_Cargo, opcoes)
  doc.text(candidato, margemHorizontal, margemY_Candidato, opcoes)



  const pdfBase64 = doc.output('bloburi');





  return (
    <>

      <a target="_blank" href={pdfBase64}>
        <button className="btn btn-dark btn-sm">
          <img src={logoPdf} alt="pdf" /> Imprimir
        </button>
      </a>

    </>
  )
}

export default Comprovante;