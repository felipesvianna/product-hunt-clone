/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { Router, useRouter } from 'next/router';

import FileUploader from 'react-firebase-file-uploader';

import { css } from '@emotion/core';
import Layout from '../components/Layout';

import Pagina404 from '../components/Layout/Pagina404';

import {
  FormularioStyled,
  CampoStyled,
  InputSubmitStyled,
  MensagemErroStyled,
  MensagemSucessoStyled,
} from '../components/Ui/CssFormulario';

import validarFormCriarProduto from '../util/validarFormCriarProduto';

import useValidacao from '../hooks/useValidacao';
import { FirebaseContext } from '../firebase';

export default function NovoProduto() {
  const initialState = {
    nome: '',
    empresa: '',
    imagem: '',
    url: '',
    descricao: '',
  };

  const { dadosUsuario, firebase } = useContext(FirebaseContext);

  const {
    valoresFormulario,
    errosFormulario,
    onChangeForm,
    onSubmitForm,
    // eslint-disable-next-line no-use-before-define
  } = useValidacao(initialState, validarFormCriarProduto, criarProduto);

  /* Somente as funcoes set estao sendo utilizadas propositalmente
  As definicoes dos states podem ser utilizadas para dar o feedback
  para o usuario */
  const [nomeImagem, setNomeImagem] = useState('');
  const [statusUpload, setStatusUpload] = useState(false);
  const [statusProgresso, setStatusProgresso] = useState(0);

  const [urlImagem, setUrlImagem] = useState('');

  const [hasErroRegistrarProduto, setHasErroRegistrarProduto] = useState(false);
  const [isProdutoRegistradoSucesso, setIsProdutoRegistradoSucesso] = useState(
    false
  );

  const router = useRouter();

  const { nome, empresa, url, descricao } = valoresFormulario;

  // eslint-disable-next-line consistent-return
  function criarProduto() {
    if (!dadosUsuario) {
      return router.push('/login');
    }

    const novoProduto = {
      nome,
      empresa,
      url,
      urlImagem,
      descricao,
      votos: 0,
      listaDeComentarios: [],
      dataInclusao: Date.now(),
      usuarioCriador: {
        id: dadosUsuario.uid,
        nome: dadosUsuario.displayName,
      },
      listaUsuariosQueVotaram: [],
    };

    firebase.db.collection('produtos').add(novoProduto);

    setIsProdutoRegistradoSucesso(true);
  }

  function handleUploadStart() {
    setStatusProgresso(0);
    setStatusUpload(true);
  }

  function handleProgress(progresso) {
    return setStatusProgresso({ progresso });
  }

  function handleUploadError(error) {
    setStatusUpload(error);
    console.error(error);
    setHasErroRegistrarProduto(true);
  }

  function handleUploadSuccess(nomeImg) {
    setStatusProgresso(100);
    setStatusUpload(false);
    setNomeImagem(nomeImg);
    firebase.storage
      .ref('produtos')
      .child(nomeImg)
      .getDownloadURL()
      .then((urlImg) => {
        setUrlImagem(urlImg);
      });
  }

  // substituir para redirecionamento para a pagina de login
  if (!dadosUsuario) return <Pagina404 />;

  return (
    <>
      <Layout>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Novo Produto
        </h1>

        <FormularioStyled onSubmit={onSubmitForm} noValidate>
          <fieldset>
            <legend>Informações Gerais</legend>
            <CampoStyled>
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                name="nome"
                id="nome"
                placeholder="Nome"
                value={nome}
                onChange={onChangeForm}
              />
            </CampoStyled>

            {errosFormulario.nome ? (
              <MensagemErroStyled>{errosFormulario.nome}</MensagemErroStyled>
            ) : null}

            <CampoStyled>
              <label htmlFor="empresa">Empresa</label>
              <input
                type="text"
                name="empresa"
                id="empresa"
                placeholder="Empresa"
                value={empresa}
                onChange={onChangeForm}
              />
            </CampoStyled>

            {errosFormulario.empresa ? (
              <MensagemErroStyled>{errosFormulario.empresa}</MensagemErroStyled>
            ) : null}

            <CampoStyled>
              <label htmlFor="imagem">Imagem</label>
              <FileUploader
                name="imagem"
                id="imagem"
                accept="image/*"
                randomizeFilename
                storageRef={firebase.storage.ref('produtos')}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </CampoStyled>

            {errosFormulario.imagem ? (
              <MensagemErroStyled>{errosFormulario.imagem}</MensagemErroStyled>
            ) : null}

            <CampoStyled>
              <label htmlFor="url">URL</label>
              <input
                type="text"
                name="url"
                id="url"
                placeholder="URL do produto"
                value={url}
                onChange={onChangeForm}
              />
            </CampoStyled>

            {errosFormulario.url ? (
              <MensagemErroStyled>{errosFormulario.url}</MensagemErroStyled>
            ) : null}
          </fieldset>

          <fieldset>
            <legend>Informações do produto</legend>

            <CampoStyled>
              <label htmlFor="descricao">Descrição</label>
              <textarea
                name="descricao"
                id="descricao"
                value={descricao}
                onChange={onChangeForm}
              />
            </CampoStyled>

            {errosFormulario.descricao ? (
              <MensagemErroStyled>
                {errosFormulario.descricao}
              </MensagemErroStyled>
            ) : null}
          </fieldset>

          {hasErroRegistrarProduto ? (
            <MensagemErroStyled>
              Ocorreu um erro ao registrar o produto
            </MensagemErroStyled>
          ) : null}

          {isProdutoRegistradoSucesso ? (
            <MensagemSucessoStyled>
              Produto registrado com sucesso
            </MensagemSucessoStyled>
          ) : null}

          <InputSubmitStyled type="submit" value="Criar Produto" />
        </FormularioStyled>
      </Layout>
    </>
  );
}
