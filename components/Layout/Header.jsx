import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import FormBusca from '../Ui/FormBusca';
import MenuNavegacao from './MenuNavegacao';
import CssBotaoLink from '../Ui/CssBotaoLink';

import FirebaseContext from '../../firebase/FirebaseContext';

const ContainerHeaderStyled = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const LogoStyled = styled.p`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  margin-right: 2rem;
`;

export default function Header() {
  const { dadosUsuario, firebase } = useContext(FirebaseContext);

  let isUsuarioLogado = false;
  if (dadosUsuario) {
    isUsuarioLogado = true;
  }

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
      `}
    >
      <ContainerHeaderStyled>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <LogoStyled>P</LogoStyled>
          </Link>

          <FormBusca />

          <MenuNavegacao />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {isUsuarioLogado ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                  text-transform: capitalize;
                `}
              >
                Olá, {dadosUsuario.displayName}!
              </p>
              <CssBotaoLink
                bgColor="true"
                onClick={() => firebase.encerrarSessao()}
              >
                Encerrar sessão
              </CssBotaoLink>
              {/* menu admin */}
            </>
          ) : (
            <>
              <Link href="/login">
                <CssBotaoLink bgColor="true">Login</CssBotaoLink>
              </Link>
              <Link href="/criar-conta">
                <CssBotaoLink>Criar conta</CssBotaoLink>
              </Link>
            </>
          )}
        </div>
      </ContainerHeaderStyled>
    </header>
  );
}
