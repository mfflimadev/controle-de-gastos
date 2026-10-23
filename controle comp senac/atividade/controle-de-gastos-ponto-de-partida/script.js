/* ===========================================================
   Pra onde foi meu dinheiro? — ponto de partida de 19/10

   O que já está pronto:
   - cada gasto é um objeto: descrição, valor e categoria;
   - a lista gastos é a única coisa que o programa lembra;
   - tudo o que a tela mostra é CALCULADO a partir dela:
     total, quantidade, média, maior, menor, orçamento e os
     totais por categoria;
   - o histórico é uma tabela montada com createElement, com
     um botão de apagar em cada linha;
   - a renderizar() desenha a tela inteira, e todo ouvinte
     termina chamando ela.
   =========================================================== */


/* -----------------------------------------------------------
   Funções que só devolvem
   ----------------------------------------------------------- */


const CHAVEG = 'controle-de-gastos';
const CHAVEF= 'controle-de-gastos-filtro';
const CHAVEO= 'controle-de-gastos-ordem';

function salvarGastos(gastos){
    localStorage.setItem(CHAVEG,JSON.stringify(gastos));
}

function carregarGastos(){
    const salvas = localStorage.getItem(CHAVEG);
    if (salvas === null) {
        return [];
    }
    return JSON.parse(salvas);
    
}

function ordenarGastos(musicas, ordem) {
    if (ordem === 'az') {
        return musicas.toSorted((a, b) => {
            const resultadoComparacao = a.descricao.toLowerCase().localeCompare(b.descricao.toLowerCase());
            console.log(`a = ${a.descricao}, b = ${b.descricao} ---- resultado: ${resultadoComparacao}`);
            return resultadoComparacao;
        });
    }
    if (ordem === 'za') {
        return musicas.toSorted((a, b) => b.descricao.toLowerCase().localeCompare(a.descricao.toLowerCase()));
    }

    if(ordem ==='maior'){
     return musicas.toSorted((a,b)=>b.valor-a.valor);
}
    if(ordem ==='menor'){
     return musicas.toSorted((a,b)=>a.valor-b.valor);
}
     if(ordem==='recentes'){
         return musicas.toSorted((a, b) => { const resultadoComparacao = b.data.localeCompare(a.data); console.log(resultadoComparacao)
        return resultadoComparacao;
         });
     }

    // 'chegada': a ordem do próprio array

    return musicas;
}

function formatarData(data){
    console.log(data);
     const DATA= data.split('-');
    let DATAFOR=[]
    DATAFOR[0]= DATA[2] ;
     DATAFOR[1]= DATA[1];
    DATAFOR[2]=DATA[0];
    const formatado= DATAFOR.join('/') ;
     console.log(formatado);
     return formatado;
}


function formatarReais(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcularMedia(total, quantidade) {
    if (quantidade === 0) {
        return 0;
    }
    return total / quantidade;
}

function montarTextoDoGasto(gasto) {
    return gasto.descricao + ' — ' + formatarReais(gasto.valor);
}

function montarMensagemDoOrcamento(restante) {
    if (restante >= 0) {
        return formatarReais(restante) + ' disponíveis';
    }
    return 'Passou ' + formatarReais(-restante) + ' do orçamento';
}

function passouDoOrcamento(total, orcamento) {
    return total > orcamento;
}

function montarOpcoesDeCategorias(categorias) {
    let opcoes = '';
    for (let i = 0; i < categorias.length; i++) {
        opcoes = opcoes + `<option value="${i}">${categorias[i].nome}</option>`;
    }
    return opcoes;
}

// calcularTotal([{ valor: 12.5 }, { valor: 30 }]) → 42.5
function calcularTotal(gastos) {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total = total + gastos[i].valor;
    }
    return total;
}

function calcularMaiorGasto(gastos) {
    let maior = gastos[0];
    for (let i = 1; i < gastos.length; i++) {
        if (gastos[i].valor > maior.valor) {
            maior = gastos[i];
        }
    }
    return maior;
}

function calcularMenorGasto(gastos) {
    let menor = gastos[0];
    for (let i = 1; i < gastos.length; i++) {
        if (gastos[i].valor < menor.valor) {
            menor = gastos[i];
        }
    }
    return menor;
}

function calcularTotalDaCategoria(gastos, nomeDaCategoria) {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].categoria === nomeDaCategoria) {
            total = total + gastos[i].valor;
        }
    }
    return total;
}

function montarListaDeCategorias(categorias, gastos) {
    let itens = '';
    for (let i = 0; i < categorias.length; i++) {
        const total = calcularTotalDaCategoria(gastos, categorias[i].nome);
        itens = itens + `<li>${categorias[i].nome} <strong>${formatarReais(total)}</strong></li>`;
    }
    return itens;
}

// Devolve o problema do gasto novo, ou '' se estiver tudo certo.
function montarErroDoGasto(gasto) {
    if (gasto.descricao === '') {
        return 'Escreva a descrição.';
    }
    if (gasto.valor <= 0) {
        return 'O valor precisa ser maior que zero.';
    }
    return '';
}


/* -----------------------------------------------------------
   Selecionar
   ----------------------------------------------------------- */

const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const campoCategoria = document.querySelector('.campo-categoria');
const botaoDesfazer = document.querySelector('.botao-desfazer');
const erro = document.querySelector('.erro');

