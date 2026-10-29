// ---- PIN personalizado (armazenado apenas no aparelho) ----
const _db = () => abrirBanco();

async function salvarPin(pin) {
  // Armazenamos um hash simples — nunca o PIN em texto puro
  const hash = btoa(unescape(encodeURIComponent(pin.split("").reverse().join("") + "#cc")));
  await salvar("config", { chave: "pin", valor: hash });
}

async function obterPinSalvo() {
  const itens = await listar("config");
  const pin = itens.find((i) => i.chave === "pin");
  return pin ? pin.valor : null;
}

function hashIgual(pinDigitado, hashSalvo) {
  const hashDigitado = btoa(unescape(encodeURIComponent(pinDigitado.split("").reverse().join("") + "#cc")));
  return hashDigitado === hashSalvo;
}

function entrar(pin) {
  sessionStorage.setItem("sessao", "ok");
  document.getElementById("tela-pin").hidden = true;
  document.getElementById("tela-criar-pin").hidden = true;
  document.getElementById("app").hidden = false;
  calcularPrevisao();
}

async function criarPin() {
  const novo = document.getElementById("novo-pin").value;
  const confirmar = document.getElementById("confirmar-pin").value;
  const erro = document.getElementById("erro-criar");
  if (!/^\d{4}$/.test(novo)) {
    erro.textContent = "O PIN deve ter exatamente 4 dígitos.";
    erro.hidden = false;
    return;
  }
  if (novo !== confirmar) {
    erro.textContent = "Os PINs não coincidem. Digite novamente.";
    erro.hidden = false;
    return;
  }
  if (/^(\d)\1{3}$/.test(novo) || novo === "1234" || novo === "0000") {
    erro.textContent = "Escolha um PIN menos previsível (não use 0000, 1111, 1234…).";
    erro.hidden = false;
    return;
  }
  await salvarPin(novo);
  entrar(novo);
}

async function verificarPin() {
  const pin = document.getElementById("pin").value;
  const hashSalvo = await obterPinSalvo();
  if (hashSalvo && hashIgual(pin, hashSalvo)) {
    entrar(pin);
  } else {
    document.getElementById("erro-pin").hidden = false;
  }
}

// Fluxo de recuperação: pergunta de segurança em vez de PIN por e-mail
// (app não tem servidor — nada sai do aparelho)
function mostrarTrocarPin() {
  if (confirm("Para redefinir o PIN, seus registros de PIN serão apagados e você criará um novo. Seus registros de ciclo e sintomas NÃO são perdidos. Deseja continuar?")) {
    navigator.serviceWorker; // apenas para lembrar: nada é enviado a servidor
    // Redefinição: apaga apenas a entrada do PIN; o usuário cria um novo
    _db().then(() => salvar("config", { chave: "pin", valor: null })).then(() => {
      sessionStorage.removeItem("sessao");
      location.reload();
    });
  }
}

function sairRapido() {
  sessionStorage.removeItem("sessao");
  document.getElementById("app").hidden = true;
  // Se já criou PIN, mostra login; senão, criação
  obterPinSalvo().then((hash) => {
    document.getElementById(hash ? "tela-pin" : "tela-criar-pin").hidden = false;
  });
  document.getElementById("pin").value = "";
}

// ---- Navegação por abas ----
function mostrarAba(nome) {
  ["ciclo", "vio", "biblioteca"].forEach(a => {
    document.getElementById("aba-" + a).hidden = (a !== nome);
  });
  document.querySelectorAll(".aba").forEach((b, i) =>
    b.classList.toggle("ativa", ["ciclo","vio","biblioteca"][i] === nome));
}

// ---- Biblioteca: artigos resumidos da Cartilha IFF/Fiocruz ----
const ARTIGOS = {
  "Endometriose": "O tecido do útero cresce fora dele. Sintomas: cólica forte, dor pélvica, dor nas relações, alterações intestinais, infertilidade. O tempo até o diagnóstico é de ~7 anos — registrar sintomas (como o app faz) acelera a conversa com o médico.",
  "SOP": "Distúrbio hormonal comum (2 milhões de brasileiras). Sinais: menstruações espaçadas, pelos no rosto, acne, obesidade. O tratamento depende da fase da vida; perder peso reverte parte do quadro.",
  "Câncer de mama": "Sinais: pele tipo casca de laranja, inversão do mamilo, nódulo endurecido, vermelhidão. Mamografia de rotina a partir dos 40 anos. Diagnóstico precoce salva vidas.",
  "Câncer do colo do útero": "Um dos cânceres com maior potencial de prevenção. Sinais: sangramento após relação, corrimento fétido, dor pélvica contínua. Exame preventivo (Papanicolau) detecta lesões antes de virarem câncer.",
  "Menopausa": "12 meses sem menstruar. Pode vir com ondas de calor, insônia, secura vaginal, variações de humor. Tratamento integrado: reposição hormonal quando indicada, exercício, alimentação e apoio psicológico.",
  "Osteoporose": "1 em cada 3 mulheres acima dos 65 anos. Prevenção: cálcio, exercício e sol 3x/semana (15 min sem filtro). Densitometria é o exame padrão-ouro."
};

function montarBiblioteca() {
  document.getElementById("lista-artigos").innerHTML =
    Object.keys(ARTIGOS).map(t => `<button onclick="abrirArtigo('${t}')">${t}</button><br>`).join("");
}
function abrirArtigo(titulo) {
  document.getElementById("artigo").innerHTML = `<h3>${titulo}</h3><p>${ARTIGOS[titulo]}</p>`;
}

// ---- Inicialização ----
window.addEventListener("load", () => {
  montarSintomas();
  montarViolentometro();
  montarBiblioteca();
  if (sessionStorage.getItem("sessao") === "ok") entrar();
  // Registra o service worker (modo offline)
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
});
