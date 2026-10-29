// ---- Modo seguro (PIN em sessionStorage: some ao fechar o app) ----
const PIN_PADRAO = "1234"; // trocar por PIN escolhido pela usuária no onboarding

function verificarPin() {
  if (document.getElementById("pin").value === PIN_PADRAO) {
    sessionStorage.setItem("sessao", "ok");
    entrar();
  } else {
    document.getElementById("erro-pin").hidden = false;
  }
}
function entrar() {
  document.getElementById("tela-pin").hidden = true;
  document.getElementById("app").hidden = false;
  calcularPrevisao();
}
function sairRapido() {
  sessionStorage.removeItem("sessao");
  document.getElementById("app").hidden = true;
  document.getElementById("tela-pin").hidden = false;
  document.getElementById("pin").value = "";
  location.hash = "";
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