const telaTotal = document.querySelector('.total');
const telaQuantidade = document.querySelector('.quantidade');
const telaMedia = document.querySelector('.media');
const telaMaior = document.querySelector('.maior');
const telaMenor = document.querySelector('.menor');
const telaRestante = document.querySelector('.restante');
const telaHistorico = document.querySelector('.historico');
const telaTotalRodape = document.querySelector('.total-rodape');
const telaCategorias = document.querySelector('.categorias');
const selectOrdem= document.querySelector('.selectOrdem')
const selectFiltro= document.querySelector('.selectFiltro')
const campoData=document.querySelector('.campo-data')

let filtroEscolhido= 'todos'
let ordemEscolhida='chegada'
/* -----------------------------------------------------------
   Valores fixos e o que precisa ser lembrado
   ----------------------------------------------------------- */

const ORCAMENTO = 50;

const CATEGORIAS = [
    { nome: 'Alimentação' },
    { nome: 'Transporte' },
    { nome: 'Lazer' }
];

const iconeApagar = `
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M6 6 L18 18 M18 6 L6 18"
              stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>`;

// A única coisa que o programa lembra.
let gastos = [];


/* -----------------------------------------------------------
   Funções que criam elementos
   ----------------------------------------------------------- */

function criarCelula(texto) {
    const celula = document.createElement('td');
    celula.textContent = texto;
    return celula;
}

// A linha <tr> de um gasto, com o botão de apagar.
function criarLinhaDoHistorico(gasto, posicao) {
    const linha = document.createElement('tr');
    
    linha.setAttribute('data-categoria', gasto.categoria);
    

    const td = document.createElement('td')
    const etiqueta = document.createElement('span');
    td.appendChild(etiqueta);
    etiqueta.classList.add('etiqueta');
    etiqueta.textContent = gasto.categoria;

    

    
    // linha.append(criarCelula(gasto.data));
    linha.appendChild(criarCelula(posicao + 1));
    linha.appendChild(criarCelula(formatarData(gasto.data)));
    linha.appendChild(criarCelula(gasto.descricao));
    linha.appendChild(document.createElement('td').appendChild(td));
    linha.appendChild(criarCelula(formatarReais(gasto.valor)));
    


    const botaoApagar = document.createElement('button');
    botaoApagar.type = 'button';
    botaoApagar.classList.add('botao-apagar');
    botaoApagar.innerHTML = iconeApagar;
    botaoApagar.setAttribute('aria-label', 'Apagar ' + gasto.descricao);

    botaoApagar.addEventListener('click', function () {
        gastos.splice(posicao, 1);
        renderizar();
    });

    const celulaDoBotao = document.createElement('td');
    celulaDoBotao.appendChild(botaoApagar);
    linha.appendChild(celulaDoBotao);

    return linha;
}


/* -----------------------------------------------------------
   Desenhar a tela a partir dos dados
   ----------------------------------------------------------- */

function lerCategoriaEscolhida() {
    return CATEGORIAS[Number(campoCategoria.value)];
}

function renderizarResumo() {
    const total = calcularTotal(gastos);

    telaTotal.textContent = formatarReais(total);
    telaQuantidade.textContent = gastos.length;
    telaMedia.textContent = formatarReais(calcularMedia(total, gastos.length));

    if (gastos.length === 0) {
        telaMaior.textContent = '—';
        telaMenor.textContent = '—';
    } else {
        telaMaior.textContent = montarTextoDoGasto(calcularMaiorGasto(gastos));
        telaMenor.textContent = montarTextoDoGasto(calcularMenorGasto(gastos));
    }
}

function renderizarHistorico() {
    telaHistorico.innerHTML = '';

    const gastosOrdenados= ordenarGastos(gastos,ordemEscolhida);

    for (let i = 0; i < gastos.length; i++) {
        telaHistorico.appendChild(criarLinhaDoHistorico(gastosOrdenados[i], i));
    }
    telaTotalRodape.textContent = formatarReais(calcularTotal(gastos));
}

function renderizarOrcamento() {
    const total = calcularTotal(gastos);
    telaRestante.textContent = montarMensagemDoOrcamento(ORCAMENTO - total);

    if (passouDoOrcamento(total, ORCAMENTO)) {
        telaTotal.classList.add('estourado');
        telaRestante.classList.add('estourado');
    } else {
        telaTotal.classList.remove('estourado');
        telaRestante.classList.remove('estourado');
    }
}

function renderizarCategorias() {
    telaCategorias.innerHTML = montarListaDeCategorias(CATEGORIAS, gastos);
}

// A tela inteira. Todo ouvinte termina chamando esta função.
function renderizar() {
    // salvarGastos(gastos);
    renderizarResumo();
    renderizarHistorico();
    renderizarOrcamento();
    renderizarCategorias();
    botaoDesfazer.disabled = gastos.length === 0;
}

function limparFormulario() {
    campoDescricao.value = '';
    campoValor.value = '';
}

campoCategoria.innerHTML = montarOpcoesDeCategorias(CATEGORIAS);
gastos=carregarGastos();
renderizar();


/* -----------------------------------------------------------
   Escutar
   ----------------------------------------------------------- */

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const gasto = {
        descricao: campoDescricao.value.trim(),
        valor: Number(campoValor.value),
        categoria: lerCategoriaEscolhida().nome,
        data: campoData.value,
    };

    erro.textContent = montarErroDoGasto(gasto);

    if (erro.textContent === '') {
        gastos.push(gasto);
        limparFormulario();
        renderizar();
    }
});

botaoDesfazer.addEventListener('click', function () {
    gastos.pop();
    renderizar();
});

selectOrdem.addEventListener('change', function () {
    ordemEscolhida = selectOrdem.value;
    console.log(ordemEscolhida)
    renderizar();
});
selectFiltro.addEventListener('change', function () {
    filtroEscolhido = selectFiltro.value;
    renderizar();
});