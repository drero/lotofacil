// Função para gerar um número aleatório entre min (incluído) e max (excluído)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Função para gerar um jogo da Lotofácil com a quantidade especificada de números
function gerarJogo(quantidadeNumeros, numerosFixos) {
  let jogo = numerosFixos.slice(); // Copia os números fixos para o jogo

  while (jogo.length < quantidadeNumeros) {
    let numero = getRandomInt(1, 26); // Gera um número aleatório entre 1 e 25 (intervalo da Lotofácil)
    if (jogo.indexOf(numero) === -1) jogo.push(numero); // Adiciona o número ao jogo se ele ainda não tiver sido incluído
  }

  return jogo.sort(function(a, b) { return a - b; }); // Ordena os números do jogo em ordem crescente
}

// Função para gerar vários jogos da Lotofácil com a quantidade especificada de números
function gerarJogos(quantidadeJogos, quantidadeNumeros, numerosFixos) {
  let jogos = [];

  for (let i = 0; i < quantidadeJogos; i++) {
    jogos.push(gerarJogo(quantidadeNumeros, numerosFixos));
  }

  return jogos;
}

// Obtém os elementos do formulário e da tabela
let formulario = document.getElementById('formulario');
let tabela = document.getElementById('tabela-jogos');

// Adiciona um evento de clique ao botão "Gerar Jogos"
formulario.addEventListener('click', function(event) {
  if (event.target.id !== 'botao-gerar') return; // Verifica se o botão clicado foi o "Gerar Jogos"

  // Obtém os valores dos campos de entrada do formulário
  let quantidadeJogos = parseInt(formulario.querySelector('#numero-jogos').value, 10);
  let quantidadeNumeros = parseInt(formulario.querySelector('#numero-numeros').value, 10);
  let numerosFixosString = formulario.querySelector('#numeros-fixos').value;

  let numerosFixosArray = [];
  if (numerosFixosString) {
    numerosFixosArray = numerosFixosString.split(',').map(function(str) { return parseInt(str, 10); });
  }
    // Gera os jogos
  let jogos = gerarJogos(quantidadeJogos, quantidadeNumeros, numerosFixosArray);

  // Limpa a tabela
  tabela.innerHTML = '';

  // Exibe os jogos na tabela
  for (let i = 0; i < jogos.length; i++) {
    let linha = tabela.insertRow(-1); // Insere uma nova linha no final da tabela

    for (let j = 0; j < jogos[i].length; j++) {
      let celula = linha.insertCell(-1);

      if (numerosFixosArray.indexOf(jogos[i][j]) !== -1) {
        // Adiciona a classe "numero-fixo" ao número fixo
        celula.classList.add('numero-fixo');
      }

      celula.innerHTML = jogos[i][j]; // Insere o número na célula
    }
  }
  document.getElementById('botao-limpar').addEventListener('click', function() {
  tabela.innerHTML = '';
});
});




