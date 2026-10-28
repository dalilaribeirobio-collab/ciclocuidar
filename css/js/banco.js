// Abre o banco local (IndexedDB) — promessa única reutilizada
let _db = null;
function abrirBanco() {
  if (_db) return Promise.resolve(_db);
  return new Promise((resolve, reject) => {
    const pedido = indexedDB.open("croclocuidar", 1);
    pedido.onupgradeneeded = (e) => {
      const db = e.target.result;
      db.createObjectStore("ciclo", { keyPath: "data" });
      db.createObjectStore("dias", { keyPath: "data" });
      db.createObjectStore("config", { keyPath: "chave" });
    };
    pedido.onsuccess = (e) => { _db = e.target.result; resolve(_db); };
    pedido.onerror = (e) => reject(e);
  });
}

async function salvar(loja, objeto) {
  const db = await abrirBanco();
  return new Promise((res, rej) => {
    const tx = db.transaction(loja, "readwrite");
    tx.objectStore(loja).put(objeto);
    tx.oncomplete = res; tx.onerror = rej;
  });
}

async function listar(loja) {
  const db = await abrirBanco();
  return new Promise((res, rej) => {
    const tx = db.transaction(loja, "readonly");
    const pedido = tx.objectStore(loja).getAll();
    pedido.onsuccess = () => res(pedido.result);
    pedido.onerror = rej;
  });
}
