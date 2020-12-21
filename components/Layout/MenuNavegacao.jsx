/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import FirebaseContext from '../../firebase/FirebaseContext';

const NavStyled = styled.nav`
  padding-left: 2rem;
  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gris2);
    font-family: 'PT Sans', sans-serif;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export default function MenuNavegacao() {
  const { dadosUsuario } = useContext(FirebaseContext);

  return (
    <NavStyled>
      <Link href="/">
        <a>Inicio</a>
      </Link>
      <Link href="/populares">
        <a>Produtos Populares</a>
      </Link>
      {dadosUsuario ? (
        <Link href="/novo-produto">
          <a>Novo Produto</a>
        </Link>
      ) : null}
    </NavStyled>
  );
}
