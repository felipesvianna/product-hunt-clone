import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Router from 'next/router';

const InputTextStyled = styled.input`
  border: 1px solid var(--gris3);
  padding: 1rem;
  min-width: 300px;
`;

const SubmitButtonStyled = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url('/static/img/buscar.png');
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 1px;
  background-color: white;
  border: none;
  text-indent: -9999px;
  &:hover {
    cursor: pointer;
  }
`;

export default function FormBusca() {
  const [stringBusca, setStringBusca] = useState('');

  function onChangeInputBusca(value) {
    setStringBusca(value.toLowerCase().trim());
  }

  function onSubmitFormBusca(e) {
    e.preventDefault();

    if (stringBusca !== '') {
      Router.push({ pathname: '/resultado-busca', query: { q: stringBusca } });
    }
  }

  return (
    <form
      css={css`
        position: relative;
      `}
      onSubmit={onSubmitFormBusca}
    >
      <InputTextStyled
        type="text"
        name="busca"
        id="busca"
        placeholder="Buscar produtos"
        onChange={(e) => onChangeInputBusca(e.target.value)}
      />
      <SubmitButtonStyled type="submit">Buscar</SubmitButtonStyled>
    </form>
  );
}
