import React from 'react';

import Layout from '../components/Layout';
import ItemProduto from '../components/Layout/ItemProduto';

import useListarProdutosBy from '../hooks/useListarProdutosBy';

export default function Populares() {
  const listaDeProdutos = useListarProdutosBy('votos');

  return (
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <ul className="bg-white">
            {listaDeProdutos.map((objProduto) => (
              <ItemProduto key={objProduto.id} dadosProduto={objProduto} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
