/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ItemProduto from '../components/Layout/ItemProduto';

import useListarProdutosBy from '../hooks/useListarProdutosBy';

export default function ResultadoBusca() {
  const listaDeProdutos = useListarProdutosBy('dataInclusao');
  const [listaResultadosBusca, setListaResultadosBusca] = useState([]);

  const router = useRouter();
  const parametroBusca = router.query.q;

  function filtrarResultados() {
    return listaDeProdutos.filter((produto) => {
      return (
        produto.nome.toLowerCase().includes(parametroBusca) ||
        produto.descricao.toLowerCase().includes(parametroBusca) ||
        produto.empresa.toLowerCase().includes(parametroBusca)
      );
    });
  }

  useEffect(() => {
    const resultadosBusca = filtrarResultados();
    setListaResultadosBusca(resultadosBusca);
  }, [parametroBusca, listaDeProdutos]);

  return (
    <Layout>
      <h1>ResultadoBusca</h1>
      <div className="listado-productos">
        <div className="contenedor">
          <ul className="bg-white">
            {listaResultadosBusca.map((objProduto) => (
              <ItemProduto key={objProduto.id} dadosProduto={objProduto} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
