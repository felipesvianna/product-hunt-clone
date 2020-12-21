import React from 'react';
import PropTypes from 'prop-types';
import { firebase, FirebaseContext } from '../firebase';

import useAutanticacao from '../hooks/useAutenticacao';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const dadosUsuario = useAutanticacao();

  return (
    <FirebaseContext.Provider value={{ firebase, dadosUsuario }}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.oneOfType([PropTypes.object]),
};

MyApp.defaultProps = {
  Component: null,
  pageProps: {},
};
