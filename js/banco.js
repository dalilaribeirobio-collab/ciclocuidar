// ============================================
// CicloCuidar — banco.js
// Armazenamento local (IndexedDB) — nada sai do aparelho
// ============================================

const NOME_BANCO = "croclocuidar";
const VERSAO_BANCO = 2; // v2: loja "config" para o PIN personalizado

const LOJAS = ["ciclos", "sintomas", "violentometro", "config"];

let banco = null;

function abrirBanco() {
  return new Promise((resolver, rejeitar) => {
    if (banco) return resolver(banco);
    const req = indexedDB.open(NOME_BANCO, VERSAO_BANCO);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      LOJAS.forEach((nome) => {
        if (!db.objectStoreNames.contains(nome)) {
          // "config" usa chave própria ("pin"); as outras usam id automático
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

// ---------- Operações genéricas ----------

async function salvar(loja, objeto) {
  const db = await abrirBanco();
  return new Promise((resolver, rejeitar) => {
    const tx = db.transaction(loja, "readwrite");
    if (loja === "config") {
      tx.objectStore(loja).put(objeto); // put: cria ou atualiza pela chave
    } else {
      tx.objectStore(loja).add(objeto);
    }
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
  return new Promise((resolver, rejeitar) => {
    const tx = db.transaction(loja, "readwrite");
    tx.objectStore(loja).delete(id);
    tx.oncomplete = () => resolver(true);
    tx.onerror = (e) => rejeitar(e.target.error);
  });
}

// Apaga TUDO (para a exportação futura, futura "apagar minha conta")
async function apagarTudo() {
  const db = await abrirBanco();
  return new Promise((resolver) => {
    const tx = db.transaction(LOJAS, "readwrite");
    LOJAS.forEach((nome) => tx.objectStore(nome).clear());
    tx.oncomplete = () => resolver(true);
  });
}
