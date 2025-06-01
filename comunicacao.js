import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js';
import { getDatabase, ref, push, set, onValue } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyBedvMd0Vo2Yv8_5fA3vQc_nVs0Y4R01A4",
  authDomain: "bancodados-7e614.firebaseapp.com",
  databaseURL: "https://bancodados-7e614-default-rtdb.firebaseio.com",
  projectId: "bancodados-7e614",
  storageBucket: "bancodados-7e614.appspot.com",
  messagingSenderId: "353343280701",
  appId: "1:353343280701:web:38e5e1e330d23f0162fc54",
  measurementId: "G-6F90TB8MK8"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referencia = ref(database, 'consumo');

let ultimoNumero = 0;
onValue(referencia, (snapshot) => {
  const dados = snapshot.val();

  if (dados) {
    ultimoNumero = Math.max(...Object.values(dados).map(d => d.num ?? 0));
  } else {
    ultimoNumero = 0;
  }
});

// Função para salvar um novo dado
export async function SalvarFirebase(consumoTotal) {
  try {
    const novaRef = push(referencia);
    const novoNumero = ultimoNumero + 1;

    await set(novaRef, {
      consumo: consumoTotal,
      num: novoNumero,
      timestamp: Date.now()
    });

    console.log("Dados salvos com sucesso!");
    ultimoNumero = novoNumero; 
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
  }
}
