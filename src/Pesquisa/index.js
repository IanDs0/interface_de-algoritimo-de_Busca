import React, { useState } from 'react';

import './index.css';
import Button from '../Button';
import api from '../api/api';

import { IoSearch, IoBan, IoAdd, IoReorderTwo } from "react-icons/io5";

function Pesquisa() {

    const [pesquisa, setPesquisa] = useState('')
    const [arquivos,setArquivo] = useState()

    async function Pesquisa (event){
      event.preventDefault();
      try {
        const datat = await api.post(`/teste`, {
            "busca": pesquisa.replace(/ /g, '+'),/* se tiver espaço considera como And */
          }
        );

        setArquivo(datat.data.results)

      } catch (error) {
        console.error(error.response);
      }
    }

    /*function Arquivos() {
      return (
        <>
          {
            arquivos.map((arq)=>{
              return (
                <div className="Elemento">

                  <label id = {arq.nome}>

                    <h6 >{arq.nome}</h6>

                    <a href = {arq.diretorio} >
                      {arq.diretorio}
                    </a>

                  </label>
                </div>
              )
            })
          }
        </>
      )
    } */

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
        
        <h1 className="Titulo">Busca Booleana</h1>
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
        <form onSubmit={Pesquisa}>

          <div className="campo_pesquisa">
              <input type="text" 
                  placeholder='Escreva o que deseja perquisar' 
                  value={pesquisa}
                  onChange={select => setPesquisa(select.target.value)}
              />

              <Button children={<IoSearch/>} onClick={() => Pesquisa} /* Estilizar o icone tu coloca aqui *//>
          </div>
          <p className="descricao">Utilize os botões para completar com os operadores de pesquisa caso não saiba qual utilizar</p>

          <div className="Table">
            {arquivos?.map((arq)=>{
              return (
                <div className="Elemento">

                  <label id = {arq.nome}>

                    <h6 >{arq.nome}</h6>

                    <a href = {arq.diretorio}>
                      {arq.diretorio}
                    </a>

                    </label>
                  </div>
                )
              })
            }
          </div>
        </form>

      </header>
    </div>
  );
}

export default Pesquisa;
