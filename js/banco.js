// CicloCuidar — banco.js (IndexedDB, 100% local)
const NOME_BANCO = "croclocuidar";
const VERSAO_BANCO = 1;
const LOJAS = ["ciclos", "sintomas", "violentometro", "config", "quiz"];

let banco = null;

function abrirBanco() {
  return new Promise((resolver, rejeitar) => {
    if (banco) return resolver(banco);
    const req = indexedDB.open(NOME_BANCO, VERSAO_BANCO);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      LOJAS.forEach((nome) => {
        if (!db.objectStoreNames.contains(nome)) {
          if (nome === "config") {
            db.createObjectStore(nome, { keyPath: "chave" });
          } else {
            db.createObjectStore(nome, { keyPath: "id", autoIncrement: true });
          }
        }
      });
    };
    req.onsuccess = (e) => { banco = e.target.result; resolver(banco); };
    req.onerror = (e) => rejeitar(e.target.error);
  });
}

async function salvar(loja, objeto) {
  const db = await abrirBanco();
  return new Promise((resolver, rejeitar) => {
    const tx = db.transaction(loja, "readwrite");
    if (loja === "config") { tx.objectStore(loja).put(objeto); }
    else { tx.objectStore(loja).add(objeto); }
    tx.oncomplete = () => resolver(true);
    tx.onerror = (e) => rejeitar(e.target.error);
  });
}

async function atualizar(loja, id, objeto) {
  const db = await abrirBanco();
  return new Promise((resolver, rejeitar) => {
    const tx = db.transaction(loja, "readwrite");
    const store = tx.objectStore(loja);
    objeto.id = id;
    store.put(objeto);
    tx.oncomplete = () => resolver(true);
    tx.onerror = (e) => rejeitar(e.target.error);
  });
}

async function listar(loja) {
  const db = await abrirBanco();
  return new Promise((resolver, rejeitar) => {
    const tx = db.transaction(loja, "readonly");
    const req = tx.objectStore(loja).getAll();
    req.onsuccess = () => resolver(req.result);
    req.onerror = (e) => rejeitar(e.target.error);
  });
}

async function apagar(loja, id) {
  const db = await abrirBanco();
  return new Promise((resolver) => {
    const tx = db.transaction(loja, "readwrite");
    tx.objectStore(loja).delete(id);
    tx.oncomplete = () => resolver(true);
  });
}
