import React, { useState } from 'react';

import './index.css';
import Button from '../Button';
import api from '../api/api';

import { IoSearch, IoBan, IoAdd, IoReorderTwo } from "react-icons/io5";

function Pesquisa() {

    const [pesquisa, setPesquisa] = useState('')
    const [arquivos,setArquivo] = useState([
      {
        "nome": "Teste",
        "diretorio": "file:///C:/Users/ianha/Desktop/a/corpus/pf0022pu.htm",
      },
      {
        "nome": "Teste2",
        "diretorio": "file:///C:/Users/ianha/Desktop/a/corpus/pf0029pu.htm",
      }
    ])

    async function Pesquisa (){
        try {
            const { data } = await api.post(`/`, {
                "busca": pesquisa.replace(/ /g, '+'),/* se tiver espaço considera como And */
            }
          );

          console.log(data);
          // setPesquisa = data

        } catch (error) {
          console.error(error.response);
        }
    }

    function Arquivos() {
      return (
        <tr>
          {
            arquivos.map((arq)=>{
              return (
                <label id = {arq.nome}>

                  <h6>{arq.nome}</h6>

                  <a href = {arq.diretorio} target="_blank">
                    {arq.diretorio}
                  </a>

                </label>
              )
            })
          }
        </tr>
      )
    }

    function addAnd() {
        setPesquisa(pesquisa + "+")
    }
    function addNot() {
        setPesquisa(pesquisa + "-")
    }
    function addOr() {
        setPesquisa(pesquisa + "|")
    }

  return (
    <div className="Pesquisa">
      <header className="Pesquisa-header">
        
        <h1>Busca Booleana</h1>

        <div className="addComand">
            <Button onClick={() => addAnd()}>
                <IoAdd /* Estilizar o icone tu coloca aqui *//>
                And / E
            </Button>
            <Button onClick={() => addOr()}>
                <IoReorderTwo transform="rotate(90)" /* Estilizar o icone tu coloca aqui *//>
                Or / Ou
            </Button>
            <Button onClick={() => addNot()}>
                <IoBan /* Estilizar o icone tu coloca aqui *//>
                Not / Não
            </Button>
        </div>

        <div className="campo_pesquisa">
            <input type="text" 
                placeholder='Escreva o que deseja perquisar' 
                value={pesquisa}
                onChange={select => setPesquisa(select.target.value)}
            />

            <Button children={<IoSearch/>} onClick={() => Pesquisa()} /* Estilizar o icone tu coloca aqui *//>
            <p>Utilize os botões para completar com os operadores de pesquisa caso não saiba qual utilizar</p>
        </div>

        <table>
          {Arquivos()}
        </table>

      </header>
    </div>
  );
}

export default Pesquisa;
