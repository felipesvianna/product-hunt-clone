import { useState, useEffect } from 'react';

import { objetoEstaVazio } from '../util/Helper';

/**
 *
 * @typedef {Object} StatesEFuncoesHook
 * @property {Object} valoresFormulario
 * @property {Object} errosFormulario
 * @property {Function} onChangeForm
 * @property {Function} onSubmitForm
 */

/**
 * Hook para validar formulario
 * @param {Object} initialState - Valores iniciais dos campos do formulario
 * @param {Function(Object): Object} fnValidarFormulario - Funcao para validar o formulario
 * @param {Function(*)} callback - Funcao callback que sera executada caso o formulario esteja valido
 * @return {StatesEFuncoesHook} - States e referencias das funcoes do hook
 * */
export default function useValidacao(
  initialState,
  fnValidarFormulario,
  callback
) {
  const [valoresFormulario, setValoresFormulario] = useState(initialState);
  const [errosFormulario, setErrosFormulario] = useState({});
  const [hasClickedSubmitForm, setHasClickedSubmitForm] = useState(false);

  useEffect(() => {
    if (hasClickedSubmitForm) {
      const hasErros = !objetoEstaVazio(errosFormulario);

      if (!hasErros) {
        callback();
      }

      setHasClickedSubmitForm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errosFormulario]);

  function onChangeForm(e) {
    setValoresFormulario({
      ...valoresFormulario,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmitForm(e) {
    e.preventDefault();
    const errosDaValidacao = fnValidarFormulario(valoresFormulario);
    setErrosFormulario(errosDaValidacao);
    setHasClickedSubmitForm(true);
  }

  /*
  // Para validacao em tempo real 
  function onBlurForm() {
    const errosDaValidacao = fnValidarFormulario(valoresFormulario);
    setErrosFormulario(errosDaValidacao);
  }
  */

  return {
    valoresFormulario,
    errosFormulario,
    onChangeForm,
    onSubmitForm,
    // Para validacao em tempo real descomentar a linha abaixo
    // onBlurForm,
  };
}
