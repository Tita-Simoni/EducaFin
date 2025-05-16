// Página principal
function exibirResumo() {
    const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
  
    let totalReceitas = 0;
    let totalDespesas = 0;
  
    transacoes.forEach(t => {
      if (t.tipo === "receita") totalReceitas += t.valor;
      else totalDespesas += t.valor;
    });
  
    const saldo = totalReceitas - totalDespesas;
  
    document.getElementById("totalReceitas").textContent = totalReceitas.toFixed(2);
    document.getElementById("totalDespesas").textContent = totalDespesas.toFixed(2);
    document.getElementById("saldo").textContent = saldo.toFixed(2);
  }

// Página de Cadastro
// Salvar receita ou despesa
function salvarTransacao(event) {
    event.preventDefault();
    console.log("Função salvarTransacao foi chamada!");
  
    const tipo = document.getElementById("tipo").value;
    const categoria = document.getElementById("categoria").value;
    const descricao = document.getElementById("descricao").value;
    const data = document.getElementById("data").value;
    const valor = parseFloat(document.getElementById("valor").value);
  
    const transacao = { 
      tipo, 
      categoria, 
      descricao, 
      data,
      valor      
    };
  
    let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
    transacoes.push(transacao);
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  
    const msg = document.getElementById("mensagem");
    msg.textContent = "Transação salva com sucesso!";
    msg.style.display = "block";

    setTimeout(() => {
      msg.style.display = "none"; 
    }, 3000);

  }
  
  // Exibir Flxuo de Caixa
  function exibirFluxo() {
    const tabela = document.querySelector("#tabelaTransacoes tbody");
    if (!tabela) return;

   const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
    tabela.innerHTML = "";

    transacoes.forEach((t, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${t.tipo}</td>
        <td>${t.categoria || "-"}</td>
        <td>${t.descricao || "-"}</td>
        <td>${t.data}</td>
        <td>R$ ${t.valor.toFixed(2)}</td>     
        <td>
          <button onclick="excluirTransacao(${index})">Excluir</button>
        </td>   
      `;
      tabela.appendChild(tr);
      });
  }

  // Excluir Transação
  function excluirTransacao(index) {
    let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];
    transacoes.splice(index, 1);
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
    exibirFluxo(); // atualiza a tabela
  }
    
    
  // Página Metas  
  // Salvar meta
  function salvarMeta(event) {
    event.preventDefault();
  
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const prazo = document.getElementById("prazo").value;
    const valor = parseFloat(document.getElementById("valorMeta").value);
    const data = document.getElementById("dataLimite").value;
  
    const meta = { 
      titulo, 
      descricao,
      prazo,
      valor, 
      data 
    };
  
    let metas = JSON.parse(localStorage.getItem("metas")) || [];
    metas.push(meta);
    localStorage.setItem("metas", JSON.stringify(metas));
  
    alert("Meta salva com sucesso!");
    carregarMetas();
    event.target.reset();
  }
  
  // Carregar metas
  function carregarMetas() {
    const tabela = document.querySelector("#tabelaMetas tbody");
    if (!tabela) return;

   const metas = JSON.parse(localStorage.getItem("metas")) || [];
    tabela.innerHTML = "";

    metas.forEach((meta, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${meta.titulo}</td>
        <td>${meta.descricao || "-"}</td>
        <td>${meta.prazo || "-"}</td>
        <td>R$ ${meta.valor.toFixed(2)}</td>
        <td>${meta.data}</td>
        <td>
          <button onclick="excluirMeta(${index})">Excluir</button>
        </td>   
      `;
      tabela.appendChild(tr);
      });
  }

  // Excluir Transação
  function excluirMeta(index) {
    let metas = JSON.parse(localStorage.getItem("metas")) || [];
    metas.splice(index, 1);
    localStorage.setItem("metas", JSON.stringify(metas));
    carregarMetas(); // atualiza a tabela
  }


  // Página Calculadora
  function mostrarFormulario(tipo) {
    const botoes = document.querySelectorAll(".aba-menu");
    const blocos = document.querySelectorAll(".bloco-simulador");

    // Remove "ativo" de todos
    botoes.forEach(btn => btn.classList.remove("ativo"));
    blocos.forEach(div => div.classList.remove("ativo"));

    // Ativa o botão e o formulário correto
    document.querySelector(`.aba-menu[onclick*="${tipo}"]`).classList.add("ativo");
    document.getElementById(`form-${tipo}`).classList.add("ativo");
  }

  // Calculadora de Investimentos
  document.getElementById("formJuros").addEventListener("submit", function (e) {
    e.preventDefault();

    const valorInicial = parseFloat(document.getElementById("valorInicial").value);
    const aplicacaoMensal = parseFloat(document.getElementById("aplicacaoMensal").value);
    const meses = parseInt(document.getElementById("tempoMeses").value);
    const taxaBruta = document.getElementById("taxa").value.replace(",", ".");
    const taxaAnual = parseFloat(taxaBruta);
    const taxaMensal = taxaAnual / 12 / 100;

    let total = valorInicial;
    let historicoInvestido = [valorInicial];
    let historicoTotal = [valorInicial];

    for (let i = 1; i <= meses; i++) {
      total = (total + aplicacaoMensal) * (1 + taxaMensal);
      historicoTotal.push(total);
      historicoInvestido.push(valorInicial + aplicacaoMensal * i);
    }

    const totalInvestido = valorInicial + aplicacaoMensal * meses;
    const totalJuros = total - totalInvestido;

    // Atualiza os blocos
    document.getElementById("resTotalFinal").textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById("resTotalInvestido").textContent = totalInvestido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById("resTotalJuros").textContent = totalJuros.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    document.getElementById("resultadosInvestimento").style.display = "block";

    // Exibe gráfico
    const ctx = document.getElementById("graficoInvestimento").getContext("2d");

    if (window.grafico) window.grafico.destroy(); // evitar sobreposição

    window.grafico = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: meses + 1 }, (_, i) => i),
        datasets: [
          {
            label: 'Valor Investido',
            data: historicoInvestido,
            borderColor: '#333',
            backgroundColor: 'transparent'
          },
          {
            label: 'Total com Juros',
            data: historicoTotal,
            borderColor: '#b71c1c',
            backgroundColor: 'transparent'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  });

  // Calculadora de Compras e Dívidas
  document.getElementById("formCompras").addEventListener("submit", function (e) {
    e.preventDefault();

    const valor = parseFloat(document.getElementById("valorCompra").value);
    const parcelas = parseInt(document.getElementById("parcelas").value);
    const taxa = parseFloat(document.getElementById("taxaMensal").value.replace(",", ".")) / 100;
    const tipo = document.getElementById("juros").value.toLowerCase();

    let valorFinal = 0;

    if (tipo === "simples") {
      valorFinal = valor * (1 + taxa * parcelas);
    } else {
      valorFinal = valor * Math.pow(1 + taxa, parcelas);
    }

    const totalJuros = valorFinal - valor;
    const valorParcela = valorFinal / parcelas;

    document.getElementById("resTotalCompra").textContent = valorFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById("resJurosCompra").textContent = totalJuros.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById("resParcelaCompra").textContent = valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById("resultadoCompras").style.display = "block";
  });







  