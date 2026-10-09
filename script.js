const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const erro = document.querySelector('.erro');
const telaTotal = document.querySelector('.total');
const telaMaior = document.querySelector('.maior');
const botao = document.querySelector('.botao-adicionar');
const historico = document.querySelector('.historico') ;
const lista= []

const Gasto= { 
    id: "",
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


    function limparTexto(){
         campoDescricao.value = '';
        campoValor.value = '';
    }

    function contarGastos(){
          ngastos= Number(ngasto.textContent);
       ngastos= ngastos+1;
       ngasto.textContent= ngastos;
       return ngastos 
    }
     function lerGasto() { 
       Gasto.descricao = campoDescricao.value.trim();
       Gasto.valor = Number(campoValor.value);
    }

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
    function montarHistorico(lista){
        let itens='';
        for (let i=0; i<lista.length;i++){
            itens= itens+`<li>${lista[i]}</li>`
        }
         historico.textContent='';
        texthist += `\n${Gasto.descricao}` +  `${"--"+formatarReais(total)}`;
        historico.textContent += texthist;
        return itens;
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

       lerGasto()
        console.log(Gasto)
       lista.push({"descricao":campoDescricao.value,"valor":campoValor.value});
       console.log(lista);


        ngasto = document.querySelector('.quantidade');
       contarGastos()
     
       
        erro.textContent = '';
 
        total = total + Gasto.valor;

        if (Gasto.valor > maiorGasto.valor) {
             maiorGasto=Gasto
        }
        // mostrar na tela
        telaTotal.textContent = formatarReais(total);
        telaMaior.textContent = maiorGasto.descricao +" — " +formatarReais(maiorGasto.valor);

        // limpar para o próximo
       limparTexto();

        const mgasto = document.querySelector('.media')
        mgasto.textContent= formatarReais(calcularMedia(total,ngastos))
        
        historico.innerHTML=montarHistorico(lista);
        
        
       

        

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