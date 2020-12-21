import { isStringUrlValida } from './Helper';

// validarFormCriarConta.js
export default (valores) => {
  const erros = {};

  if (!valores.nome) {
    erros.nome = 'O campo nome é obrigatório';
  }

  if (!valores.empresa) {
    erros.empresa = 'O campo empresa é obrigatório';
  }

  if (!valores.url) {
    erros.url = 'O campo URL é obrigatório';
  } else if (!isStringUrlValida(valores.url)) {
    erros.url = 'URL inválida';
  }

  if (!valores.descricao) {
    erros.descricao = 'Insira uma descrição para o produto';
  }

  return erros;
};
