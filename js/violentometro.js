// Itens do Violentômetro organizados nos 3 domínios (Gomes et al., 2026 — TJPB 2023)
const VIOLENTOMETRO = {
  cuidado: {
    titulo: "Domínio de Cuidado (atenção!)",
    itens: ["Piadas ofensivas", "Chantagear", "Mentir/enganar", "Ignorar/dar um gelo",
            "Ciúmes", "Culpar", "Desqualificar", "Ridicularizar/ofender",
            "Humilhar em público", "Intimidar/ameaçar", "Controlar/proibir"]
  },
  reacao: {
    titulo: "Domínio de Reação",
    itens: ["Destruir bens pessoais", "Machucar", "Tapinhos/pancadinhas",
            "Brincar de bater", "Beliscar/arranhar", "Empurrar", "Dar tapas"]
  },
  perigo: {
    titulo: "Domínio de Perigo Real",
    itens: ["Chutar", "Confinar/prender", "Ameaçar com objetos", "Ameaçar com armas",
            "Ameaçar de morte", "Forçar relação sexual", "Abuso sexual",
            "Violentar", "Mutilar"]
  }
};

function montarViolentometro() {
  const div = document.getElementById("perguntas-vio");
  let html = "";
  for (const [chave, dom] of Object.entries(VIOLENTOMETRO)) {
    html += `<h3>${dom.titulo}</h3>`;
    html += dom.itens.map((item, i) =>
      `<label class="${chave === "cuidado" ? "dom-cuidado" : chave === "reacao" ? "dom-reakao" : "dom-perigo"}">
        <input type="checkbox" class="vio" data-dom="${chave}"> Ele(a) ${item.toLowerCase()} com você?</label>`).join("");
  }
  div.innerHTML = html;
}

function verResultadoVio() {
  const marcadas = { cuidado: 0, reacao: 0, perigo: 0 };
  document.querySelectorAll(".vio:checked").forEach(c => marcadas[c.dataset.dom]++);
  let msg = "";
  if (marcadas.perigo > 0) {
    msg = "Você marcou situações de <b>Perigo Real</b>. Isso é grave e você não merece viver assim. " +
          "<b>Ligue 180 agora</b> ou procure a UBS/CRAS mais próximo — a rede existe para acolher você.";
  } else if (marcadas.reacao > 0) {
    msg = "Você marcou situações do <b>Domínio de Reação</b>. A violência tende a escalar com o tempo. " +
          "Conversar com um profissional da UBS pode ajudar antes que piore.";
  } else if (marcadas.cuidado > 0) {
    msg = "Você marcou situações que parecem pequenas — mas a pesquisa mostra que a " +
          "<b>violência psicológica é o degrau inicial</b> da mesma escada que termina em violência física. " +
          "Ciúme e controle não são prova de amor.";
  } else {
    msg = "Nenhuma situação marcada. Se algo mudar na sua relação, volte aqui — este espaço é seu.";
  }
  document.getElementById("resultado-vio").innerHTML =
    msg + `<p class="fonte">Isso é educação, não diagnóstico. Para acolhimento: 180, UBS ou CRAS.</p>`;
}
