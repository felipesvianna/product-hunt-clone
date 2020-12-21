/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { ptBR } from 'date-fns/locale';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { objetoEstaVazio } from '../../util/Helper';

import Layout from '../../components/Layout';
import Pagina404 from '../../components/Layout/Pagina404';

import {
  CampoStyled,
  InputSubmitStyled,
} from '../../components/Ui/CssFormulario';

import CssBotaoLink from '../../components/Ui/CssBotaoLink';

import { FirebaseContext } from '../../firebase';

const ContainerProduto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;
const CriadorProduto = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

export default function Produto() {
  const { firebase, dadosUsuario } = useContext(FirebaseContext);

  const router = useRouter();

  const [dadosProduto, setDadosProduto] = useState({});
  const [erroGetDadosProjeto, setErroGetDadosProjeto] = useState(false);
  const [comentario, setComentario] = useState({});

  // Hook necessario para ser utilizado no useEffect
  const [canGetDadosProduto, setCanGetDadosProduto] = useState(true);

  const idProduto = router.query.id;

  async function getProdutoDoBd() {
    const produtoEncontrado = await firebase.getProduto(idProduto);

    if (produtoEncontrado) {
      setDadosProduto(produtoEncontrado);
      setCanGetDadosProduto(false);
    } else {
      setErroGetDadosProjeto(true);
      setCanGetDadosProduto(false);
    }
  }

  useEffect(() => {
    // canGetDadosProduto evita consultar a base de dados de forma intermitente
    if (idProduto && canGetDadosProduto) {
      getProdutoDoBd(idProduto);
    }
  }, [idProduto, dadosProduto]);

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
    usuarioCriador,
    listaUsuariosQueVotaram,
  } = dadosProduto;

  function canDeletarProduto() {
    if (dadosUsuario && dadosUsuario.uid === dadosProduto.usuarioCriador.id) {
      return true;
    }

    return false;
  }

  async function onClickBotaoVotar() {
    if (!dadosUsuario) {
      return router.push('/login');
    }

    if (!listaUsuariosQueVotaram.includes(dadosUsuario.uid)) {
      // const novoTotalDeVotos = votos + 1;
      // firebase.db
      //   .collection('produtos')
      //   .doc(idProduto)
      //   .update({
      //     votos: novoTotalDeVotos,
      //     listaUsuariosQueVotaram: [
      //       ...listaUsuariosQueVotaram,
      //       dadosUsuario.uid,
      //     ],
      //   });
      // setDadosProduto({
      //   ...dadosProduto,
      //   votos: novoTotalDeVotos,
      //   listaUsuariosQueVotaram: [...listaUsuariosQueVotaram, dadosUsuario.uid],
      // });

      const novoTotalDeVotos = await firebase.setVotoDeUsuario(
        dadosUsuario.uid,
        idProduto
      );

      setDadosProduto({
        ...dadosProduto,
        votos: novoTotalDeVotos,
        listaUsuariosQueVotaram: [...listaUsuariosQueVotaram, dadosUsuario.uid],
      });

      setCanGetDadosProduto(true);
    }
  }

  if (objetoEstaVazio(dadosProduto) && !erroGetDadosProjeto) {
    return <h3>Carregando...</h3>;
  }

  function onChangeInputComentario(e) {
    setComentario({ ...comentario, textoComentario: e.target.value });
  }

  function onSubmitComentario(e) {
    e.preventDefault();

    if (!dadosUsuario) {
      return router.push('/login');
    }

    comentario.idUsuario = dadosUsuario.uid;
    comentario.nomeUsuario = dadosUsuario.displayName;

    const listaDeComentariosAtualizada = [...listaDeComentarios, comentario];

    firebase.db
      .collection('produtos')
      .doc(idProduto)
      .update({ listaDeComentarios: listaDeComentariosAtualizada });

    setDadosProduto({
      ...dadosProduto,
      listaDeComentarios: listaDeComentariosAtualizada,
    });

    setCanGetDadosProduto(true);
  }

  async function onClickDeletarProduto() {
    if (!dadosUsuario) {
      return router.push('/login');
    }

    if (usuarioCriador.id !== dadosUsuario.uid) {
      return router.push('/');
    }

    try {
      await firebase.db.collection('produtos').doc(idProduto).delete();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <>
        {erroGetDadosProjeto ? (
          <Pagina404 />
        ) : (
          <div className="contenedor">
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {nome}{' '}
            </h1>

            <ContainerProduto>
              <div>
                <p>
                  Publicado há{' '}
                  {formatDistanceToNow(new Date(dataInclusao), {
                    locale: ptBR,
                  })}
                  , por {usuarioCriador.nome}
                </p>

                <img src={urlImagem} alt="foto" />

                <p>
                  Empresa:{' '}
                  <span
                    css={css`
                      text-transform: capitalize;
                    `}
                  >
                    {empresa}
                  </span>
                </p>
                <p>{descricao}</p>

                {dadosUsuario ? (
                  <>
                    <h2>Escreva seu comentário</h2>
                    <form onSubmit={onSubmitComentario}>
                      <CampoStyled>
                        <input
                          type="text"
                          name="textoComentario"
                          onChange={onChangeInputComentario}
                        />
                      </CampoStyled>
                      <InputSubmitStyled
                        type="submit"
                        value="Adicionar Comentário"
                      />
                    </form>
                  </>
                ) : null}

                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comentários
                </h2>
                {listaDeComentarios.length === 0 && !dadosUsuario ? (
                  'Não há comentários'
                ) : (
                  <ul>
                    {listaDeComentarios.map((objComentario) => {
                      let corBg = 'white';

                      if (
                        dadosUsuario &&
                        dadosUsuario.uid === objComentario.idUsuario
                      ) {
                        corBg = '#DDE0E3';
                      }

                      return (
                        <li
                          css={css`
                            border: 1px solid #b4b7b5;
                            padding: 2rem;
                            background-color: ${corBg};
                            margin-bottom: 1rem;
                          `}
                          key={`${objComentario.idUsuario}`}
                        >
                          <p>{objComentario.textoComentario}</p>
                          <p>
                            Escrito por{' '}
                            <span
                              css={css`
                                font-weight: bold;
                              `}
                            >
                              {objComentario.nomeUsuario}
                            </span>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <aside>
                <CssBotaoLink target="_blank" bgColor="true" href={url}>
                  Site
                </CssBotaoLink>

                <div
                  css={css`
                    margin-top: 5rem;
                  `}
                >
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {votos} Votos
                  </p>

                  {dadosUsuario ? (
                    <CssBotaoLink onClick={onClickBotaoVotar}>
                      Votar
                    </CssBotaoLink>
                  ) : null}
                </div>
              </aside>
            </ContainerProduto>

            {canDeletarProduto() && (
              <CssBotaoLink onClick={onClickDeletarProduto}>
                Deletar Produto
              </CssBotaoLink>
            )}
          </div>
        )}
      </>
    </Layout>
  );
}
