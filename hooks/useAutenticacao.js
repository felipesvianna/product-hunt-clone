import React, { useState, useEffect } from 'react';

import { firebase } from '../firebase';

export default function useAutenticacao() {
  const [dadosUsuarioAutenticado, setDadosUsuarioAutenticado] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        setDadosUsuarioAutenticado(usuario);
      } else {
        setDadosUsuarioAutenticado(null);
      }
    });
    return () => unsubscribe;
  }, []);

  return dadosUsuarioAutenticado;
}
