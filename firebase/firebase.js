import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from './config';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  async registrarUsuario(nome, email, senha) {
    const novoRegistro = await this.auth.createUserWithEmailAndPassword(
      email,
      senha
    );

    return novoRegistro.user.updateProfile({ displayName: nome });
  }

  async iniciarSessaoUsuario(email, senha) {
    return this.auth.signInWithEmailAndPassword(email, senha);
  }

  async encerrarSessao() {
    await this.auth.signOut();
  }

  async getProduto(idProduto) {
    const queryGetProduto = await this.db.collection('produtos').doc(idProduto);

    const produtoEncontrado = await queryGetProduto.get();

    if (!produtoEncontrado.exists) {
      return null;
    }

    return produtoEncontrado.data();
  }

  async setVotoDeUsuario(idUsuario, idProduto) {
    const produtoEncontrado = await this.getProduto(idProduto);

    if (produtoEncontrado) {
      const novoTotalDeVotos = produtoEncontrado.votos + 1;

      try {
        await this.db
          .collection('produtos')
          .doc(idProduto)
          .update({
            votos: novoTotalDeVotos,
            listaUsuariosQueVotaram: [
              ...produtoEncontrado.listaUsuariosQueVotaram,
              idUsuario,
            ],
          });

        return novoTotalDeVotos;
      } catch (err) {
        console.log(err);
      }
    }

    return false;
  }
}

const firebase = new Firebase();

export default firebase;
