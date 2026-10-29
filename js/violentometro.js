// CicloCuidar — violentometro.js (educativo, sem pontuação)
const PERGUNTAS_VIO = [
  { texto: "Quis saber onde você está o tempo todo", dominio: "cuidado" },
  { texto: "Criticou seu jeito de se vestir", dominio: "cuidado" },
  { texto: "Criticou seu corpo ou sua aparência", dominio: "cuidado" },
  { texto: "Ficou com ciúme de seus amigos e familiares", dominio: "cuidado" },
  { texto: "Criticou ou menosprezou suas opiniões", dominio: "cuidado" },
  { texto: "Fez piadas que te constrangeram na frente de outros", dominio: "cuidado" },
  { texto: "Cobrou que você fizesse apenas o que ele(a) queria", dominio: "cuidado" },
  { texto: "Vigiou ou monitorou suas redes e mensagens", dominio: "cuidado" },
  { texto: "Decidiu como você deveria gastar seu dinheiro", dominio: "cuidado" },
  { texto: "Gritou com você quando estava irritado(a)", dominio: "reakao" },
  { texto: "Bateu porta ou quebrou objetos em momentos de raiva", dominio: "reakao" },
  { texto: "Ameaçou se machucar se você o(a) deixasse", dominio: "reakao" },
  { texto: "Culpou você por seus próprios comportamentos", dominio: "reakao" },
  { texto: "Te chamou por apelidos que te humilhavam", dominio: "reakao" },
  { texto: "Te proibiu de sair ou ver amigos e familiares", dominio: "reakao" },
  { texto: "Reagiu com desprezo quando você expressou sentimentos", dominio: "reakao" },
  { texto: "Controlou o uso do seu celular ou o privou dele", dominio: "reakao" },
  { texto: "Empurrou ou segurou você com força durante uma briga", dominio: "reakao" },
  { texto: "Te ameaçou fisicamente, com objeto ou arma", dominio: "perigo" },
  { texto: "Bateu, chutou ou agrediu você fisicamente", dominio: "perigo" },
  { texto: "Forçou relações sexuais sem seu consentimento", dominio: "perigo" },
  { texto: "Ameaçou machucar seus filhos ou familiares", dominio: "perigo" },
  { texto: "Te prendeu em casa ou impediu que você pedisse ajuda", dominio: "perigo" },
  { texto: "Ameaçou você com faca, arma ou outro objeto", dominio: "perigo" },
  { texto: "Estrangulou ou sufocou você", dominio: "perigo" },
  { texto: "Descumpriu medida protetiva de afastamento", dominio: "perigo" },
  { texto: "Só para de te agredir quando outra pessoa aparece", dominio: "perigo" }
];

const INFO_DOMINIO = {
  cuidado: { titulo: "Sinais de Cuidado Disfarçado", classe: "dom-cuidado",
    orientacao: "Comportamentos de controle e vigilância costumam ser apresentados como 'ciúme' ou 'zelo', mas minam a autonomia aos poucos. Reconhecê-los cedo é uma forma poderosa de prevenção." },
  reakao: { titulo: "Sinais de Reação Agressiva", classe: "dom-reakao",
    orientacao: "Gritos, ameaças de autodano e isolamento social indicam escalada. Nenhuma briga justifica agressão — nem física, nem verbal. Você não merece isso." },
  perigo: { titulo: "Sinais de Perigo Real", classe: "dom-perigo",
    orientacao: "Agressão física, ameaça com arma, estrangulamento e descumprimento de medida protetiva são crime e colocam sua vida em risco. Procure ajuda com segurança — você não precisa enfrentar isso sozinha." }
};

function montarViolentometro() {
  document.getElementById("perguntas-vio").innerHTML = PERGUNTAS_VIO.map((p) =>
    '<label class="' + INFO_DOMINIO[p.dominio].classe + '">' +
    '<input type="checkbox" data-dominio="' + p.dominio + '"> ' + p.texto + "</label>"
  ).join("");
}

async function verResultadoVio() {
  const box = document.getElementById("resultado-vio");
  const marcados = Array.from(document.querySelectorAll("#perguntas-vio input:checked"));
  await salvar("violentometro", {
    data: new Date().toISOString().slice(0, 10),
    reconheceu: marcados.map((i) => i.dataset.dominio)
  });

  if (marcados.length === 0) {
    box.innerHTML =
      "<p>Você não marcou nenhum comportamento. Conhecer esses sinais também é proteção — para você e para as mulheres ao seu redor. 💜</p>" +
      '<p class="fonte">Se algum dia reconhecer qualquer um deles, saiba que há ajuda disponível.</p>';
    box.hidden = false;
    return;
  }

  const contagem = { cuidado: 0, reakao: 0, perigo: 0 };
  marcados.forEach((i) => contagem[i.dataset.dominio]++);

  let html = "<h3>O que reconheceu</h3>" +
    "<p>Reconhecer não significa estar sem saída — significa enxergar com clareza. Isso é o primeiro passo.</p>";

  if (contagem.perigo > 0) {
    html += '<div class="card ' + INFO_DOMINIO.perigo.classe + '"><h3>⚠️ ' +
      INFO_DOMINIO.perigo.titulo + "</h3><p>" + INFO_DOMINIO.perigo.orientacao +
      '</p><a class="btn-180" href="tel:180">Ligar 180 agora</a></div>';
  }
  if (contagem.reakao > 0) {
    html += '<div class="card ' + INFO_DOMINIO.reakao.classe + '"><h3>' +
      INFO_DOMINIO.reakao.titulo + "</h3><p>" + INFO_DOMINIO.reakao.orientacao + "</p></div>";
  }
  if (contagem.cuidado > 0) {
    html += '<div class="card ' + INFO_DOMINIO.cuidado.classe + '"><h3>' +
      INFO_DOMINIO.cuidado.titulo + "</h3><p>" + INFO_DOMINIO.cuidado.orientacao + "</p></div>";
  }

  html += '<p class="fonte">Converse gratuitamente com a <strong>Central de Atendimento à Mulher — 180</strong>, 24h. Em risco imediato, ligue <strong>190</strong>.</p>';
  box.innerHTML = html;
  box.hidden = false;
}
