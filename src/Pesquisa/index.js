import React, { useState } from 'react';

import './index.css';
import Button from '../Button';
import api from '../api/api';

import { IoSearch } from "react-icons/io5";

function Pesquisa() {

  const [pesquisa, setPesquisa] = useState('')
  const [arquivos,setArquivo] = useState()

  async function Pesquisa (event){
    event.preventDefault();
    try {
      const datat = await api.post(`/`, {
          "busca": pesquisa.replace(/[\+\-\*\/\|]/g, " "),/* se tiver operador considera como espaco */
        } 
      );

      setArquivo(datat.data.results)

    } catch (error) {
      console.error(error.response);
    }
  }

  return (
    <div className="Pesquisa">
      <header className="Pesquisa-header">
        
        <h1 className="Titulo">Modelo probabilıstico e ranking</h1>
        <form onSubmit={Pesquisa}>

          <div className="campo_pesquisa">
              <input type="text" 
                  placeholder='Escreva o que deseja perquisar' 
                  value={pesquisa}
                  onChange={select => setPesquisa(select.target.value)}
              />

              <Button children={<IoSearch/>} onClick={() => Pesquisa} /* Estilizar o icone tu coloca aqui *//>
          </div>

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
