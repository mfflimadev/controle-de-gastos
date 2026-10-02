

const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const erro = document.querySelector('.erro');
const telaTotal = document.querySelector('.total');
const telaMaior = document.querySelector('.maior');
const botao = document.querySelector('.botao-adicionar');

const Gasto= { 
    descricao: "",
    valor:0,
}

let maiorGasto={
    descricao:"",
    valor:0,
}

let total = 0;
let texthist='';
let ngastos=0
const orca= document.querySelector('.orca')


   function formatarReais(valor) { 
    return 'R$ ' + valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function calcularMedia(total,ngasto){
        return total/ngasto 
    }

    function montarTextoDoGasto(Gasto) {
        console.log(`${Gasto.descricao+' — '+ formatarReais(Gasto.valor)}`)
    }
    
    function montarMensagemDoOrcamento( valorrest){
       console.log(`R$ ${valorrest} disponíveis`)
    }

    function podeAdicionar(nomeDigitado,valorDigitado) {
    return nomeDigitado.trim() !== '' && valorDigitado !== '';
}
   console.log( podeAdicionar(campoDescricao.value, campoValor.value))

    function atualizarBotao() {
       botao.disabled = !podeAdicionar(campoDescricao.value, campoValor.value);
} 
    atualizarBotao();

campoDescricao.addEventListener('input', function () {
    atualizarBotao();
});

campoValor.addEventListener('input', function () {
    atualizarBotao();
});

formulario.addEventListener('submit', function (evento) {
evento.preventDefault();

     Gasto.descricao = campoDescricao.value.trim();
    Gasto.valor = Number(campoValor.value);

    
      
       const ngasto = document.querySelector('.quantidade');
       ngastos= Number(ngasto.textContent);
       ngastos= ngastos+1;
       ngasto.textContent= ngastos;
       
        erro.textContent = '';
 
        total = total + Gasto.valor;

        if (Gasto.valor > maiorGasto.valor) {
             maiorGasto=Gasto
        }

        // mostrar na tela
        telaTotal.textContent = formatarReais(total);
        telaMaior.textContent = maiorGasto.descricao +" — " +formatarReais(maiorGasto.valor);

        // limpar para o próximo
        campoDescricao.value = '';
        campoValor.value = '';

        const mgasto = document.querySelector('.media')
        mgasto.textContent= formatarReais(calcularMedia(total,ngastos))
        
        const historico = document.querySelector('.historico') ;
        historico.textContent='';
        texthist += `\n${Gasto.descricao}` +  `${"--"+formatarReais(total)}`;
        historico.textContent += texthist;

        

        orca.textContent= `${Number(orca.textContent.replace(',', '.'))- Gasto.valor}` ;

        if (Number(orca.textContent)<=0){ 
         orca.textContent='0'
         
         const tot= document.querySelector('.total')
         const rest =document.querySelector('.restante')
          erro.textContent= 'O orçamento foi atingido.';
           tot.classList.toggle('estourado')
          rest.classList.toggle('estourado');     
        }

        montarTextoDoGasto(Gasto)
       montarMensagemDoOrcamento(orca.textContent)
      
         console.log( formatarReais(Gasto.valor));  
         console.log(calcularMedia(total, ngastos));
    
        });