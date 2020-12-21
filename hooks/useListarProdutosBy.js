import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

export default function useListarProdutosBy(parametroOrdenacao) {
  const { firebase } = useContext(FirebaseContext);

  const [listaDeProdutos, setListaDeProdutos] = useState([]);

  function snapshotHandler(snapshot) {
    const listaDocumentos = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    setListaDeProdutos(listaDocumentos);
  }

  async function getListaDeProdutos() {
    await firebase.db
      .collection('produtos')
      .orderBy(parametroOrdenacao, 'desc')
      .onSnapshot(snapshotHandler);
  }

  useEffect(() => {
    getListaDeProdutos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return listaDeProdutos;
}
