// CicloCuidar — app.js

// ---------- PIN ----------
async function salvarPin(pin) {
  const hash = btoa(unescape(encodeURIComponent(pin.split("").reverse().join("") + "#cc")));
  await salvar("config", { chave: "pin", valor: hash });
}

async function obterPinSalvo() {
  const itens = await listar("config");
  const pin = itens.find((i) => i.chave === "pin");
  return pin && pin.valor ? pin.valor : null;
}

function hashIgual(pinDigitado, hashSalvo) {
  return btoa(unescape(encodeURIComponent(pinDigitado.split("").reverse().join("") + "#cc"))) === hashSalvo;
}

function entrar() {
  sessionStorage.setItem("sessao", "ok");
  document.getElementById("tela-pin").hidden = true;
  document.getElementById("tela-criar-pin").hidden = true;
  document.getElementById("app").hidden = false;
  document.getElementById("erro-pin").hidden = true;
  document.getElementById("erro-criar").hidden = true;
  calcularPrevisao();
  atualizarProgressoQuiz();
}

async function criarPin() {
  const novo = document.getElementById("novo-pin").value;
  const confirmar = document.getElementById("confirmar-pin").value;
  const erro = document.getElementById("erro-criar");
  if (!/^\d{4}$/.test(novo)) { erro.textContent = "O PIN deve ter exatamente 4 dígitos."; erro.hidden = false; return; }
  if (novo !== confirmar) { erro.textContent = "Os PINs não coincidem. Digite novamente."; erro.hidden = false; return; }
  if (/^(\d)\1{3}$/.test(novo) || novo === "1234") { erro.textContent = "Escolha um PIN menos previsível (não 0000, 1111, 1234…)."; erro.hidden = false; return; }
  await salvarPin(novo);
  entrar();
}

async function verificarPin() {
  const hash = await obterPinSalvo();
  if (hash && hashIgual(document.getElementById("pin").value, hash)) {
    entrar();
  } else {
    document.getElementById("erro-pin").hidden = false;
    document.getElementById("pin").value = "";
  }
}

function mostrarTrocarPin() {
  if (confirm("Para redefinir o PIN, você criará um novo agora. Seus registros NÃO são perdidos. Continuar?")) {
    salvar("config", { chave: "pin", valor: null }).then(() => {
      sessionStorage.removeItem("sessao");
      location.reload();
    });
  }
}

function sairRapido() {
  sessionStorage.removeItem("sessao");
  document.getElementById("app").hidden = true;
  document.getElementById("pin").value = "";
  obterPinSalvo().then((hash) => {
    document.getElementById(hash ? "tela-pin" : "tela-criar-pin").hidden = false;
  });
}

// ---------- Abas ----------
function mostrarAba(nome) {
  ["ciclo", "vio", "biblioteca", "quiz"].forEach((n) => {
    const el = document.getElementById("aba-" + n);
    if (el) el.hidden = n !== nome;
  });
  document.querySelectorAll("nav .aba").forEach((b) =>
    b.classList.toggle("ativa", b.dataset.aba === nome));
}

// ---------- Biblioteca ----------
const ARTIGOS = [
  { titulo: "Conheça seu ciclo menstrual", resumo: "Fases, duração normal e sinais de alerta.",
    corpo: "O ciclo menstrual varia de 21 a 35 dias. Conhecer o seu padrão é a base do autocuidado. Sangramento fora do período esperado, cólicas incapacitantes ou ciclos muito irregulares merecem avaliação profissional." },
  { titulo: "Prevenção do câncer do colo do útero", resumo: "Papanicolau: quando e por quê.",
    corpo: "O Papanicolau deve ser feito a partir dos 25 anos (ou início da vida sexual), conforme orientação profissional. Vacinar contra o HPV é a prevenção mais eficaz." },
  { titulo: "Câncer de mama: autoexame e mamografia", resumo: "Sinais de alerta e rastreamento.",
    corpo: "Observe alterações no tamanho, forma e textura das mamas e procure avaliação médica. A mamografia de rastreamento é indicada a partir dos 40 anos." },
  { titulo: "Planejamento reprodutivo", resumo: "Métodos contraceptivos: uma visão geral.",
    corpo: "Existem métodos hormonais, de barreira e definitivos. A escolha deve ser feita com orientação profissional, considerando sua saúde e seu momento de vida." },
  { titulo: "ISTs: proteger é cuidar de si", resumo: "Sinais, prevenção e onde buscar atendimento.",
    corpo: "Coceira, corrimento com odor forte, feridas ou dor ao urinar são sinais de alerta. O preservativo previne ISTs. O tratamento no SUS é gratuito e confidencial." },
  { titulo: "Climatério e menopausa", resumo: "O que muda no corpo e como aliviar os sintomas.",
    corpo: "A queda hormonal traz ondas de calor, alterações de sono e humor. Atividade física, alimentação e acompanhamento médico regular ajudam muito." }
];

function montarBiblioteca() {
  document.getElementById("lista-artigos").innerHTML = ARTIGOS.map((a, i) =>
    '<button class="aba" style="display:block; margin:8px 0; text-align:left" onclick="abrirArtigo(' + i + ')">' +
    a.titulo + "<br><small style='opacity:.75'>" + a.resumo + "</small></button>"
  ).join("");
}

function abrirArtigo(i) {
  const a = ARTIGOS[i];
  document.getElementById("lista-artigos").hidden = true;
  document.getElementById("artigo").innerHTML =
    '<button class="btn-link" onclick="voltarBiblioteca()">← Voltar</button>' +
    "<h3>" + a.titulo + "</h3><p>" + a.corpo + "</p>";
  document.getElementById("artigo").hidden = false;
}

function voltarBiblioteca() {
  document.getElementById("artigo").hidden = true;
  document.getElementById("lista-artigos").hidden = false;
}

// ---------- Inicialização ----------
window.addEventListener("load", () => {
  montarSintomas();
  montarViolentometro();
  montarBiblioteca();
  montarQuizzes();

  document.querySelectorAll("nav .aba").forEach((b) =>
    b.addEventListener("click", () => mostrarAba(b.dataset.aba)));

  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");

  obterPinSalvo().then((hash) => {
    if (sessionStorage.getItem("sessao") === "ok") {
      document.getElementById("app").hidden = false;
      calcularPrevisao();
      atualizarProgressoQuiz();
    } else {
      document.getElementById(hash ? "tela-pin" : "tela-criar-pin").hidden = false;
    }
  });
});
