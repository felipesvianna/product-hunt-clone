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

import validarFormLogin from '../util/validarFormLogin';

import useValidacao from '../hooks/useValidacao';
import { firebase } from '../firebase';

export default function Login() {
  const initialState = {
    email: '',
    senha: '',
  };

  const {
    valoresFormulario,
    errosFormulario,
    onChangeForm,
    onSubmitForm,
    // eslint-disable-next-line no-use-before-define
  } = useValidacao(initialState, validarFormLogin, iniciarSessao);

  const [erroIniciarSessao, setErroIniciarSessao] = useState('');

  const { email, senha } = valoresFormulario;

  async function iniciarSessao() {
    try {
      await firebase.iniciarSessaoUsuario(email, senha);
      Router.push('/');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setErroIniciarSessao('Credenciais inválidas');
      } else {
        setErroIniciarSessao('Ocorreu um erro ao iniciar a sessão o usuário');
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
        Login
      </h1>
      <FormularioStyled onSubmit={onSubmitForm} noValidate>
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

        {erroIniciarSessao !== '' ? (
          <MensagemErroStyled>{erroIniciarSessao}</MensagemErroStyled>
        ) : null}

        <InputSubmitStyled type="submit" value="Login" />
      </FormularioStyled>
    </Layout>
  );
}
