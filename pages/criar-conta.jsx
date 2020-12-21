/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Router from 'next/router';

import { css } from '@emotion/core';
import Layout from '../components/Layout';

import {
  FormularioStyled,
  CampoStyled,
  InputSubmitStyled,
  MensagemErroStyled,
} from '../components/Ui/CssFormulario';

import validarFormCriarConta from '../util/validarFormCriarConta';

import useValidacao from '../hooks/useValidacao';
import { firebase } from '../firebase';

export default function CriarConta() {
  const initialState = {
    nome: '',
    email: '',
    senha: '',
  };

  const {
    valoresFormulario,
    errosFormulario,
    onChangeForm,
    onSubmitForm,
    // eslint-disable-next-line no-use-before-define
  } = useValidacao(initialState, validarFormCriarConta, criarConta);

  const [erroCriarConta, setErroCriarConta] = useState('');

  const { nome, email, senha } = valoresFormulario;

  async function criarConta() {
    try {
      await firebase.registrarUsuario(nome, email, senha);
      Router.push('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setErroCriarConta('Este email já está em uso');
      } else {
        setErroCriarConta('Ocorreu um erro ao registrar o usuário');
      }
    }
  }

  return (
    <Layout>
      <h1
        css={css`
          text-align: center;
          margin-top: 5rem;
        `}
      >
        Criar conta
      </h1>
      <FormularioStyled onSubmit={onSubmitForm} noValidate>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChangeForm}
          />
        </CampoStyled>

        {errosFormulario.email ? (
          <MensagemErroStyled>{errosFormulario.email}</MensagemErroStyled>
        ) : null}

        <CampoStyled>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="Senha"
            value={senha}
            onChange={onChangeForm}
          />
        </CampoStyled>

        {errosFormulario.senha ? (
          <MensagemErroStyled>{errosFormulario.senha}</MensagemErroStyled>
        ) : null}

        {erroCriarConta !== '' ? (
          <MensagemErroStyled>{erroCriarConta}</MensagemErroStyled>
        ) : null}

        <InputSubmitStyled type="submit" value="Criar conta" />
      </FormularioStyled>
    </Layout>
  );
}
