import { isStringEmailValida } from './Helper';

// validarFormCriarConta.js
export default (valores) => {
  const erros = {};

  if (!valores.nome) {
    erros.nome = 'O campo nome é obrigatório';
  }

  if (!valores.email) {
    erros.email = 'O campo email é obrigatório';
  } else if (!isStringEmailValida(valores.email)) {
    erros.email = 'Endereço de email inválido';
  }

  if (!valores.senha) {
    erros.senha = 'O campo senha é obrigatório';
  } else if (valores.senha.length < 6) {
    erros.senha = 'A senha deve ter no mínimo 6 caracteres';
  }

  return erros;
};
