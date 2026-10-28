const SINTOMAS = ["Cólica", "Dor de cabeça", "Humor baixo", "Ansiedade",
                  "Insônia", "Energia boa", "Secreção (janela fértil)", "Dor nas relações"];

function montarSintomas() {
  const div = document.getElementById("lista-sintomas");
  div.innerHTML = SINTOMAS.map((s, i) =>
    `<label><input type="checkbox" id="s${i}"> ${s}</label>`).join("");
}

async function registrarMenstruacao() {
  const data = document.getElementById("data-menstruacao").value;
  if (!data) return;
  await salvar("ciclo", { data: data });
  await calcularPrevisao();
}

async function calcularPrevisao() {
  const registros = (await listar("ciclo")).sort((a, b) => a.data.localeCompare(b.data));
  const div = document.getElementById("previsao");
  if (registros.length < 2) {
    div.innerHTML = "Registre pelo menos <b>2 ciclos</b> para receber estimativas.";
    return;
  }
  // Média dos intervalos, descartando valores fora do fisiológico (15–60 dias)
  const intervalos = [];
  for (let i = 1; i < registros.length; i++) {
    const dias = (new Date(registros[i].data) - new Date(registros[i-1].data)) / 86400000;
    if (dias > 15 && dias < 60) intervalos.push(dias);
  }
  if (!intervalos.length) { div.innerHTML = "Ciclos muito irregulares — converse com a UBS."; return; }
  const media = intervalos.reduce((a, b) => a + b) / intervalos.length;
  const ultima = new Date(registros[registros.length - 1].data);
  const proxima = new Date(ultima.getTime() + media * 86400000);
  div.innerHTML = `Seu ciclo médio: <b>${Math.round(media)} dias</b>.<br>
    Próxima menstruação (estimativa): <b>${proxima.toLocaleDateString("pt-BR")}</b>.
    <p class="aviso" style="font-size:14px">⚠️ Estimativa simples — <b>não</b> é método
    contraceptivo e não substitui avaliação médica.</p>`;
}

async function salvarSintomas() {
  const hoje = new Date().toISOString().slice(0, 10);
  const marcados = SINTOMAS.filter((s, i) => document.getElementById("s" + i).checked);
  await salvar("dias", { data: hoje, sintomas: marcados });
  document.querySelectorAll("#lista-sintomas input").forEach(c => c.checked = false);
  alert("Dia salvo no seu aparelho. ✔");
  // Sinais de alerta da cartilha Fiocruz: dor nas relações pode sugerir endometriose
  if (marcados.includes("Dor nas relações")) {
    alert("Dor durante relações sexuais é um sintoma de endometriose. Vale conversar com a UBS — o diagnóstico demora em média 7 anos, e registrar seus sintomas ajuda a encurtar esse caminho.");
  }
}
