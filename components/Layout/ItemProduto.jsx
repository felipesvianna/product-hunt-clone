import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { ptBR } from 'date-fns/locale';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styled from '@emotion/styled';

const Produto = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;
const DescricaoProduto = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const Titulo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  :hover {
    cursor: pointer;
  }
`;

const TextoDescricao = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888;
`;

const Comentarios = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }
  img {
    width: 2rem;
    margin-right: 2rem;
  }
  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
  }
`;

const Imagem = styled.img`
  width: 200px;
`;

const Votos = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;
  div {
    font-size: 2rem;
  }
  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

export default function ItemProduto({ dadosProduto }) {
  const {
    id,
    nome,
    empresa,
    url,
    urlImagem,
    descricao,
    votos,
    listaDeComentarios,
    dataInclusao,
  } = dadosProduto;

  return (
    <Produto>
      <DescricaoProduto>
        <div>
          <Imagem src={urlImagem} />
        </div>

        <div>
          <Link href="/produtos/[id]" as={`/produtos/${id}`}>
            <Titulo>{nome}</Titulo>
          </Link>

          <TextoDescricao>{descricao}</TextoDescricao>

          <Comentarios>
            <div>
              <img src="/static/img/comentario.png" alt="comentario" />
              <p>{listaDeComentarios.length} comentários</p>
            </div>
          </Comentarios>
          <p>
            Publicado há{' '}
            {formatDistanceToNow(new Date(dataInclusao), { locale: ptBR })}
          </p>
        </div>
      </DescricaoProduto>

      <Votos>
        <div> &#9650; </div>
        <p>{votos}</p>
      </Votos>
    </Produto>
  );
}

ItemProduto.propTypes = {
  dadosProduto: PropTypes.oneOfType([PropTypes.object]),
};

ItemProduto.defaultProps = {
  dadosProduto: {},
};